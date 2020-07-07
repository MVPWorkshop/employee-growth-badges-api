import Web3 from 'web3';
import { CONFIG } from '../config';
import BigNumber from 'bignumber.js';

class Web3Util {

  constructor() {
    const httpProvider = new Web3.providers.HttpProvider(
      // https + ropsten + . + infura.io/api
      'http://' + CONFIG.ETHERUM_NETWORK + '.' + CONFIG.INFURA_HTTP_ENDPOINT
    );

    const wssProvider = new Web3.providers.WebsocketProvider(
      'wss://' + CONFIG.ETHERUM_NETWORK + '.' + CONFIG.INFURA_WSS_ENDPOINT
    );

    this._web3Instance = new Web3(httpProvider);
    this._web3WebsocketInstance = new Web3(wssProvider);
  }

  private readonly _web3Instance: Web3;
  private readonly _web3WebsocketInstance: Web3;

  public get web3() {
    return this._web3Instance;
  }

  public get web3Wss() {
    return this._web3WebsocketInstance
  }

  public get toHex() {
    return Web3.utils.toHex;
  }

  public weiToGwei(wei: string): string {
    const gweiDivideFactor = new BigNumber(10).pow(9);
    const gwei = new BigNumber(wei).dividedBy(gweiDivideFactor).toString();

    return gwei;
  }

  public weiToEther(wei: string): string {
    const etherDivideFactor = new BigNumber(10).pow(18);
    const ether = new BigNumber(wei).dividedBy(etherDivideFactor).toString();

    return ether;
  }

  public etherToWei(ether: string): string {
    const etherMultiplicationFactor = new BigNumber(10).pow(18);

    return new BigNumber(ether).multipliedBy(etherMultiplicationFactor).toString();
  }

  public async getConfirmations(txHash: string) {
    const transaction = await this._web3Instance.eth.getTransaction(txHash);
    const currentBlock = await this._web3Instance.eth.getBlockNumber();

    if (transaction.blockNumber) {
      return currentBlock - transaction.blockNumber;
    } else {
      return 0;
    }
  }

  public async confirmTransaction(txHash: string, confirmations: number = 3, secondsRefresh: number = 5) {
    return new Promise((resolve, reject) => {
      try {
        setTimeout(async () => {

          const trxConfirmations = await this.getConfirmations(txHash)

          if (trxConfirmations >= confirmations) {
            // If transaction successful return it
            const transaction = this._web3Instance.eth.getTransaction(txHash);

            resolve(transaction);
          }

          // Otherwise run the cycle again
          const confirmation = this.confirmTransaction(txHash, confirmations, secondsRefresh);
          resolve(confirmation);

        }, secondsRefresh * 1000);
      } catch (error) {
        reject(error);
      }
    });
  }

  public isAddress(address: string) {
    if (!address) {
      return false;
    }

    return this._web3Instance.utils.isAddress(address);
  }

  public async getBalance(address: string) {
    const wei = await this.web3.eth.getBalance(address);
    const gwei = this.weiToGwei(wei);
    const ether = this.weiToEther(wei);

    return {
      wei,
      gwei,
      ether
    };
  }
}

export default new Web3Util();
