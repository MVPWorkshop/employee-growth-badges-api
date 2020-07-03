import { Request } from 'express';

declare namespace CollaboratorsRouteNamespace {
  /*============CREATE ONE ITEM===============*/

  /**
   * Request body for
   *  POST /collaborators
   */
  interface ICreateCollaboratorRouteBody {
    organizationId: string;
    address: string;
  }

  type ICreateCollaboratorRouteRequest = Request<any, any, ICreateCollaboratorRouteBody>

  /*============GET LIST===============*/

  /**
   * Query parameters for GET list
   */
  interface IGetCollaboratorsListQueries {
    organization_id?: string;
  }

  type IGetCollaboratorsListRequest = Request<any, any, any, IGetCollaboratorsListQueries>

  /*============DELETE ONE ITEM===============*/
  
  /**
  * Request body for
  *  DELETE /collaborators/:id
  */
  interface IDeleteCollaboratorRouteBody {
    organizationId: string;
  }
  
  type IDeleteCollaboratorRequest = Request<any, any, IDeleteCollaboratorRouteBody>
}

export default CollaboratorsRouteNamespace;
