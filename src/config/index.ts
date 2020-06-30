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
  NODE_ENV
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
  DB_USER
};