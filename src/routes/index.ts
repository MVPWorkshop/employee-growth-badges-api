import { Request, Response, Router } from 'express';
import AuthRoute from './auth.route';
import { isAuthenticated } from '../middleware/authenticated.middleware';
import BadgesRoute from './badges.route';
import OrganizationsRoute from './organizations.route';
import VotesRoute from './votes.route';

const router = Router();

router.get('/status', async (request: Request, response: Response) => {
  return response.json({
    message: 'Server is alive.'
  });
});

// Authentication
router.post('/register', AuthRoute.register);
router.post('/login', AuthRoute.login);

// Badges
router.post('/badges', isAuthenticated, BadgesRoute.createBadge);
router.get('/badges', isAuthenticated, BadgesRoute.getBadgeList);
router.get('/badges/:id', isAuthenticated, BadgesRoute.getBadge);

// Organizations
router.post('/organizations', isAuthenticated, OrganizationsRoute.createOrganization);
router.get('/organizations/:id', isAuthenticated, OrganizationsRoute.getOrganization);

// Voting
router.post('/votes', isAuthenticated, VotesRoute.vote);

export default router;
