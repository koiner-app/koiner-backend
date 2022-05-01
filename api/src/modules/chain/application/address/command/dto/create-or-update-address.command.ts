export class CreateOrUpdateAddressCommand {
  constructor(
    public readonly id: string,
    public readonly producedBlock = false,
  ) {}
}
