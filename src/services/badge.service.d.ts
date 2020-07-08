import BadgesRouteNamespace from '../routes/badges.route.d';
import { EBadgeStatus, EBadgeType } from '../types/badge.types';
import Badge from '../models/Badge.model';

declare namespace BadgesServiceNamespace {
  interface ICreateBadgeData extends BadgesRouteNamespace.IBadgesRouteCreateRequestBody {
    creatorAddressId: string;
  }
  
  interface IUpdateBadgeData {
    status?: EBadgeStatus
  }
  
  interface IBadgeListQueries {
    organization_id?: string;
  }

  interface IBadgesOfOwnerQuery {
    token_id_on_chain: string;
    id: string;
    organization_id: string;
    creator_address_id: string;
    created_for_address: string;
    special_note: string;
    badge_type: EBadgeType;
    status: EBadgeStatus;
    created_at: string;
    updated_at: string;
    owner_address: string;
  }
  
  interface IBadgesOfOwnerListQueries {
    walletAddress?: string; 
    organizationId?: string;
  }
}

export default BadgesServiceNamespace;
