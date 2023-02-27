import { createReadStream } from "fs";
import { google } from "googleapis";
import { YOUTUBE_CHANNEL_ID, YOUTUBE_API_KEY } from "./env";

const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY
});

const listUploads = async () => {
  const channelResponse = await youtube.channels.list({
    part: 'contentDetails',
    id: [YOUTUBE_CHANNEL_ID]
  });
  const uploadsId = channelResponse.data.items[0].contentDetails.relatedPlaylists.uploads
  const uploadsResponse = await youtube.playlistItems.list({
    part: "contentDetails",
    playlistId: uploadsId,
    maxResults: 10
  });
  const uploads = uploadsResponse.data.items;
  console.log(`Videos uploaded to YouTube`, uploads);
}

const upload = async (videosToUpload) => {
  let i = 1;
  while (i < 10) {
    const snippetObject = {
      title: `Bitcoin Block ${i}`,
      description: `https://mempool.com/block/${i}`
    }

    const uploadVideo = await youtube.videos.insert({
      part: "snippet",
      requestBody: {
        snippet: snippetObject
      },
      media: {
        body: createReadStream(YOUTUBE_VIDEO_FILE + i),
      },
    });

    console.log(`Video ${snippetObject.title} uploaded`, uploadVideo.data);
  }
}

export { upload, listUploads }