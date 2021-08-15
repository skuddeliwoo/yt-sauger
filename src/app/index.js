const express = require('express')
const path = require('path')
const cors = require('cors')
const atob = require('atob')
const dl = require('./dl.js')

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cors({ origin: true, credentials: true }))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/convert/:links', (req, res) => {

	console.log('i should convert links', req.params.links);

	const links = atob(decodeURI(req.params.links)).split(',')

	console.log(links);

	dl(links)


	res.sendFile(__dirname + '/public/convert.html')
})

app.listen(port, () => {
	console.log('listening on port ' + port)
})
