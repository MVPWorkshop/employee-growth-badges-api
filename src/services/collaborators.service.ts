import CollaboratorServiceNamespace from './collaborators.service.d';
import AddressToOrganization from '../models/AddressToOrganization.model';
import { Transaction } from 'sequelize';

class CollaboratorsService {
  public static async createNewCollaborator(data: CollaboratorServiceNamespace.ICreateCollaboratorData, tx?: Transaction) {
    return AddressToOrganization.findOrCreate({
      where: {
        organization_id: data.organizationId,
        address_id: data.addressId
      },
      defaults: {
        organization_id: data.organizationId,
        address_id: data.addressId,
        revoked: data.revoked || false
      },
      transaction: tx
    })
  }

  public static async getCollaborator(organizationId: string, addressId: string) {
    return AddressToOrganization.findOne({
      where: {
        organization_id: organizationId,
        address_id: addressId,
      }
    })
  }

  public static async getOrganizationCollaborators(organizationId: string, tx?: Transaction) {
    return AddressToOrganization.findAll({
      where: {
        organization_id: organizationId
      },
      transaction: tx
    })
  }

  public static async getAddressesOrganizations(addressId: string, tx?: Transaction) {
    return AddressToOrganization.findAll({
      where: {
        address_id: addressId
      },
      transaction: tx
    })
  }

  public static async updateCollaboratorStatus(data: Partial<CollaboratorServiceNamespace.ICreateCollaboratorData>, tx?: Transaction) {
    const dbRelationship = await this.getCollaborator(data.organizationId, data.addressId);

    return dbRelationship.update({
      revoked: data.revoked
    })
  }
}

export default CollaboratorsService;
