const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');

const downloadAndConvertVideoToMp3 = ({
  title,
  videoUrl,
  startTime,
  duration,
  filePath,
}) =>
  new Promise((resolve, reject) =>
    ffmpeg(ytdl(videoUrl, {filter: 'audioonly', quality: 'highestaudio'}))
        .toFormat('mp3')
        .withAudioBitrate(320)
        .setStartTime(startTime)
        .duration(duration)
        .on('error', (err) => reject(err))
        .on('end', () => resolve(`${filePath}/${title}.mp3`))
        .saveToFile(`${filePath}/${title}.mp3`));


const mergeParams = (videoInfo, params, filePath) => ({
  title: params.title ?? videoInfo.videoDetails.title,
  videoUrl: videoInfo.videoDetails.video_url,
  startTime: params.startTime ?? '00:00:00',
  duration: params.duration ?? videoInfo.videoDetails.lengthSeconds,
  filePath: filePath ?? __dirname,
});

// creates Download function
const youtubeMp3Converter = (filePath) => (youtubeUrl, params={}) =>
  ytdl
      .getInfo(youtubeUrl)
      .then((info) => mergeParams(info, params, filePath))
      .then(downloadAndConvertVideoToMp3);


// Downloads mp3 and Returns path were it was saved.
const convertLinkToMp3 = youtubeMp3Converter(__dirname + '/downloads')


async function dl(links){
  console.log('tryna to dl');
  links.map(async (link) => {
    const pathToMp3 = await convertLinkToMp3(link)
  })
}

module.exports = dl
