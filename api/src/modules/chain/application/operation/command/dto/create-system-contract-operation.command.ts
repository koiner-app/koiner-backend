export class CreateSystemContractOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly systemContract: boolean,
  ) {}
}
