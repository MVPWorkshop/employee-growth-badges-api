import { NextFunction, Request, Response } from 'express';
import {
  ConflictError,
  NotFoundError,
  InvalidRequestError,
  AuthorizationError,
  AuthenticationError
} from '../utils/errors.util';

export async function error(error: Error, request: Request, response: Response, next: NextFunction) {

  let status: number;
  let message: string;
console.log(error)
  if (error instanceof ConflictError) {
    status = 409;
    message = error.message || 'Conflict'
  } else if (error instanceof NotFoundError) {
    status = 404;
    message = error.message || 'Not found'
  } else if (error instanceof InvalidRequestError) {
    status = 400;
    message = error.message || 'Invalid request'
  } else if (error instanceof AuthorizationError) {
    status = 403;
    message = error.message || 'Authorization error';
  } else if (error instanceof AuthenticationError) {
    status = 401;
    message = error.message || 'Not authenticated';
  } else {
    status = 500;
    message = 'Server error';
  }

  return response.status(status).json({message, status});
}
