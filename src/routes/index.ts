import { Request, Response, Router } from 'express';
import AuthRoute from './auth.route';

const router = Router();

router.get('/status', async (request: Request, response: Response) => {
  return response.json({
    message: 'Server is alive.'
  });
});

// Authentication
router.post('/register', AuthRoute.register);
router.post('/login', AuthRoute.login);

export default router;
