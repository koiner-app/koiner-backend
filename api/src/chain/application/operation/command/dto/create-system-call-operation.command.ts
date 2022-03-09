export class CreateSystemCallOperationCommand {
  constructor(
    public readonly id: string,
    public readonly contractId: string,
    public readonly callId: number,
  ) {}
}
