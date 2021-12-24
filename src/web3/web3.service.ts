require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { Balance, Options, ResponseObject } from './type';
const privateKey = process.env.PRIVATE_KEY;
// import Web3 from "web3";
const Web3 = require('web3');
const web3 = new Web3(
  'https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66',
);

@Injectable()
export class Web3Service {
  async getAllBalances(list: string[]): Promise<Balance> {
    try {
      const balances = await Promise.all(
        list.map((address) => {
          return web3.eth.getBalance(address);
        }),
      );
      return {
        fromBalance: Number(balances[0]),
        toBalance: Number(balances[1]),
      };
    } catch (error) {
      throw error;
    }
  }
  async signAndSendTransaction(options: Options): Promise<string> {
    try {
      const createTransaction = await web3.eth.accounts.signTransaction(
        options,
        privateKey,
      );
      const transactionReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction,
      );
      return transactionReceipt.transactionHash;
    } catch (error) {
      throw error;
    }
  }
  async sendTransaction(): Promise<ResponseObject> {
    try {
      const addressFrom = '0x0e103a14a73beaa028d2171870263622f272e613';
      const addressTo = '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee';
      const list: string[] = [addressFrom, addressTo];
      const previousBalance: Balance = await this.getAllBalances(list);
      const options = {
        from: addressFrom,
        to: addressTo,
        value: web3.utils.toWei('1', 'ether'),
        gasLimit: 22000,
      };
      const transactionHash: string = await this.signAndSendTransaction(
        options,
      );
      const currentBalance: Balance = await this.getAllBalances(list);
      const result = {
        previousBalanceOFSender: previousBalance.fromBalance,
        previousBalanceOFReciever: previousBalance.toBalance,
        currentBalanceOFSender: currentBalance.fromBalance,
        currentBalanceOFReciever: currentBalance.toBalance,
        transactionHash: transactionHash,
      };
      return result;
    } catch (error) {
      throw error;
    }
  }
}

// MY TRANSACTION_HASHES LIST
// 0x337f8fe778cf087a2b551189ab5d42291625684a8957a58933b6a27d107de187
// 0x995d4f660fa717790c0f24c6d3dd30d465f606f24fc9afbc1b90265e21946c1f
// 0xef529573fc8bb9aa8cee91ee86a521179d9e8f4427fc20cef98a5df23e3f1312
// 0x1a4b70ee9689f50f82b1494c541898a8b7271738006b0453eb9fb10e229ffa85
// 0x6c2d0dccec34bad2b1894a7f04714c1914393363968cd731fe03cbb03939c6fe
// 0x8ae74b780e5e62f34573aeee2eb5d3e8a6aa1f158f9d71c58e11ef184a6ecfe6
