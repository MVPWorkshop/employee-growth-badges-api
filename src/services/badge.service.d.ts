import BadgesRouteNamespace from '../routes/badges.route.d';

declare namespace BadgesServiceNamespace {
  interface ICreateBadgeData extends BadgesRouteNamespace.IBadgesRouteCreateRequestBody {
  }
  
  interface IBadgeListQueries extends BadgesRouteNamespace.IBadgeRouteGetListQueries {
  }
}

export default BadgesServiceNamespace;
