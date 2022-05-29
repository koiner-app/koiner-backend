import { OperationNode } from '../dto/operation.node';
import { OperationDetailsUnion } from '../dto';

export interface OperationTypeResolver {
  supports(operation: OperationNode): Promise<boolean>;
  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion>;
}
