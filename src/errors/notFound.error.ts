import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundError extends HttpException {
  constructor() {
    super('Not Found', HttpStatus.NOT_FOUND);
  }
}
