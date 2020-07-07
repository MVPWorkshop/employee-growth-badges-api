import { NextFunction, Response } from 'express';
import ScoreboardRouteNamespace from './scoreboard.route.d';
import ScoreboardService from '../services/scoreboard.service';
import { InvalidRequestError } from '../utils/errors.util';

class ScoreboardRoute {
  public static async organizationScoreboard(request: ScoreboardRouteNamespace.IScoreboardGetListRouteRequest, response: Response, next: NextFunction) {
    try {
      const {
        organization_id
      } = request.query;

      if (!organization_id) {
        throw new InvalidRequestError('You must provide query param');
      }

      const scoreboard = await ScoreboardService.getOrganizationScoreboard(organization_id);

      return response.json(scoreboard);
    } catch (error) {
      next(error);
    }
  }
}

export default ScoreboardRoute;
