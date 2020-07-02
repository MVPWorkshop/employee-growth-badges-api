import AuthRouteNamespace from '../routes/auth.route.d';

declare namespace AuthServiceNamespace {
  export interface IRegisterData extends AuthRouteNamespace.IRegisterRouteRequestBody {
  }

  export interface ILoginData extends AuthRouteNamespace.ILoginRouteRequestBody {
    signature: string;
    payload: string;
  }
}

export default AuthServiceNamespace;
