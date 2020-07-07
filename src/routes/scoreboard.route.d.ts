import { Request } from 'express';

declare namespace ScoreboardRouteNamespace {
  interface IScoreboardGetListQueries {
    organization_id?: string;
  }
  
  type IScoreboardGetListRouteRequest = Request<any, any, any, IScoreboardGetListQueries>
}

export default ScoreboardRouteNamespace;
