import CollaboratorsRouteNamespace from './collaborators.route.d';
import { NextFunction, Response, Request } from 'express';
import AddressService from '../services/address.service';
import { AuthorizationError, ConflictError, InvalidRequestError } from '../utils/errors.util';
import OrganizationService from '../services/organization.service';
import Address from '../models/Address.model';
import CollaboratorsService from '../services/collaborators.service';
import moment from 'moment';

class CollaboratorsRoute {
  public static async createCollaborator(request: CollaboratorsRouteNamespace.ICreateCollaboratorRouteRequest, response: Response, next: NextFunction) {

    try {
      const {
        address,
        organizationId
      } = request.body;

      const user = (request.user as Address);

      if (address.toLowerCase() === user.address) {
        throw new InvalidRequestError("You can't register yourself as collaborator");
      }

      const dbAddress = await AddressService.getAddressByWalletAddress(address.toLowerCase());
      if (!dbAddress) {
        throw new InvalidRequestError("Address hasn't been registered on the platform");
      }

      const dbOrganization = await OrganizationService.getOrganizationById(organizationId);
      if (!dbOrganization) {
        throw new InvalidRequestError("Organization not found");
      }
      const dbCollaboratorInSession = await CollaboratorsService.getCollaboratorRelationship(organizationId, user.id);

      if (!dbCollaboratorInSession || dbCollaboratorInSession.revoked) {
        throw new AuthorizationError("User isn't authorized to add new collaborators");
      }

      const [dbCollaborator, created] = await CollaboratorsService.createNewCollaborator({
        addressId: dbAddress.id,
        organizationId
      });

      if (!created) {
        if (dbCollaborator.revoked === true) {
          dbCollaborator.update({
            revoked: false,
            revoked_at: null
          })
        } else {
          throw new ConflictError("User is already a collaborator");
        }
      }

      return response.json(dbCollaborator);

    } catch (error) {
      next(error);
    }
  }

  static async getCollaboratorList(request: CollaboratorsRouteNamespace.IGetCollaboratorsListRequest, response: Response, next: NextFunction) {
    try {
      const {
        organization_id
      } = request.query;

      const dbCollaborators = await CollaboratorsService.getOrganizationCollaborators(organization_id);

      return response.json(dbCollaborators);

    } catch (error) {
      next(error);
    }
  }

  static async revokeCollaborator(request: CollaboratorsRouteNamespace.IDeleteCollaboratorRequest, response: Response, next: NextFunction) {
    try {
      const userInSessionId = (request.user as Address).id;
      const collaboratorId = request.params.id;
      const { organizationId } = request.body;

      const dbCollaboratorInSession = await CollaboratorsService.getCollaboratorRelationship(organizationId, userInSessionId);

      if (!dbCollaboratorInSession || dbCollaboratorInSession.revoked) {
        throw new AuthorizationError("User isn't authorized to revoke collaborators");
      }

      const dbCollaborator = await CollaboratorsService.getCollaboratorRelationship(organizationId, collaboratorId);

      if (!dbCollaborator) {
        throw new InvalidRequestError("Provided id isn't a collaborator")
      }

      const allOrganizationCollaborators = await CollaboratorsService.getOrganizationCollaborators(organizationId);

      if (allOrganizationCollaborators.length === 1) {
        throw new AuthorizationError("You can't remove the last collaborator");
      }

      await dbCollaborator.update({
        revoked: true,
        revoked_at: moment().toDate()
      });

      return response.json(dbCollaborator);
    } catch (error) {
      next(error);
    }
  }
}

export default CollaboratorsRoute;
