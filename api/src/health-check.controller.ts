import { Controller, Get } from '@nestjs/common';

@Controller()
export class HealthCheckController {
  @Get('health')
  getHealthCheck(): string {
    return 'OK';
  }
}
