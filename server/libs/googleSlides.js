const { google } = require('googleapis');
const uuid = require('uuid/v4');

exports.createPresentationAndSlides = async function createPresentationAndSlides(credentials, presentationProperty = {}, resourceObjects = []) {
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  oauth2Client.setCredentials(credentials);
  const googleSlides = google.slides({version: "v1", auth: oauth2Client})
  const newPresentationResponse = await googleSlides.presentations.create(presentationProperty)
  // newPresentationResponse.data.pageSize でPresentationの幅、高さの情報が取れる
  const slideImageObjects = createImageSlideObjects(resourceObjects);
  const slides = await googleSlides.presentations.batchUpdate({
    presentationId: newPresentationResponse.data.presentationId,
    resource: {
      requests: slideImageObjects,
    }
  });
  const updatePresentationResponse = await googleSlides.presentations.get(newPresentationResponse.data.presentationId);
  return updatePresentationResponse.data;
};

function createImageSlideObjects(resourceObjects = []) {
  const objects = [];
  for (const resourceObject of resourceObjects){
    const slideObjectId = uuid();
    objects.push({
      createSlide: {
        objectId: slideObjectId,
      },
    });
    // TODO: 真ん中にしてあげるのが親切かも
    const imageObjectId = uuid();
    objects.push({
      createImage: {
        objectId: imageObjectId,
        url: resourceObject.image_url,
        elementProperties: {
          pageObjectId: slideObjectId,
        }
      }
    })
    return objects;
  }
}