import { NextFunction, Request, Response } from 'express';

const express = require('express');
const passport = require('passport');
const googleRouter = express.Router();

googleRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

googleRouter.get('/auth', passport.authenticate('google', { scope: ['email', 'profile'], session: false, accessType: 'offline' }));

googleRouter.get('/callback', passport.authenticate('google'), (req: Request, res: Response, next: NextFunction) => {
  res.redirect('/');
});

export { googleRouter };
