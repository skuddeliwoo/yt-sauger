const yts = require('yt-search')

async function search(query) {
  console.log('tryna to search in search.js');

  console.log('query:', query);

  const r = await yts(query)

  const videos = r.videos.slice(0, 3)


  videos.forEach(function (v) {
    const views = String(v.views).padStart(10, ' ')
    console.log(`${views} | ${v.title} (${v.timestamp}) | ${v.author.name}`)
  })

  // console.log(r);

  return videos
}

module.exports = search