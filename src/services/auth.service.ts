import AuthServiceNamespace from './auth.service.d';
import Address from '../models/Address.model';
import {
  addHexPrefix,
  ecrecover,
  fromRpcSig,
  hashPersonalMessage,
  isValidSignature,
  pubToAddress
} from 'ethereumjs-util';
import { AuthorizationError, ConflictError, InvalidRequestError, NotFoundError } from '../utils/errors.util';
import AddressService from './address.service';
import moment from 'moment';
import { CONFIG } from '../config'
import { Includeable } from 'sequelize';
import Badge from '../models/Badge.model';
import Organization from '../models/Organization.model';
import BadgeService from './badge.service';

class AuthService {

  private static verifySignature(payload: string, signature: string) {
    const signatureParams = fromRpcSig(signature);

    // If not a valid signature on homestead or later hard fork throw new error
    if (!isValidSignature(signatureParams.v, signatureParams.r, signatureParams.s, true)) {
      throw new InvalidRequestError('Invalid signature');
    }

    // Hash the payload that was signed
    const payloadHash = hashPersonalMessage(Buffer.from(payload));
    // Extract the public key using the hash and the signature
    const pubKey: Buffer = ecrecover(payloadHash, signatureParams.v, signatureParams.r, signatureParams.s);
    // Getting the address using the public key
    const address: string = addHexPrefix(pubToAddress(pubKey).toString('hex'));

    return {
      pubKey,
      address
    }
  }

  public static async registerAddress(requestBody: AuthServiceNamespace.IRegisterData) {
    const { payload, walletAddress, signature, email, username } = requestBody;

    const { address } = this.verifySignature(JSON.stringify(payload), signature);

    if (address.toLowerCase() !== walletAddress.toLowerCase()) {
      throw new InvalidRequestError('Signature and request wallet addresses do not match');
    }

    const [dbAddress, created] = await AddressService.createAddress({
      address,
      email,
      username
    });

    if (!created) {
      throw new ConflictError();
    }

    return dbAddress;
  }

  public static async login(requestData: AuthServiceNamespace.ILoginData) {
    const { payload, signature } = requestData;

    const stringifiedPayload = Buffer.from(payload, 'base64').toString();
    const parsedPayload = JSON.parse(stringifiedPayload);

    const signedAt = moment.unix(parsedPayload.timestamp);
    const diff = moment().diff(signedAt, 'seconds');

    // Signature invalid
    if (diff > +CONFIG.SIGNATURE_EXPIRATION_SEC) {
      throw new AuthorizationError('Signature expired');
    }

    const { address } = this.verifySignature(stringifiedPayload, signature);

    const includeModels: Includeable[] = [
      {
        model: Organization,
        through: {
          where: {
            revoked: false
          }
        }
      }
    ];

    const dbAddress = await AddressService.getAddressByWalletAddress(address, includeModels);

    if (!dbAddress) {
      throw new NotFoundError();
    }

    const badges = await BadgeService.getBadgesByTransfers({walletAddress: dbAddress.address});

    return {
      ...dbAddress.toJSON(),
      badges
    }
  }
}

export default AuthService;
