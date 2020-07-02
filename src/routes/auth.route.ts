import '../config/passport.config';
import { NextFunction, Response } from 'express';
import AuthRouteNamespace from './auth.route.d';
import AuthService from '../services/auth.service';
import passport from 'passport';
import Address from '../models/Address.model';
import { AuthorizationError } from '../utils/errors.util';

class AuthRoute {
  public static async register(request: AuthRouteNamespace.IRegisterRouteRequest, response: Response, next: NextFunction) {
    try {
      await AuthService.registerAddress(request.body);

      return response.status(200).json();

    } catch (error) {
      return next(error);
    }
  }

  public static async login(request: AuthRouteNamespace.ILoginRouteRequest, response: Response, next: NextFunction) {
    try {
      passport.authenticate('local', (err: Error, user: Address) => {

        if (err) {
          return next(err);
        }

        if (!user) {
          throw new AuthorizationError();
        }

        request.logIn(user, (err) => {
          if (err) {
            next(err);
          }

          return response.json(user);
        })
      })(request, response, next);

    } catch (error) {
      console.log(error);
      return next(error);
    }
  }
}

export default AuthRoute;
