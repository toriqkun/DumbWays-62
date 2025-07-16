const express = require('express')
const app = express()
const port = 3300

app.get('/', (req, res) => {
  res.send('Hello Guys!!')
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})
