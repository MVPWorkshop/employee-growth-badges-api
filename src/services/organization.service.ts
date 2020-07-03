import Organization from '../models/Organization.model';
import OrganizationServiceNamespace from './organization.service.d';
import { Transaction } from 'sequelize';
import AddressToOrganization from '../models/AddressToOrganization.model';
import CollaboratorsService from './collaborators.service';

class OrganizationService {
  public static async createOrganization(data: OrganizationServiceNamespace.ICreateOrganizationData, tx?: Transaction) {
    return Organization.create({
      name: data.name
    }, {transaction: tx})
  }

  public static async getOrganizationById(id: string) {
    return Organization.findOne({
      where: {
        id
      }
    })
  }

  public static async getOrganizationList(query?: OrganizationServiceNamespace.IOrganizationListQueries) {

    if (query.collaborator_id) {
      return CollaboratorsService.getAddressesOrganizations(query.collaborator_id);
    }

    return Organization.findAll()
  }
}

export default OrganizationService;
