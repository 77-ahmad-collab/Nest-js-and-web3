export interface ResponseObject {
  previousBalanceOFSender: number;
  previousBalanceOFReciever: number;
  currentBalanceOFSender: number;
  currentBalanceOFReciever: number;
  transactionHash: string;
}

export type Balance = {
  fromBalance: number;
  toBalance: number;
};
export type Options = {
  from: string;
  to: string;
  value: string;
  gasLimit: number;
};
