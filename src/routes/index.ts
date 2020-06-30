import { Request, Response, Router } from 'express';

const router = Router();

router.get('/status', async (request: Request, response: Response) => {
  return response.json({
    message: 'Server is alive.'
  });
});

export default router;
