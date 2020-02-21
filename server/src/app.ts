import 'source-map-support/register';

import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';

import { slideRouter } from './routes/slide';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

const app = express();
const server = awsServerlessExpress.createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: '/ag2w-245905/asia-northeast1/api/google/callback',
    },
    async (accessToken: string, refreshToken: string, profile: any, cb: any) => {
      const account = {
        id: profile.id,
        accessToken: accessToken,
        refreshToken: refreshToken || '',
        profile: profile,
      };
      cb(undefined, account);
    },
  ),
);

app.use(cors({ origin: true }));
app.use('/slide', slideRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ hello: 'world' });
});

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};
