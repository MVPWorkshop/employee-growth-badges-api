import passport from 'passport';
import express, { Router, Request, Response } from 'express';
import * as bodyParser from 'body-parser';
import router from './routes';
import { error } from './middleware/error.middleware';
import { CONFIG } from './config';
import session from 'express-session';
import { SESSION_OPTIONS } from './config/session.config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import ContractService from './services/contract.service';

const {NODE_PORT, NODE_HOST} = CONFIG;

const app = express();

app.set('port', NODE_PORT);
app.set('host', NODE_HOST);

const apiRouter = Router();

app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session(SESSION_OPTIONS));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static('public'));

// API Middlewares
// apiRouter.use(cors(CORS_OPTIONS));
// apiRouter.use(cookieParser());
// apiRouter.use(passport.initialize());
// apiRouter.use(passport.session());
apiRouter.use('/api', router);

// Helmet
// app.use(helmet.xssFilter());
// app.use(helmet.frameguard({
//   action: 'deny'
// }));
// app.use(helmet.noSniff());
// app.use(helmet.hidePoweredBy());
//
// app.use(publicRouter);
app.use(apiRouter);

app.use(error);

// 404
app.use('*', (request: Request, response: Response) => {
  return response.status(404).json({message: 'Not Found'});
});

ContractService.setupWatcher();

export default app;
