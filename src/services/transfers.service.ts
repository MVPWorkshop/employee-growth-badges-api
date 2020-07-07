import Transfer from '../models/Transfer.model';
import TransfersServiceNamespace from './transfers.service.d';
import { Transaction } from 'sequelize';

class TransfersService {
  public static async getTransferById(id: string) {
    return Transfer.findOne({
      where: {
        id
      }
    })
  }

  public static async createTransfer(data: TransfersServiceNamespace.ICreateTransferData, tx?: Transaction) {
    return Transfer.findOrCreate({
      where: {
        tx_hash: data.txHash
      },
      defaults: {
        address_from: data.from,
        address_to: data.to,
        token_id_on_chain: data.blockchainTokenId,
        tx_hash: data.txHash
      },
      transaction: tx
    })
  }
}

export default TransfersService;
