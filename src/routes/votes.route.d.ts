import { Request } from 'express';

declare namespace VotesRouteNamespace {

  /*============CREATE ONE ITEM===============*/

  /**
   * Request body for
   *  POST /votes
   */
  interface ICreateVoteRouteBody {
    badgeId: string;
    vote: boolean;
  }

  type ICreateVoteRouteRequest = Request<any, any, ICreateVoteRouteBody>

  /*============GET ONE ITEM===============*/
  
  /**
   * Response body for
   *  GET /votes/:id
   */
  interface IGetVoteRouteBody extends ICreateVoteRouteBody {
    id: string;
    createdAt: string;
    updatedAt: string;
  }

  /*============GET LIST===============*/
  
  /**
   * Query parameters for GET list
   */
  interface IGetVotesListQueries {
    badge_id?: string;
    vote?: boolean;
  }
  
  type IGetVotesListRequest = Request<any, any, any, IGetVotesListQueries>
}

export default VotesRouteNamespace;
