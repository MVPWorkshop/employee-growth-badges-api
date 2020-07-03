import { Request } from 'express';

declare namespace OrganizationsRouteNamespace {
  interface IOrganizationRouteCreateBody {
    name: string;
  }

  type IOrganizationRouteCreateRequest = Request<any, any, IOrganizationRouteCreateBody>;
}

export default OrganizationsRouteNamespace;
