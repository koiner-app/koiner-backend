import { SyncSet } from '@koiner/chain/sync/application/command/dto/sync-block-set.dto';

export class SyncBlockSetsCommand {
  constructor(public readonly sets: SyncSet[]) {}
}
