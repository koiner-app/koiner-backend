import { OperationNode } from '../dto/operation.node';
import { OperationDetailsUnion } from '../dto/operation-details.union';

export interface OperationTypeResolver {
  supports(operation: OperationNode): Promise<boolean>;
  resolve(operation: OperationNode): Promise<typeof OperationDetailsUnion>;
}
