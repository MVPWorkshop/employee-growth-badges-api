import '../config/passport.config';
import { NextFunction, Response } from 'express';
import AuthRouteNamespace from './auth.route.d';
import AuthService from '../services/auth.service';
import passport from 'passport';
import Address from '../models/Address.model';
import { AuthorizationError } from '../utils/errors.util';
import BadgeService from '../services/badge.service';
import CollaboratorsService from '../services/collaborators.service';

class AuthRoute {

  public static async register(request: AuthRouteNamespace.IRegisterRouteRequest, response: Response, next: NextFunction) {
    try {
      // @TODO Refactor, duplicated code from login
      const dbAddress = await AuthService.registerAddress(request.body);
      const organizations: any[] = [];
      const badges = await BadgeService.getBadgesByTransfers({
        walletAddress: dbAddress.address
      });
      const user = {
        ...dbAddress.toJSON(),
        organizations,
        badges
      };

      request.logIn(user, (err) => {
        if (err) {
          next(err);
        }

        return response.status(200).json(user);
      })

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

          return response.status(200).json(user);
        })
      })(request, response, next);

    } catch (error) {
      return next(error);
    }
  }

  public static async logout(request: AuthRouteNamespace.ILoginRouteRequest, response: Response, next: NextFunction) {
    try {

      request.logout();

      return response.status(200).end();
    } catch (error) {
      next(error)
    }
  }

  public static async me(request: AuthRouteNamespace.ILoginRouteRequest, response: Response, next: NextFunction) {
    try {
      const address = request.user as Address;
      const addressId = address.id;
      const walletAddress = address.address;

      // @TODO QUICK FIX FOR ALWAYS NEW /me
      const organizations = (await CollaboratorsService.getAddressesOrganizations(addressId)).map(org => org.organization);
      const badges = await BadgeService.getBadgesByTransfers({walletAddress});

      return response.json({
        ...address,
        organizations,
        badges
      })
    } catch (error) {
      next(error)
    }
  }
}

export default AuthRoute;
