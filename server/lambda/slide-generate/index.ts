import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

//const requireRoot = require('app-root-path').require;
//const googleImageSearch = requireRoot('/libs/googleImageSearch');
//const frickrSearch = requireRoot('/libs/frickrSearch');
//const twitterStatus = requireRoot('/libs/twitterStatus');
//const googleSlides = requireRoot('/libs/googleSlides');
import { searchGoogleToObjects } from '../../libs/googleImageSearch';
//import { searchFlickrPhotos, convertToPhotoToObject } from '../../libs/frickrSearch';
import { searchResourceTweets, convertStatusesToResourcesObject } from '../../libs/twitterStatus';
import { createPresentationAndSlides } from '../../libs/googleSlides';

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event);
  const requestOption = JSON.parse(event.body);
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
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*', // Required for CORS support to work
    },
    body: JSON.stringify(presentation),
  };
};
