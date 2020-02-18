const WebSocket = require('ws')
const path = require('path')
const fs = require('fs')
const { SERVER, LOCALDIR } = require('./pathfile')

async function setupSocket(systemVariable, mainwindow) {
  const ws = new WebSocket(SERVER)
  ws.on('open', function open() {
    // ws.send('something')
  })
  ws.on('message', async function incoming(data) {
    const res = JSON.parse(data)
    console.log('type ' + typeof res)
    console.log('len: ' + res.length)
    for (let i = 0; i < res.length; i++) {
      fs.writeFile(
        path.join(LOCALDIR, 'test' + i),
        res.data,
        { encoding: 'base64' },
        function(err) {
          console.log('File created')
        }
      )
    }
    // let obj = await systemVariable.checkSystemVariable(LOCALDIR)
    // mainwindow.webContents.send('test', obj)
  })
  ws.on('ping', function ping(data) {
    let obj = {
      capacity: systemVariable.capacity * 1024 ** 3, //byte
      bandwidth: systemVariable.bandwidth
    }
    console.log('ping: ' + obj)
    ws.send(JSON.stringify(obj)) //정보 실어 보내기
  })

  return ws
}

module.exports = { setupSocket }
