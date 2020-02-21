import 'source-map-support/register';

import { APIGatewayEvent, APIGatewayProxyHandler, Context } from 'aws-lambda';
import * as awsServerlessExpress from 'aws-serverless-express';
import * as express from 'express';

import { slideRouter } from './routes/slide';

const passport = require('passport');

const app = express();
const server = awsServerlessExpress.createServer(app);
const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser')

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(cors({ origin: true }));
app.use('/slide', slideRouter);

app.get('/', (req: express.Request, res: express.Response) => {
  res.json({ hello: 'world' });
});

export const handler: APIGatewayProxyHandler = (event: APIGatewayEvent, context: Context) => {
  awsServerlessExpress.proxy(server, event, context);
};
