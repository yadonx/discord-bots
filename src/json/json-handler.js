'use strict';

const fs = require('fs');

let rawdata = fs.readFileSync('src/json/youtube-channels.json');
module.exports.youtube_channels = JSON.parse(rawdata);
// module.exports.check_latest_video = () => {
//   console.log('check');
// };
