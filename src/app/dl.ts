import ytdl from 'ytdl-core'
import ffmpeg from 'fluent-ffmpeg'

const downloadAndConvertVideoToMp3 = async ({
  title,
  videoUrl,
  startTime,
  duration,
  resStream,
}) => new Promise((resolve, reject) => ffmpeg(ytdl(videoUrl, { filter: 'audioonly', quality: 'highestaudio' }))
  .toFormat('mp3')
  .withAudioBitrate(320)
  .setStartTime(startTime)
  .duration(duration)
  .on('error', (err) => reject(err))
  .on('end', () => resolve(`${title}.mp3`))
  .writeToStream(resStream, { end: true })
)

const mergeParams = (videoInfo, params, resStream) => ({
  title: params.title ?? videoInfo.videoDetails.title,
  videoUrl: videoInfo.videoDetails.video_url,
  startTime: params.startTime ?? '00:00:00',
  duration: params.duration ?? videoInfo.videoDetails.lengthSeconds,
  resStream: resStream
});


const youtubeMp3Converter = (resStream) => (youtubeUrl, params = {}) =>
  ytdl
    .getInfo(youtubeUrl)
    .then((info) => mergeParams(info, params, resStream))
    .then((info) => {
      console.log(info.title);
      
      resStream.setHeader(
        "Content-Disposition", `attachment; filename=${encodeURI(info.title)}.mp3`
      );
      return info;
    })
    .then(downloadAndConvertVideoToMp3);


export async function dl(link, resStream) {
  const convertLinkToMp3 = youtubeMp3Converter(resStream)
  console.log('tryna to dl');
  return convertLinkToMp3(link)
}

