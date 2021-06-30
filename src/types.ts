type AccountTypeParameter = 'user' | 'delegate' | 'contract';
type AccountSortParameter = 'Id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions' | 'numContracts';
type BakingRightTypeParameter = 'baking' | 'endorsing';
type BakingRightStatusParameter = 'future' | 'realized' | 'uncovered' | 'missed';
type BlockSortParameter = 'id' | 'level' | 'priority' | 'validations' | 'reward' | 'fees';
type BigMapSortParameter = 'ptr' | 'firstLevel' | 'lastLevel' | 'totalKeys' | 'activeKeys' | 'updates';
type CommitmentSortParameter = 'id' | 'balance' | 'activationLevel';
type ContractKindParameter = 'delegator_contract' | 'smart_contract';
type CycleSortParameter = 'index';
type ContractSortParameter = 'id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions';
type DelegateSortParameter = 'id' | 'activationLevel' | 'deactivationLevel' | 'stakingBalance' | 'balance' | 'numDelegators';
type ProposalSortParameter = 'id' | 'upvotes' | 'roll';
type SoftwareSortParameter = 'id' | 'firstLevel' | 'lastLevel' | 'blocksCount';
type StatisticSortParameter = 'id' | 'level' | 'cycle' | 'date';
type VotingStatus = 'none' | 'upvoted' | 'voted_yay' | 'voted_nay' | 'voted_pass';

interface BalanceShort {
  btc: number;
  eur: number;
  usd: number;
  cny: number;
  jpy: number;
  krw: number;
  eth: number;
}

interface Sortable {
  sort?: string;
  'sort.desc'?: string;
  'sort.asc'?: string;
}

interface PaginationParameters {
  offset?: number;
  'offset.pg'?: number;
  'offset.cr'?: number;
  limit?: number;
}
