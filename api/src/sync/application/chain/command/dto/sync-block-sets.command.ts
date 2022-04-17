import { SyncSet } from '@koiner/sync/application/chain/command/dto/sync-block-set.dto';

export class SyncBlockSetsCommand {
  constructor(public readonly sets: SyncSet[]) {}
}
