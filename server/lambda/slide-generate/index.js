const requireRoot = require('app-root-path').require;
const googleImageSearch = requireRoot('/libs/googleImageSearch');
const frickrSearch = requireRoot('/libs/frickrSearch');
const twitterStatus = requireRoot('/libs/twitterStatus');
const googleSlides = requireRoot('/libs/googleSlides');

exports.handler = async (event, context) => {
  console.log(event);
  const googleAccessToken = event.googleAccessToken;
  const searchWords = event.words.split(',');
  const presentationProperty = JSON.parse(event.presentationProperty || '{}');
  const imageResources = [];
  for (const searchWord of searchWords) {
    if (event.searchWebsiteType === 'frickr') {
      const searchPhotos = await frickrSearch.searchFlickrPhotos({
        text: searchWord,
      });
      const targetPhoto = searchPhotos.photo[Math.floor(Math.random() * searchPhotos.photo.length)];
      imageResources.push(searchPhotos.convertToPhotoToObject(targetPhoto));
    } else if (event.searchWebsiteType === 'twitter') {
      const searchTweets = await twitterStatus.searchResourceTweets({
        q: searchWord,
      });
      const searchResults = twitterStatus.convertStatusesToResourcesObject(searchTweets);
      imageResources.push(searchResults.images[Math.floor(Math.random() * searchResults.images.length)]);
    } else {
      const searchResults = await googleImageSearch.searchGoogleToObjects({
        q: searchWord,
      });
      imageResources.push(searchResults[Math.floor(Math.random() * searchResults.length)]);
    }
  }
  const presentation = await googleSlides.createPresentationAndSlides(
    {
      access_token: googleAccessToken,
    },
    presentationProperty,
    imageResources,
  );
  return presentation;
};
