const express = require('express')
const path = require('path')
const cors = require('cors')
const atob = require('atob')
const dl = require('./dl.js')
const search = require('./search.js')
const { log } = require('console')

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cors({ origin: true, credentials: true }))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

app.get('/convert/link/:link', async (req, res) => {

  console.log('i should stream a link', req.params.link);

  const link = atob(decodeURI(req.params.link))

  await dl(link, res)
})

app.get('/search/query/:query', async (req, res) => {

  console.log('i should search for a query', req.params.query);

  const result = await search(atob(decodeURI(req.params.query)))

  res.json(result)
})

app.listen(port, () => {
  console.log('listening on port ' + port)
})
