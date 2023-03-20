require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
// Add body-parser
const bodyParser = require('body-parser')
// Parse application/x-www-form-urlencoded - allow to parse form data
app.use(bodyParser.urlencoded({ extended: false }))
// Use body-parser to parse body as text https://expressjs.com/en/resources/middleware/body-parser.html#bodyparsertextoptions
// app.use(bodyParser.text())
// parse application/json
// app.use(bodyParser.json())

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
  // Access to form input field with name="url"
  res.json({ original_url: req.body.url, short_url: '1' })
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
