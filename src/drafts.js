import { google } from 'googleapis';
import { writeFile } from 'fs';
import { exit } from 'process';
const youtube = google.youtube({
    version: 'v3',
    auth: '',
});


async function listVideoIds(nextPageToken) {
    const { data } = await youtube.playlistItems.list({
        part: 'snippet',
        playlistId: '',
        maxResults: 50,
        fields: 'nextPageToken,items(snippet(resourceId(videoId)))',
        pageToken: nextPageToken,
    });

    const videoIds = data.items.map(item => item.snippet.resourceId.videoId);
    if (data.nextPageToken) {
        const nextPageDraftVideoIds = await listVideoIds(data.nextPageToken);
        return [...videoIds, ...nextPageDraftVideoIds];
    }

    console.log(videoIds)

    return videoIds;
}

async function getVideoPrivacyStatus(videoId) {
    const { data } = await youtube.videos.list({
        part: 'status',
        id: videoId,
        fields: 'items(status(privacyStatus))',
    });

    console.log(data.items)
    const privacyStatus = data.items[0]?.status.privacyStatus
    if(privacyStatus !== 'public') return privacyStatus;
}


async function main() {
    const draftVideoIds = await listVideoIds();

    const draftVideoPrivacyStatuses = await Promise.all(draftVideoIds.map(async (videoId) => {
        const privacyStatus = await getVideoPrivacyStatus(videoId);
        if (privacyStatus) return { videoId, privacyStatus };
    }));
    console.log(draftVideoPrivacyStatuses)

    const filePath = 'draft_video_ids.txt';
    const cleanDraftVideoStatuses = draftVideoPrivacyStatuses.filter( Boolean )
    console.log(cleanDraftVideoStatuses)


    writeFile(filePath, cleanDraftVideoStatuses.map(({ videoId }) => videoId).join('\n'), (err) => {
        if (err) {
            console.error(`Error writing file: ${err}`);
            return;
        }
        console.log(`Draft video IDs written to ${filePath}`);
    });
}


main();
