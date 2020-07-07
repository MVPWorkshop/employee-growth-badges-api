import { NextFunction, Request, Response } from 'express';
import TokenRouteNamespace from './token.route.d';
import BadgeService from '../services/badge.service';
import { NotFoundError } from '../utils/errors.util';
import { badgeTypeMetadata } from '../config/constants.config';
import VoteService from '../services/vote.service';
import ContractService from '../services/contract.service';

class TokenRoute {

  public static async getTokenContractData(request: Request, response: Response, next: NextFunction) {
    try {

      const details = ContractService.getEmployeeRecognitionContractDetails();

      return response.json(details);
    } catch (error) {
      next(error);
    }
  }

  public static async getTokenMetadata(request: Request, response: Response, next: NextFunction) {
    try {

      const tokenBlockchainId = request.params.id;

      const dbBadge = await BadgeService.getBadgeByBlockchainId(tokenBlockchainId);

      if (!dbBadge) {
        throw new NotFoundError();
      }

      const dbVotes = await VoteService.getVoteList({
        badge_id: dbBadge.id,
        vote: true
      });

      const responseBody: TokenRouteNamespace.IGetTokenMetadataRouteBody = {
        badgeType: dbBadge.badge_type,
        name: badgeTypeMetadata[dbBadge.badge_type].name,
        image: badgeTypeMetadata[dbBadge.badge_type].image,
        description: dbBadge.special_note,
        originalOwnerAddress: dbBadge.created_for_address,
        creatorAddress: dbBadge.creator_address.address,
        organization: dbBadge.organization.name,
        confirmedBy: dbVotes.map(dbVote => dbVote.address.address),
        creationDate: dbBadge.createdAt
      };

      return response.json(responseBody);

    } catch (error) {
      next(error);
    }
  }
}

export default TokenRoute;
