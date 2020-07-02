import Address from '../models/Address.model';
import AddressServiceNamespace from './address.service.d';
class AddressService {

  public static async createAddress(data: AddressServiceNamespace.ICreateAddressData) {
    return Address.create({
      address: data.address,
      username: data.username,
      email: data.email
    });
  }

  public static async getAddressById(id: string) {
    return Address.findOne({
      where: {
        id
      }
    })
  }

  public static async getAddressByWalletAddress(walletAddress: string) {
    return Address.findOne({
      where: {
        address: walletAddress
      }
    })
  }
}

export default AddressService;
