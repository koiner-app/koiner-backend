import { CreateContractHandler } from './create-contract.handler';

export { CreateContractCommand } from './dto/create-contract.command';

export const ContractCommandHandlers = [CreateContractHandler];
