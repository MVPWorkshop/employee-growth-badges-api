import { Request } from 'express';
import Badge from '../models/Badge.model';
import Organization from '../models/Organization.model';
import Address from '../models/Address.model';

declare namespace AuthRouteNamespace {

  /*============CREATE ONE ITEM===============*/

  /**
   * Request body for
   *  POST /register
   */
  interface IRegisterRouteRequestBody {
    walletAddress: string;
    payload: {
      timestamp: number;
    };
    signature: string;
    username?: string;
    email?: string;
  }

  type IRegisterRouteRequest = Request<any, any, IRegisterRouteRequestBody>;

  /**
   * Request body for
   *  POST /login
   */
  interface ILoginRouteRequestBody {
    payload: string; // Looks similar to register payload just stringified and encoded
    signature: string;
  }
  
  type ILoginRouteRequest = Request<any, any, ILoginRouteRequestBody>;

  /*============GET ONE ITEM===============*/

  /**
   * Response body for
   *  GET /me
   */
  interface MeOrganizations {
    organization: Organization
  }
  
  interface IMeRouteResponseBody extends Address {
    badges: Badge[];
  }
}

export default AuthRouteNamespace;
