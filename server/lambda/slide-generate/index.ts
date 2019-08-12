import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

//const requireRoot = require('app-root-path').require;
//const googleImageSearch = requireRoot('/libs/googleImageSearch');
//const frickrSearch = requireRoot('/libs/frickrSearch');
//const twitterStatus = requireRoot('/libs/twitterStatus');
//const googleSlides = requireRoot('/libs/googleSlides');
const googleImageSearch = require('../../libs/googleImageSearch');
const frickrSearch = require('../../libs/frickrSearch');
const twitterStatus = require('../../libs/twitterStatus');
const googleSlides = require('../../libs/googleSlides');

export const handler: APIGatewayProxyHandler = async (event, _context) => {
  console.log(event);
  const requestOption = JSON.parse(event.body);

  const googleAccessToken = requestOption.googleAccessToken;
  const searchWords = requestOption.words.split(',');
  const presentationProperty = requestOption.presentationProperty || {};
  const imageResources = [];
  for (const searchWord of searchWords) {
    if (requestOption.searchWebsiteType === 'frickr') {
      const searchPhotos = await frickrSearch.searchFlickrPhotos({
        text: searchWord,
      });
      if(searchPhotos.length > 0){
        const targetPhoto = searchPhotos.photo[Math.floor(Math.random() * searchPhotos.photo.length)];
        imageResources.push(frickrSearch.convertToPhotoToObject(targetPhoto));
      }
    } else if (requestOption.searchWebsiteType === 'twitter') {
      const searchTweets = await twitterStatus.searchResourceTweets({
        q: searchWord,
      });
      const searchResults = twitterStatus.convertStatusesToResourcesObject(searchTweets);
      if(searchResults.length > 0){
        imageResources.push(searchResults.images[Math.floor(Math.random() * searchResults.images.length)]);
      }
    } else {
      const searchResults = await googleImageSearch.searchGoogleToObjects({
        q: searchWord,
        tbm: 'isch',
      });
      if(searchResults.length > 0){
        imageResources.push(searchResults[Math.floor(Math.random() * searchResults.length)]);
      }
    }
  }
  const presentation = await googleSlides.createPresentationAndSlides(
    {
      access_token: googleAccessToken,
    },
    presentationProperty,
    imageResources,
  );
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin" : "*" // Required for CORS support to work
    },
    body: JSON.stringify(presentation),
  };
};
