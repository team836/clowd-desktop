const io = require('socket.io-client')

function setupSocket(url) {
  const socket = io(url)
  socket.on('success-connect', () => {
    console.log('connected') // displayed
  })

  socket.on('check1', () => {
    console.log('receive pong') // displayed
  })
  return socket
}

module.exports = { setupSocket }
