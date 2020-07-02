import * as dotenv from 'dotenv';

const env = dotenv.config();

export enum ApplicationEnv {
  PRODUCTION = 'production',
  DEVELOPMENT = 'development',
  STAGING = 'staging',
  TEST = 'test',
}

const {
  NODE_PORT, NODE_HOST,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  NODE_ENV,
  SIGNATURE_EXPIRATION_SEC,
  COOKIE_SECRET,
  SESSION_TABLE,
  COOKIE_DOMAIN,
  COOKIE_HTTP_ONLY,
  COOKIE_SECURE,
  COOKIE_NAME
} = process.env;

const ENV: ApplicationEnv = NODE_ENV as ApplicationEnv || ApplicationEnv.DEVELOPMENT;
export const CONFIG = {
  NODE_PORT,
  NODE_HOST,
  NODE_ENV: ENV,
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  SIGNATURE_EXPIRATION_SEC,
  COOKIE_SECRET,
  SESSION_TABLE,
  COOKIE_DOMAIN,
  COOKIE_HTTP_ONLY,
  COOKIE_SECURE,
  COOKIE_NAME
};
