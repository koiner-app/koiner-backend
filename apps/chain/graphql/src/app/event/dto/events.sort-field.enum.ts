import { registerEnumType } from '@nestjs/graphql';

export enum EventsSortFieldEnum {
  timestamp = 'timestamp',
}

registerEnumType(EventsSortFieldEnum, {
  name: 'EventsSortField',
  description: 'Sort field',
});
