import AddressOrganizationServiceNamespace from './addressOrganizatoin.service.d';
import AddressToOrganization from '../models/AddressToOrganization.model';
import { Transaction } from 'sequelize';

class AddressOrganizationService {
  public static async createNewRelationship(data: AddressOrganizationServiceNamespace.ICreateRelationshipData, tx?: Transaction) {
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

  public static async findRelationship(organizationId: string, addressId: string) {
    return AddressToOrganization.findOne({
      where: {
        organization_id: organizationId,
        address_id: addressId,
      }
    })
  }

  public static async updateRelationshipStatus(data: AddressOrganizationServiceNamespace.ICreateRelationshipData, tx?: Transaction) {
    const dbRelationship = await this.findRelationship(data.organizationId, data.addressId);

    return dbRelationship.update({
      revoked: data.revoked
    })
  }
}

export default AddressOrganizationService;
