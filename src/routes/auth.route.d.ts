import { Request } from 'express';

declare namespace AuthRouteNamespace {
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

  interface ILoginRouteRequestBody {
    payload: string; // Looks similar to register payload just stringified and encoded
    signature: string;
  }
  
  type ILoginRouteRequest = Request<any, any, ILoginRouteRequestBody>;
}

export default AuthRouteNamespace;
