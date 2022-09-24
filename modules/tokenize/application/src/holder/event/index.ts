import { UpdateTokenHolderOnTokensBurned } from './update-token-holder-on-tokens-burned';
import { UpdateTokenHolderOnTokensMinted } from './update-token-holder-on-tokens-minted';
import { UpdateTokenHoldersOnTokensTransferred } from './update-token-holders-on-tokens-transferred';

export const TokenHolderEventHandlers = [
  UpdateTokenHolderOnTokensBurned,
  UpdateTokenHolderOnTokensMinted,
  UpdateTokenHoldersOnTokensTransferred,
];
