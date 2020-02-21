import { NextFunction, Request, Response } from 'express';

const express = require('express');
const googleRouter = express.Router();

googleRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

googleRouter.get('/auth', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

googleRouter.get('/callback', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

export { googleRouter };