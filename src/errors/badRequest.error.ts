import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor() {
    super('Bad Request', HttpStatus.BAD_REQUEST);
  }
}
