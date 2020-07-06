import { NextFunction, Request, Response } from 'express';
import MetadataRouteNamespace from './metadata.route.d';
import BadgeService from '../services/badge.service';
import { NotFoundError } from '../utils/errors.util';
import { badgeTypeMetadata } from '../config/constants.config';
import VoteService from '../services/vote.service';

class MetadataRoute {
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

      console.log(dbBadge.badge_type);

      const responseBody: MetadataRouteNamespace.IGetTokenMetadataRouteBody = {
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

export default MetadataRoute;
