import Organization from '../models/Organization.model';
import OrganizationServiceNamespace from './organization.service.d';

class OrganizationService {
  public static async createOrganization(data: OrganizationServiceNamespace.ICreateOrganizationData) {
    return Organization.create({
      name: data.name
    })
  }

  public static async getOrganizationById(id: string) {
    return Organization.findOne({
      where: {
        id
      }
    })
  }
}

export default OrganizationService;
