const WebSocket = require('ws')
const { SERVER } = require('./pathfile')

async function setupSocket(systemVariable) {
  const ws = new WebSocket(SERVER)
  ws.on('open', function open() {
    // ws.send('something')
  })
  ws.on('message', function incoming(data) {
    console.log('data: ' + data)
    console.log('len: ' + data.length)
    console.log(JSON.stringify(data))
  })
  ws.on('ping', function ping(data) {
    let obj = {
      capacity: systemVariable.capacity * 1024 ** 3,
      bandwidth: systemVariable.bandwidth
    }
    console.log(obj)
    ws.send(JSON.stringify(obj)) //정보 실어 보내기
  })

  return ws
}

module.exports = { setupSocket }
