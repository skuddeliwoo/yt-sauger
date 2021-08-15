const express = require('express')
const path = require('path')

const app = express();
const port = 3001;

app.use(express.static(path.resolve(__dirname, 'public')))

app.get('/', (req, res) => {
	res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
	console.log('listening on port ' + port)
})
