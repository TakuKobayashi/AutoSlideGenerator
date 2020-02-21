import { NextFunction, Request, Response } from 'express';

import { searchGoogleToObjects } from '../libs/googleImageSearch';
//import { searchFlickrPhotos, convertToPhotoToObject } from '../libs/frickrSearch';
import { searchResourceTweets, convertStatusesToResourcesObject } from '../libs/twitterStatus';
import { createPresentationAndSlides } from '../libs/googleSlides';

const express = require('express');
const slideRouter = express.Router();

slideRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

slideRouter.get('/list', (req: Request, res: Response, next: NextFunction) => {
  res.send('hello twitter');
});

slideRouter.post('/generate', async (req: Request, res: Response, next: NextFunction) => {
  const requestOption = JSON.parse(req.body);
  console.log(requestOption);

  const googleAccessToken = requestOption.googleAccessToken;
  const searchWords = requestOption.words.split(',');
  const presentationProperty = requestOption.presentationProperty || {};
  const imageResources = [];
  for (const searchWord of searchWords) {
    if (requestOption.searchWebsiteType === 'frickr') {
      /*
      const searchPhotos = await searchFlickrPhotos({
        text: searchWord,
      });
      if (searchPhotos.photo.length > 0) {
        const targetPhoto = searchPhotos.photo[Math.floor(Math.random() * searchPhotos.photo.length)];
        imageResources.push(convertToPhotoToObject(targetPhoto));
      }
      */
    } else if (requestOption.searchWebsiteType === 'twitter') {
      const searchTweets = await searchResourceTweets({
        q: searchWord,
      });
      const searchResults = convertStatusesToResourcesObject(searchTweets);
      if (searchResults.images.length > 0) {
        imageResources.push(searchResults.images[Math.floor(Math.random() * searchResults.images.length)]);
      }
    } else {
      const searchResults = await searchGoogleToObjects({
        q: searchWord,
        tbm: 'isch',
      });
      if (searchResults.length > 0) {
        imageResources.push(searchResults[Math.floor(Math.random() * searchResults.length)]);
      }
    }
  }
  const presentation = await createPresentationAndSlides(
    {
      access_token: googleAccessToken,
    },
    presentationProperty,
    imageResources,
  );
  res.json(presentation);
});

export { slideRouter };
