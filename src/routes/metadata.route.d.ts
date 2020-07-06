import { EBadgeType } from '../types/badge.types';

declare namespace MetadataRouteNamespace {

  /*============GET ONE ITEM===============*/

  /**
   * Response body for
   *  GET /metadata/token/:id
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
}

export default MetadataRouteNamespace;
