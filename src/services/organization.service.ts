import Organization from '../models/Organization.model';
import OrganizationServiceNamespace from './organization.service.d';

class OrganizationService {
  public static async createOrganization(data: OrganizationServiceNamespace.ICreateOrganizationData) {
    Organization.create({
      name: data.name
    })
  }

  public static async findOrganizationById(id: string) {
    Organization.findOne({
      where: {
        id
      }
    })
  }
}

export default OrganizationService;
