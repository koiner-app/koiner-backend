import { Module } from '@nestjs/common';

import { GlobalAppModule } from '@koiner/nestjs-utils';

@Module({
  imports: [GlobalAppModule],
})
export class AppModule {}
