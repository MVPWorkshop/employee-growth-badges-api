import VotesRouteNamespace from '../routes/votes.route.d';

declare namespace VoteServiceNamespace {
  interface ICreateVoteData extends VotesRouteNamespace.ICreateVoteRouteBody {
  }
  
  interface IVoteListQueries extends VotesRouteNamespace.IGetVotesListQueries {
  }
}

export default VoteServiceNamespace;
