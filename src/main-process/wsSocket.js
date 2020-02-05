const WebSocket = require('ws')

function setupSocket(systemVariable) {
  const ws = new WebSocket(systemVariable.server)

  ws.on('open', function open() {
    ws.send('something')
  })

  ws.on('message', function incoming(data) {
    console.log(data)
  })

  ws.on('ping', function ping(data) {
    console.log(data)
    ws.send('something')
  })
  return ws
}

module.exports = { setupSocket }
