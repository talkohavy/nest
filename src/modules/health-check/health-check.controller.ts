import { Controller, Get } from '@nestjs/common';
import { HealthCheck } from '@nestjs/terminus';

@Controller()
export class HealthCheckController {
  constructor() {}

  @Get('is-alive')
  @HealthCheck()
  isAlive(): string {
    return 'OK';
  }
}
