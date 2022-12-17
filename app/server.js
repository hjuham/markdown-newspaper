const app = require('./index')
const http = require('http')
const config = require('./utils/config')
//Create server
const server = http.createServer(app)
server.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`)
})
