import { NextFunction, Response, Request } from 'express';
import AddressService from '../services/address.service';
import { NotFoundError } from '../utils/errors.util';

class AddressRoute {
  public static async getAddress(request: Request, response: Response, next: NextFunction) {
    try {
      const dbAddress = await AddressService.getAddressById(request.params.id);

      if (!dbAddress) {
        throw new NotFoundError()
      }

      return response.status(200).json(dbAddress);
    } catch (error) {
      next(error)
    }
  }
}

export default AddressRoute;
