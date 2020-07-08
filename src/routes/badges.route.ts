import BadgesRouteNamespace from './badges.route.d';
import { NextFunction, Request, Response } from 'express';
import OrganizationService from '../services/organization.service';
import { AuthorizationError, InvalidRequestError, NotFoundError } from '../utils/errors.util';
import AddressService from '../services/address.service';
import BadgeService from '../services/badge.service';
import { EBadgeStatus } from '../types/badge.types';
import Organization from '../models/Organization.model';
import Address from '../models/Address.model';

class BadgesRoute {
  public static async createBadge(request: BadgesRouteNamespace.IBadgesRouteCreateRequest, response: Response, next: NextFunction) {
    try {
      const {
        organizationId
      } = request.body;

      const creatorAddressId = (request.user as Address).id;

      const dbOrganization = await OrganizationService.getOrganizationById(organizationId);

      if (!dbOrganization) {
        throw new InvalidRequestError("Organization id invalid");
      }

      const dbAddress = await AddressService.getAddressById(creatorAddressId);

      if (!dbAddress) {
        throw new InvalidRequestError("Creator address id is invalid");
      }

      const dbBadge = await BadgeService.createBadge({
        ...request.body,
        creatorAddressId
      });

      return response.json(dbBadge);

    } catch (error) {
      next(error);
    }
  }

  public static async getBadge(request: Request, response: Response, next: NextFunction) {
    try {
      const dbBadge = await BadgeService.getBadgeById(request.params.id);

      if (!dbBadge) {
        throw new NotFoundError();
      }

      return response.json(dbBadge);

    } catch (error) {
      next(error);
    }
  }

  public static async getBadgeList(request: BadgesRouteNamespace.IBadgesRouteGetListRequest, response: Response, next: NextFunction) {
    try {
      const {
        organization_id,
        user_id
      } = request.query;

      let dbBadges: any;
      if (user_id) {
        // @TODO This whole thing is really inefficient
        const dbAddress = await AddressService.getAddressById(user_id);

        if (!dbAddress) {
          throw new InvalidRequestError('User id query param invalid')
        }

        dbBadges = await BadgeService.getBadgesByTransfers({
          walletAddress: dbAddress.address,
          organizationId: organization_id
        });
      } else {
        dbBadges = await BadgeService.getBadgeList({organization_id});
      }

      return response.json(dbBadges);

    } catch (error) {
      next(error);
    }
  }

  public static async markBadgePending(request: BadgesRouteNamespace.IBadgesRouteGetListRequest, response: Response, next: NextFunction) {
    try {
      const badgeId = request.params.id;

      const dbBadge = await BadgeService.getBadgeById(badgeId, [
        {
          model: Organization,
          include: [
            {model: Address}
          ]
        }
      ]);

      if (!dbBadge) {
        throw new NotFoundError('Badge not found');
      }

      if (dbBadge.status !== EBadgeStatus.VOTE_SUCCESSFUL) {
        throw new InvalidRequestError("This badge can't be marked as pending")
      }

      if (!dbBadge.organization.addresses.some(address => address.id === (request.user as Address).id)) {
        throw new AuthorizationError("You aren't authorized to perform this action");
      }

      await dbBadge.update({
        status: EBadgeStatus.PENDING
      });

      return response.json(dbBadge);

    } catch (error) {
      next(error)
    }
  }
}

export default BadgesRoute;
