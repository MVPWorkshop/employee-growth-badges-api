import { Request, Response, Router } from 'express';
import AuthRoute from './auth.route';
import { isAuthenticated } from '../middleware/authenticated.middleware';
import BadgesRoute from './badges.route';
import OrganizationsRoute from './organizations.route';
import VotesRoute from './votes.route';
import CollaboratorsRoute from './collaborators.route';
import MetadataRoute from './metadata.route';

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
router.get('/organizations', isAuthenticated, OrganizationsRoute.getOrganizationList);

// Voting
router.post('/votes', isAuthenticated, VotesRoute.vote);

// Collaborators
router.post('/collaborators', isAuthenticated, CollaboratorsRoute.createCollaborator);
router.get('/collaborators', isAuthenticated, CollaboratorsRoute.getCollaboratorList);
router.delete('/collaborators/:id', isAuthenticated, CollaboratorsRoute.revokeCollaborator);

// Metadata
router.get('/metadata/token/:id', MetadataRoute.getTokenMetadata);

export default router;
