import { NextFunction, Request, Response } from 'express';
import OrganizationService from '../services/organization.service';
import OrganizationsRouteNamespace from './organizations.route.d';
import Database from '../models';
import AddressOrganizationService from '../services/addressOrganization.service';
import Address from '../models/Address.model';
import { ConflictError, NotFoundError } from '../utils/errors.util';

class OrganizationsRoute {
  public static async createOrganization(request: OrganizationsRouteNamespace.IOrganizationRouteCreateRequest, response: Response, next: NextFunction) {
    const tx = await Database.transaction();

    try {
      const userAddressId = (request.user as Address).id;

      const dbOrganization = await OrganizationService.createOrganization(request.body, tx);

      await AddressOrganizationService.createNewRelationship({
        addressId: userAddressId,
        organizationId: dbOrganization.id
      }, tx);

      await tx.commit();

      return response.json(dbOrganization);

    } catch (error) {
      console.log(error);
      await tx.rollback();

      next(error);
    }
  }

  public static async getOrganization(request: Request, response: Response, next: NextFunction) {
    try {
      const dbOrganization = await OrganizationService.getOrganizationById(request.params.id);

      if (!dbOrganization) {
        throw new NotFoundError("Organization not found");
      }

      return response.json(dbOrganization);
    } catch (error) {
      next(error);
    }
  }
}

export default OrganizationsRoute;