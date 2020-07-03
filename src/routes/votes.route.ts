import { NextFunction, Response } from 'express';
import VotesRouteNamespace from './votes.route.d';
import Database from '../models';
import AddressService from '../services/address.service';
import { AuthorizationError, ConflictError, InvalidRequestError } from '../utils/errors.util';
import BadgeService from '../services/badge.service';
import VoteService from '../services/vote.service';
import { EBadgeStatus } from '../types/badge.types';
import OrganizationService from '../services/organization.service';
import CollaboratorsService from '../services/collaborators.service';
import VoteUtil from '../utils/vote.util';
import Address from '../models/Address.model';

class VotesRoute {
  public static async vote(request: VotesRouteNamespace.ICreateVoteRouteRequest, response: Response, next: NextFunction) {
    const tx = await Database.transaction();

    try {
      const {
        badgeId
      } = request.body;

      const addressId = (request.user as Address).id;

      const dbAddress = await AddressService.getAddressById(addressId);
      if (!dbAddress) {
        throw new InvalidRequestError("Address not found")
      }

      const dbBadge = await BadgeService.getBadgeById(badgeId);
      if (!dbBadge) {
        throw new InvalidRequestError("Badge not found")
      }
      if (dbBadge.status !== EBadgeStatus.VOTING) {
        throw new InvalidRequestError("Voting has been finished")
      }

      const dbOrganization = await OrganizationService.getOrganizationById(dbBadge.organization_id);
      const dbCollaborator = await CollaboratorsService.getCollaborator(dbBadge.organization_id, addressId);

      // User not collaborator
      if (!dbCollaborator) {
        throw new AuthorizationError("Not authorized to vote for this badge");
      }

      const [dbVote, created] = await VoteService.createVote(addressId, request.body, tx);

      if (!created) {
        throw new ConflictError("Address already voted");
      }

      const { positiveVotes, negativeVotes } = await VoteService.getBadgeVoteCount(badgeId, tx);
      const numberOfCollaborators = (await CollaboratorsService.getOrganizationCollaborators(dbOrganization.id, tx)).length;
      const numberOfVotesNeeded = VoteUtil.calculateNumberOfVotesNeeded(numberOfCollaborators);

      console.log(`Badge(${badgeId}), Votes count`, positiveVotes, negativeVotes);

      if (positiveVotes >= numberOfVotesNeeded || negativeVotes >= numberOfVotesNeeded) {
        let status: EBadgeStatus;

        if (positiveVotes >= numberOfVotesNeeded) {
          status = EBadgeStatus.VOTE_SUCCESSFUL;
        }
        if (negativeVotes >= numberOfVotesNeeded) {
          status = EBadgeStatus.VOTE_UNSUCCESSFUL;
        }

        await BadgeService.updateBadge(badgeId, {
          status
        }, tx);
      }

      await tx.commit();

      return response.json(dbVote);

    } catch (error) {
      console.log(error);
      await tx.rollback();

      next(error);
    }
  }
}

export default VotesRoute;
