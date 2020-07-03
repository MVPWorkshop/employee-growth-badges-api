import { Request } from 'express';

declare namespace OrganizationsRouteNamespace {
  /*============CREATE ONE ITEM===============*/

  /**
   * Request body for
   *  POST /organizations
   */
  interface IOrganizationRouteCreateBody {
    name: string;
  }

  type IOrganizationRouteCreateRequest = Request<any, any, IOrganizationRouteCreateBody>;

  /*============GET LIST===============*/

  /**
   * Query parameters for GET list
   */
  interface IGetOrganizationListQueries {
    collaborator_id?: string;
  }

  export type IGetOrganizationListRequest = Request<any, any, any, IGetOrganizationListQueries>;
}

export default OrganizationsRouteNamespace;
