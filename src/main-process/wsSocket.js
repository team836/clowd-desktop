const WebSocket = require('ws')
const { SERVER } = require('./pathfile')

async function setupSocket(systemVariable) {
  const ws = new WebSocket(SERVER)
  ws.on('open', function open() {
    ws.send('something')
  })
  ws.on('message', function incoming(data) {
    console.log(data)
  })
  ws.on('ping', function ping(data) {
    console.log(data)
    const obj = {
      capacity: systemVariable.diskSize,
      bandwidth: systemVariable.bandwidth
    }
    ws.send(obj) //정보 실어 보내기
  })
  return ws
}

module.exports = { setupSocket }
