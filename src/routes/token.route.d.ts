import { EBadgeType } from '../types/badge.types';

declare namespace TokenRouteNamespace {

  /*============GET ONE ITEM===============*/

  /**
   * Response body for
   *  GET /tokens/:id/metadata
   */
  interface IGetTokenMetadataRouteBody {
    badgeType: EBadgeType;
    name: string;
    image: string;
    description?: string;
    organization: string;
    originalOwnerAddress: string;
    creatorAddress: string;
    creationDate: string;
    confirmedBy: string[];
  }

  /**
   * Response body for
   *  GET /tokens/contract
   */
  interface IGetTokenContractRouteBody {
    address: string;
    abi: string;
  }
}

export default TokenRouteNamespace;
