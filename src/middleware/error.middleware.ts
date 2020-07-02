import { NextFunction, Request, Response } from 'express';

export async function error(error: Error, request: Request, response: Response, next: NextFunction) {
console.log(error);
  response.status(500).json({
    error: {
      code: 500,
      message: 'Error'
    }
  });
}
