import { NextFunction, Request, Response } from 'express';

// import { Injectable, NestMiddleware } from '@nestjs/common';

// Option 1: class middleware
// @Injectable()
// export class LoggerMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next: NextFunction) {
//     console.log('Request...');
//     next();
//   }
// }

// Option 2: functional middleware
export function loggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Request...');
  next();
}
