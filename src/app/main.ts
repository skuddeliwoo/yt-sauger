import express from "express";
import path from "path"
import cors from "cors"
import atob from "atob"
import {dl} from './dl'

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(cors({ origin: true, credentials: true }))

app.get('/', (_, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

app.get('/convert/link/:link', async (req, res) => {

	console.log('i should stream a link', req.params.link);

	const link = atob(decodeURI(req.params.link))

	console.log('link', link);

	await dl(link, res)
})

app.listen(port, () => {
	console.log('listening on port ' + port)
})
