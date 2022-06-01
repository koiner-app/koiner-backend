import { registerEnumType } from '@nestjs/graphql';
import { OperationType } from '@koiner/chain/domain';

registerEnumType(OperationType, {
  name: 'OperationType',
  description: 'Operation type',
});
