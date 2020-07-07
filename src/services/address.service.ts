import Address from '../models/Address.model';
import AddressServiceNamespace from './address.service.d';
import { Includeable } from 'sequelize';

class AddressService {

  public static async createAddress(data: AddressServiceNamespace.ICreateAddressData) {
    return Address.findOrCreate({
      where: {
        address: data.address
      },
      defaults: {
        address: data.address,
        username: data.username,
        email: data.email
      }
    });
  }

  public static async getAddressById(id: string, include?: Includeable[]) {
    return Address.findOne({
      where: {
        id
      },
      include
    })
  }

  public static async getAddressByWalletAddress(walletAddress: string, include?: Includeable[]) {
    return Address.findOne({
      where: {
        address: walletAddress
      },
      include
    })
  }
}

export default AddressService;
