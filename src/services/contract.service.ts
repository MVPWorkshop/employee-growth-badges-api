import { CONFIG } from '../config';
import Web3Util from '../utils/web3.util';
import { EventData } from 'web3-eth-contract';
import BadgeService from './badge.service';
import TransfersService from './transfers.service';
import { EBadgeStatus } from '../types/badge.types';

class ContractService {

  private static readonly erContract = new Web3Util.web3Wss.eth.Contract(JSON.parse(CONFIG.ER_CONTRACT_ABI), CONFIG.ER_CONTRACT_ADDRESS);

  public static getEmployeeRecognitionContractDetails() {
    return {
      address: CONFIG.ER_CONTRACT_ADDRESS,
      abi: CONFIG.ER_CONTRACT_ABI
    }
  }

  public static setupWatcher() {

    const onTokenMint = async (event: EventData) => {
      if (event) {
        const {
          _offchainId,
          _id
        } = event.returnValues;

        try {
          const dbBadge = await BadgeService.getBadgeById(_offchainId)

          if (dbBadge && !dbBadge.token_id_on_chain) {
            console.log("New token minted, txHash:", event.transactionHash);
            console.log("Event", event);

            dbBadge.update({
              token_id_on_chain: _id,
              status: EBadgeStatus.SENT
            });
          }
        } catch (error) {
          console.log('Error while creating transfer', error, "txHash", event.transactionHash);
        }
      }
    };

    const onTokenTransfer = async (event: EventData) => {
      if (event) {
        const {
          _from,
          _to,
          _id
        } = event.returnValues;

        try {
          const [, created] = await TransfersService.createTransfer({
            from: _from,
            to: _to,
            blockchainTokenId: _id,
            txHash: event.transactionHash
          });

          if (created) {
            console.log("New token transfer, txHash:", event.transactionHash);
            console.log("Event", event);
          }
        } catch (error) {
          console.log('Error while creating transfer', error, "txHash", event.transactionHash);
        }
      }
    };

    this.erContract.events.NotifyWatcher({
      fromBlock: 0
    }).on('data', onTokenMint);

    this.erContract.events.TransferSingle({
      fromBlock: 0
    }).on('data', onTokenTransfer);
  }
}

export default ContractService;
