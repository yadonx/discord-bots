'use strict';

const fs = require('fs');

const file = require('./youtube-channels.json');
module.exports.youtube_channels = file.channels;

module.exports.check_latest_video = (video) => {
  const file = require('./youtube-latest-video.json');

  for (const latest of file) {
    if (latest.channelName === video.snippet.channelTitle) {
      if (latest.videoId === video.etag) return false;
      else if (
        Date.parse(latest.publishedAt) < Date.parse(video.snippet.publishedAt)
      ) {
        latest.videoId = video.etag;
        latest.publishedAt = video.snippet.publishedAt;
        const data = JSON.stringify(file);
        fs.writeFileSync('src/json/youtube-latest-video.json', data);
        return true;
      }
    }
  }
  return false;
};
