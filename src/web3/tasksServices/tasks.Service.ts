import { Injectable } from '@nestjs/common';
import { byteCode, ERC20 } from '../ABI/ERC20';
import { ethers, ContractFactory } from 'ethers';
import { PairAbi } from '../ABI/PairAbi';
import { abi } from '../ABI/Abi';
import axios from 'axios';
import { Web3Service } from '../web3.service';
import { transferAbi } from '../ABI/transferAbi';
const Web3 = require('web3');
const provider = new ethers.providers.JsonRpcProvider(
  'https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66',
);
const wsRpc = 'wss://mainnet.infura.io/ws/v3/d868f46f29aa4637b54e7bf871b279bf';
const wsWeb3 = new Web3(wsRpc);
const web3 = new Web3(
  'https://rinkeby.infura.io/v3/d8761b551d1f4423b12bcd298d66ed66',
);
// https://speedy-nodes-nyc.moralis.io/918709a9b4cdb26d72e5e898/eth/mainnet
// https://speedy-nodes-nyc.moralis.io/918709a9b4cdb26d72e5e898/eth/rinkeby
const contractAddress = '0xF5C638B9E09727D714Aca185B657F691b4E24ddc';
const swapTopic =
  '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822';
@Injectable()
export class TaskService {
  constructor(private readonly web3Service: Web3Service) {}
  async filterTransfersByAddress(address: string, eventName: string) {
    try {
      if (!eventName) eventName = 'Transfer';
      const contract = new ethers.Contract(contractAddress, ERC20, provider);
      const result = await contract.filters.Transfer(
        address,
        '0x611485C1990cd77A7D67e46AA6D6e7F8359dF4ee',
      );
      await this.eventFilter({
        eventName,
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
    eventName,
    fromBlock,
    toBlock,
    address,
    topics,
  }: {
    eventName: string;
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
        .getPastEvents(eventName, options)
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
      let event = await approve.wait();
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
  // <-----------TASK 4---->
  async subscribeToEvent(token: string) {
    try {
      const contractInstance = new web3.eth.Contract(
        PairAbi,
        '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
      );
      const lpAddress = await contractInstance.methods
        .getPair(token, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')
        .call();
      console.log(lpAddress, 'lpAddress>>>');
      let getBlockNumber = await web3.eth.getBlockNumber();

      let fromBlock = getBlockNumber - 100;
      wsWeb3.eth
        .subscribe(
          'logs',
          {
            fromBlock: fromBlock,
            toBlock: 'latest',
            address: lpAddress,
            topics: [swapTopic],
          },
          async function (error, log) {
            // console.log(log, 'log>>>>>');
            const transactionReceipt = await web3.eth.getTransactionReceipt(
              log.transactionHash,
            );
            if (!transactionReceipt) {
              return;
            }
            console.log(transactionReceipt, 'transactionReceipt>>>>>');
            const contractInstance = new web3.eth.Contract(abi, token);
            const tokenDecimals = await contractInstance.methods
              .decimals()
              .call();
            let WETHDECIMALS = 18;

            const lpInstance = new web3.eth.Contract(
              // @ts-ignore
              PairAbi,
              '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f',
            );
            const lpAddress = await lpInstance.methods
              .getPair(token, '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2')
              .call();

            const swaps = transactionReceipt.logs
              .filter(
                (log) =>
                  log.topics.includes(swapTopic) &&
                  log.address.toLowerCase() === lpAddress.toLowerCase(),
              )
              .map((log) => {
                let transactionType = '';
                let tokenAmount = 0;
                let totalWETH = 0;
                // console.log(log, "log================");
                const data = web3.eth.abi.decodeLog(
                  [
                    { type: 'uint', name: 'amount0In' },
                    { type: 'uint', name: 'amount1In' },
                    { type: 'uint', name: 'amount0Out' },
                    { type: 'uint', name: 'amount1Out' },
                  ],
                  log.data,
                  [swapTopic],
                );
                if (data.amount0In !== '0') {
                  transactionType = 'SELL';

                  tokenAmount =
                    parseFloat(data.amount0In) / Math.pow(10, tokenDecimals);
                  totalWETH =
                    parseFloat(data.amount1Out) / Math.pow(10, WETHDECIMALS);
                }
                if (data.amount0Out !== '0') {
                  transactionType = 'BUY';

                  tokenAmount =
                    parseFloat(data.amount0Out) / Math.pow(10, tokenDecimals);
                  totalWETH =
                    parseFloat(data.amount1In) / Math.pow(10, WETHDECIMALS);
                }

                return {
                  transactionType,
                  tokenAmount,
                  totalWETH,
                };
              });
            // console.log(swaps, ' swaps>>');
            return swaps;
          },
        )
        .on('connected', function (subscriptionId) {
          console.log('SubscriptionId : ' + subscriptionId);
        })
        .on('changed', function (log) {})
        .on('error', function (error) {
          console.log(error, 'erro');
        });
      return 'you are getting eth transactions';
    } catch (error) {
      console.log(error);
    }
  }
  async transactionStatus(transactionHash: string) {
    try {
      const transactionReceipt = await web3.eth.getTransactionReceipt(
        transactionHash,
      );
      console.log(transactionReceipt.status, 'transactionReceipt>>>>>');
      if (!transactionReceipt) {
        return 'pending';
      }
      if (transactionReceipt.status === true) {
        return 'success';
      }
      return 'failed';
    } catch (error) {
      console.log(error);
    }
  }
  async tokenTransferred(transactionHash: string) {
    try {
      const transaction = await web3.eth.getTransaction(transactionHash);
      let input_data = '0x' + transaction.input.slice(10);
      let decodeInput = web3.eth.abi.decodeParameters(
        [{ type: 'uint256', name: 'amount' }],
        input_data,
      );

      const ethAmount = await web3.utils.fromWei(
        decodeInput.amount.toString(),
        'ether',
      );
      return {
        amountInWei: decodeInput.amount,
        amountInEth: ethAmount,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getGasPrice() {
    try {
      let result = await axios.get(
        'https://ethgasstation.info/json/ethgasAPI.json',
      );
      // console.log(result);
      let prices = {
        low: result.data.safeLow / 10,
        medium: result.data.average / 10,
        high: result.data.fast / 10,
      };
      return prices;
    } catch (error) {
      console.log(error);
    }
  }
  async sendTransactionWithGasPrice(type: string) {
    try {
      const gasPrices = await this.getGasPrice();
      let gas = gasPrices?.medium;
      if (type === 'low') gas = gasPrices?.low;
      if (type === 'high') gas = gasPrices?.high;
      if (type === 'medium') gas = gasPrices?.medium;
      // console.log(web3.utils.toWei(gas?.toString(), 'gwei'));
      gas = web3.utils.toWei(gas?.toString(), 'gwei');
      // return await web3.eth.getGasPrice();
      return await this.web3Service.sendTransaction(gas);
    } catch (error) {
      console.log(error);
    }
  }
  async getAllTransactions(address: string) {
    try {
      const endBlock = await web3.eth.getBlockNumber();
      const result = await axios.get(
        `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=11265058
&endblock=${endBlock}&page=1&offset=9000&sort=asc&apikey=3SAJ8EXQMXKXDFZPW14S2XVFKPIGZ6JMW2`,
      );
      return result.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getDeployerAddress(contractAddress: string) {
    try {
      console.log('contractAddress', contractAddress);
      let currentBlockNum = await web3.eth.getBlockNumber();
      console.log('currentBlockNum', currentBlockNum);
      let txFound = false;
      // const block = await web3Provider.eth.getBlock(0, true);
      //       console.log('shahbaz',block);
      while (currentBlockNum >= 0 && !txFound) {
        const block = await web3.eth.getBlock(9783409, true);

        const transact = block.transactions;

        for (let j = 0; j < transact.length; j++) {
          // We know this is a Contract deployment
          if (!transact[j].to) {
            const receipt = await web3.eth.getTransactionReceipt(
              transact[j].hash,
            );
            console.log('Contract Creation Transaction:', receipt);

            if (
              receipt.contractAddress &&
              receipt.contractAddress.toLowerCase() ===
                contractAddress.toLowerCase()
            ) {
              txFound = true;
              console.log(`Contract Creator Address: ${transact[j].from}`);
              break;
            }
          }
        }

        currentBlockNum--;
        console.log('currentBlockNum--', currentBlockNum);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getTokenHolders() {
    try {
      let isMainnet = false;
      const contract = '0x521855AA99a80Cb467A12b1881f05CF9440c7023';
      let putRinkeby = isMainnet ? '' : '-rinkeby';
      const { data } = await axios.get(
        `https://api${putRinkeby}.etherscan.io/api?module=contract&action=getabi&address=${contract}`,
      );
      let abiResult;
      if (data.result) abiResult = JSON.parse(data.result);
      const contractInstance = await new web3.eth.Contract(abiResult, contract);

      let options = {
        filter: {
          signature:
            '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        },
        fromBlock: 9227843, //Number || "earliest" || "pending" || "latest"
        toBlock: 'latest',
      };

      const allEvents = await contractInstance.getPastEvents(
        'Transfer',
        options,
      );

      let desiredArray = [];

      allEvents.forEach((event, i) => {
        let iterateInnerLoop = Object.entries(event.returnValues);
        let innerLoopLength = iterateInnerLoop.length / 2;

        let objToPush = {};
        for (let j = innerLoopLength; j < innerLoopLength * 2; j++) {
          let splitted = iterateInnerLoop[j].toString().split(',');
          objToPush[splitted[0]] = splitted[1];
        }
        desiredArray.push({
          ...objToPush,
          //  @ts-ignore
          transactionHash: allEvents[i].transactionHash,
        });
      });

      let uniqueFrom = desiredArray.filter(
        (
          value: {
            _from: string;
          },
          index,
          self,
        ) =>
          index ===
          self.findIndex((t: { _from: string }) => t._from === value._from),
      );

      let uniqueTo = desiredArray.filter(
        (
          value: {
            _to: string;
          },
          index,
          self,
        ) =>
          index === self.findIndex((t: { _to: string }) => t._to === value._to),
      );
      let combinedUnique: string[] = [];
      uniqueTo.forEach((item: { _to: string }) => {
        combinedUnique.push(item._to);
      });
      uniqueFrom.forEach((item: { _from: string }) => {
        combinedUnique.push(item._from);
      });

      const [
        uniqueAddressesWithMoreThanZeroBalance,
        uniqueAddressesWithLessThanZeroBalance,
      ] = await this.getBalances(combinedUnique, contractInstance);
      return {
        uniqueAddressesWithMoreThanZeroBalance:
          uniqueAddressesWithMoreThanZeroBalance.length,
        uniqueAddressesWithLessThanZeroBalance:
          uniqueAddressesWithLessThanZeroBalance.length,
      };
    } catch (error) {
      console.log(error);
    }
  }
  async getBalances(combinedUnique, contractInstance) {
    let arrToReturn: {
      address: string;
      balance: number;
    }[] = [];
    for (let i = 0; i < combinedUnique.length; i++) {
      let balance = contractInstance.methods
        .balanceOf(combinedUnique[i])
        .call();
      arrToReturn.push({ address: combinedUnique[i], balance: balance });
    }
    let tempArr: number[] = [];
    arrToReturn.forEach((item) => tempArr.push(item.balance));
    tempArr = await Promise.all(tempArr);

    tempArr.forEach((item, index) => (arrToReturn[index].balance = item));

    return [
      arrToReturn.filter((item) => item.balance > 0),
      arrToReturn.filter((item) => item.balance <= 0),
    ];
  }
}
