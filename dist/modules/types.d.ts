declare type AccountTypeParameter = 'user' | 'delegate' | 'contract';
declare type AccountSortParameter = 'Id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions' | 'numContracts';
declare type BakingRightTypeParameter = 'baking' | 'endorsing';
declare type BakingRightStatusParameter = 'future' | 'realized' | 'uncovered' | 'missed';
declare type BlockSortParameter = 'id' | 'level' | 'priority' | 'validations' | 'reward' | 'fees';
declare type BigMapSortParameter = 'ptr' | 'firstLevel' | 'lastLevel' | 'totalKeys' | 'activeKeys' | 'updates';
declare type CommitmentSortParameter = 'id' | 'balance' | 'activationLevel';
declare type ContractKindParameter = 'delegator_contract' | 'smart_contract';
declare type CycleSortParameter = 'index';
declare type ContractSortParameter = 'id' | 'balance' | 'firstActivity' | 'lastActivity' | 'numTransactions';
declare type DelegateSortParameter = 'id' | 'activationLevel' | 'deactivationLevel' | 'stakingBalance' | 'balance' | 'numDelegators';
declare type ProposalSortParameter = 'id' | 'upvotes' | 'roll';
declare type SoftwareSortParameter = 'id' | 'firstLevel' | 'lastLevel' | 'blocksCount';
declare type StatisticSortParameter = 'id' | 'level' | 'cycle' | 'date';
declare type VotingStatus = 'none' | 'upvoted' | 'voted_yay' | 'voted_nay' | 'voted_pass';
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
