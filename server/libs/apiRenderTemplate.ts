export function searchFlickrPhotos(message, startTime, results) {
  return {
    message: message,
    executed_millisecond: new Date() - startTime,
    results: results,
    timestamp: new Date().getTime(),
  };
};
