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

// Generate random number
let randomNumber = Math.floor(Math.random() * (10 - 1 + 1)) + 1
// Request variable to hold request value
let reqUrl
// Check valid URL
const urlChecker = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

// Response with parsed as text request body
app.post('/api/shorturl', function (req, res) {
  // Access to form input field with name="url"
  reqUrl = req.body.url
  if (reqUrl.match(urlChecker)) {
    res.json({ original_url: reqUrl, short_url: randomNumber })
  }
  res.json({ error: 'invalid url' })
})

// Redirect short URL request
app.get('/api/shorturl/' + randomNumber, function (req, res) {
  res.redirect(reqUrl)
})

app.listen(port, function () {
  console.log(`Listening on port ${port}`)
})
