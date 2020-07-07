import BadgesRouteNamespace from './badges.route.d';
import { NextFunction, Response, Request } from 'express';
import OrganizationService from '../services/organization.service';
import { InvalidRequestError, NotFoundError } from '../utils/errors.util';
import AddressService from '../services/address.service';
import BadgeService from '../services/badge.service';

class BadgesRoute {
  public static async createBadge(request: BadgesRouteNamespace.IBadgesRouteCreateRequest, response: Response, next: NextFunction) {
    try {
      const {
        organizationId,
        creatorAddressId
      } = request.body;

      const dbOrganization = await OrganizationService.getOrganizationById(organizationId);

      if (!dbOrganization) {
        throw new InvalidRequestError("Organization id invalid");
      }

      const dbAddress = await AddressService.getAddressById(creatorAddressId);

      if (!dbAddress) {
        throw new InvalidRequestError("Creator address id is invalid");
      }

      const dbBadge = await BadgeService.createBadge(request.body);

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
}

export default BadgesRoute;
