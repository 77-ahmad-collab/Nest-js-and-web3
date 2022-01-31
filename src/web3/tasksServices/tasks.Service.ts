import { Injectable } from '@nestjs/common';
import { byteCode, ERC20 } from '../ABI/ERC20';
import { ethers, ContractFactory } from 'ethers';
const Web3 = require('web3');
const provider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66',
);
const wsRpc = 'wss://mainnet.infura.io/ws/v3/d868f46f29aa4637b54e7bf871b279bf';
const wsWeb3 = new Web3(wsRpc);
const contractAddress = '0xF5C638B9E09727D714Aca185B657F691b4E24ddc';

@Injectable()
export class TaskService {
 
  async filterTransfersByAddress(address: string) {
    try {
      const contract = new ethers.Contract(contractAddress, ERC20, provider);
      const result = await contract.filters.Transfer(
        address,
        '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee',
      );
      await this.eventFilter({
        fromBlock: 9783409,
        toBlock: 9996672,
        address: '',
        topics: [''],
      });
      return result;
    } catch (error) {
      throw new Error(error.message);
    }
  }
 
  async eventFilter({
    fromBlock,
    toBlock,
    address,
    topics,
  }: {
    fromBlock: number;
    toBlock: number;
    address: string;
    topics: [String];
  }) {
    try {
      const web3 = new Web3(wsRpc);
      const contract = new web3.eth.Contract(ERC20, contractAddress);
      let options = {
        filter: {
          value: ['1000', '1337', '1000', '20'], //Only get events where transfer value was 1000 or 1337
        },
        fromBlock: fromBlock, //Number || "earliest" || "pending" || "latest"
        toBlock: toBlock,
      };
      contract
        .getPastEvents('Transfer', options)
        .then((results) => console.log(results));
    } catch (error) {
      throw new Error(error.message);
    }
  }
  async contractInteraction() {
    try {
      const signer = provider.getSigner();
      // console.log(signer);

      var wallet = new ethers.Wallet(
        '5da45c9023c9c54495fbd29df3af6ca2a6427e28ae74d5379e055fcd1d957512',
        provider,
      );

      const contract = new ethers.Contract(contractAddress, ERC20, wallet);
      const simpleInitialization = new ethers.Contract(
        contractAddress,
        ERC20,
        provider,
      );
      let balance = await contract.balanceOf(
        '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee',
      );

      const approve = await contract.approve(
        '0x0E103a14A73bEAA028D2171870263622F272E613',
        '500',
      );
      await approve.wait();
      // console.log(approve);
      const allowance = await simpleInitialization.allowance(
        '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee',
        '0x0E103a14A73bEAA028D2171870263622F272E613',
      );
      // console.log(allowance.toString(), 'hellll');

      const transfer = await contract.transfer(
        '0x0E103a14A73bEAA028D2171870263622F272E613',
        20,
      );
      // console.log(transfer, '>>>==transfer');
      const transferFrom = await contract.transferFrom(
        '0x0E103a14A73bEAA028D2171870263622F272E613',
        '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee',
        100,
      );
      transferFrom.wait();
      console.log(transferFrom, '>==transferFrom');
      return {
        accountBalance: balance,
        // allowance,
        // approve,
      };
    } catch (error) {
      throw new Error(error);
    }
  }
}
