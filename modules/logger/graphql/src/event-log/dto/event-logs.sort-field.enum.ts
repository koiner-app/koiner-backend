import { registerEnumType } from '@nestjs/graphql';

export enum EventLogsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(EventLogsSortFieldEnum, {
  name: 'EventLogsSortField',
  description: 'Sort field',
});
