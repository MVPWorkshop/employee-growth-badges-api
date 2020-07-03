import Organization from '../models/Organization.model';
import OrganizationServiceNamespace from './organization.service.d';
import { Transaction } from 'sequelize';

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

  public static async getOrganizationList(query: OrganizationServiceNamespace.IOrganizationListQueries) {
    return Organization.findAll()
  }
}

export default OrganizationService;
