import passport from 'passport';
import passportLocal from 'passport-local';
import { AuthenticationError } from '../utils/errors.util';
import AuthService from '../services/auth.service';
import Address from '../models/Address.model';

const LocalStrategy = passportLocal.Strategy;

// serializeUser determines which data of the user object should be stored in the session.
passport.serializeUser((address: Address, done) => {
  done(undefined, address);
});

// Used to retrieve the object from the session. That data will be filled in req.user
passport.deserializeUser(async (address: Address, done) => {
  if (address) {
    return done(undefined, address);
  } else {
    return done(new AuthenticationError(), undefined);
  }
});

async function authenticate(signature: string, payload: string, done: any) {
  try {
    const address = await AuthService.login({signature, payload});

    return done(undefined, address);
  } catch (error) {
    console.log(error);
    return done(new AuthenticationError(), undefined);
  }
}

const strategy = new LocalStrategy({
  usernameField: 'signature',
  passwordField: 'payload'
}, authenticate);

passport.use(strategy);
