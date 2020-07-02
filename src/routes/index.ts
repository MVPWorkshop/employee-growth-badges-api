import { Request, Response, Router } from 'express';
import AuthRoute from './auth.route';
import { isAuthenticated } from '../middleware/authenticated.middleware';
import BadgesRoute from './badges.route';

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

export default router;
