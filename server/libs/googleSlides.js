const { google } = require('googleapis');

const createSlides = async function createSlides(credentials) {
  const oauth2Client = new google.auth.OAuth2(process.env.GOOGLE_OAUTH_CLIENT_ID, process.env.GOOGLE_OAUTH_CLIENT_SECRET);
  oauth2Client.setCredentials(credentials);
  const slide = google.slides({
    version: "v1",
    auth: oauth2Client,
  })
  let sl = await slide.presentations.create({
    title: "slide_name"
  })
  let slides = await slide.presentations.batchUpdate({
    presentationId: sl.data.presentationId,
    requests: [{
      createImage: {
        url: "https://hashibaminone.com/wp-content/uploads/2018/08/LINE%E3%82%BF%E3%82%A4%E3%83%A0%E3%83%A9%E3%82%A4%E3%83%B3%E3%81%AE%E6%9C%80%E9%81%A9%E3%81%AA%E7%94%BB%E5%83%8F%E3%82%B5%E3%82%A4%E3%82%B9%E3%82%99.jpg"
      }
    }]
  })
  return sl;
};