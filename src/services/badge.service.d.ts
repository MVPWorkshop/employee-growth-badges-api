import BadgesRouteNamespace from '../routes/badges.route.d';
import { EBadgeStatus } from '../types/badge.types';

declare namespace BadgesServiceNamespace {
  interface ICreateBadgeData extends BadgesRouteNamespace.IBadgesRouteCreateRequestBody { 
  }
  
  interface IUpdateBadgeData {
    status?: EBadgeStatus
  }
  
  interface IBadgeListQueries extends BadgesRouteNamespace.IBadgeRouteGetListQueries {
  }
}

export default BadgesServiceNamespace;
