const axios = require('axios');
//TODO: fixa så de går att lägga till fler kanaler via youtube-channels.json
const jsonHandler = require('../json/json-handler');
const channels = jsonHandler.youtube_channels;

const url = `https://www.googleapis.com/youtube/v3/search?key=${process.env.YOUTUBE_APIKEY}&part=snippet,id&order=date&maxResults=5&channelId=UCJfn3qHQ-Qy4xQDtSW3XT5Q`;
const youTube = axios.create({
  baseURL: url,
});

//FIXME Ändra tillbaka till new Date
// const startedAt = Date.parse('2022-03-31T14:58:00Z');
const startedAt = new Date();

module.exports = (channel) => {
  //TODO: Fixa så den inte kör mellan 24-07
  const do_the_stuff = async () => {
    const now = new Date().getHours();
    if (now > 8)
      try {
        const response = await youTube.get();
        check_for_latest_video(response.data.items, channel);
      } catch (error) {
        console.error(error);
      }
  };

  do_the_stuff();
  // Calls youtube evry 15 min. change last number to change it.
  setInterval(do_the_stuff, 1000 * 60 * 10);
};

const check_for_latest_video = (videos, channel) => {
  // console.log('vid Length:', videos.length);

  const reversed = videos.reverse();

  //TODO: FIxa en checker
  for (const video of reversed) {
    // DONT MORE CHECKS IF ITS UPLOADED BEFORE BOT STARTED
    const publishedAt = Date.parse(video.snippet.publishedAt);

    // if (startedAt > publishedAt) {
    //   continue;
    // }
    // console.log('I FOR OF VIDOES');
    if (jsonHandler.check_latest_video(video))
      send_message_to_channel(channel, video);
  }
};

const send_message_to_channel = (channel, video) => {
  channel.send(
    `${video.snippet.title}\nhttps://www.youtube.com/watch?v=${video.id.videoId}`
  );
};
