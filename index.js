require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// Add body-parser
const bodyParser = require('body-parser')
// Use body-parser to parse body as text https://expressjs.com/en/resources/middleware/body-parser.html#bodyparsertextoptions
app.use(bodyParser.text())

// Basic Configuration
const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Your first API endpoint
app.get('/api/hello', function (req, res) {
  res.json({ greeting: 'hello API' })
})

// Response with parsed as text request body
app.post('/api/shorturl', function (req, res) {
  res.json({ original_url: req.body, short_url: '1' })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
