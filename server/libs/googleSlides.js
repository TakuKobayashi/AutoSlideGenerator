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
  return sl;
};