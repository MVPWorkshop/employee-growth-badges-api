import { EBadgeStatus, EBadgeType } from '../types/badge.types';
import { Request } from 'express';

declare namespace BadgesRouteNamespace {
  // Request body for POST
  interface IBadgesRouteCreateRequestBody {
    badgeType: EBadgeType;
    organizationId: string;
    creatorAddressId: string;
    createdForAddress: string;
    specialNote: string;
  }
  
  type IBadgesRouteCreateRequest = Request<any, any, IBadgesRouteCreateRequestBody>;

  // Response on GET route
  interface IBadgesRouteGetResponse extends IBadgesRouteCreateRequestBody {
    id: string;
    tokenIdOnChain?: string;
    status: EBadgeStatus;
    createdAt: string;
    updatedAt: string;
  }
  
  interface IBadgeRouteGetListQueries {
    user_id?: string;
    organization_id?: string;
  }
  
  type IBadgesRouteGetListRequest = Request<any, any, any, IBadgeRouteGetListQueries>;
}

export default BadgesRouteNamespace;
