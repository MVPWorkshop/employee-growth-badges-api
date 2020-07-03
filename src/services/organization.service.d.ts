import OrganizationsRouteNamespace from '../routes/organizations.route.d';

declare namespace OrganizationServiceNamespace {
  export interface ICreateOrganizationData extends OrganizationsRouteNamespace.IOrganizationRouteCreateBody {
  }

  export interface IOrganizationListQueries extends OrganizationsRouteNamespace.IGetOrganizationListQueries {
  }

}

export default OrganizationServiceNamespace;
