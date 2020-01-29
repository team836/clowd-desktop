const io = require('socket.io-client')

function setupSocket(url) {
  const socket = io(url)
  socket.on('success-connect', () => {
    console.log('connected') // displayed
  })

  socket.on('check1', () => {
    console.log('receive pong') // displayed
  })
  socket.on('ping', () => {
    console.log('xxxxxx')
  })
  socket.on('pong', () => {
    console.log('get pong')
  })
  socket.on('hello', (arg1, arg2, arg3, arg4) => {
    console.log(arg1, arg2, arg3, arg4)
  })
  return socket
}

module.exports = { setupSocket }
