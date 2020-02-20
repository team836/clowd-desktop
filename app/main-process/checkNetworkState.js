const { exec } = require('child_process');

function checkNetwork() {
  return new Promise((resolve, reject) => {
    exec(
      'cmd /c chcp 65001>nul &&netsh wlan show interfaces',
      (error, stdout, stderr) => {
        if (error) {
          reject(error);
        }
        resolve(stdout ? mapOutput(stdout) : stderr);
      }
    );
  });
}

/**
 * @param {string} stdout
 */
function mapOutput(stdout) {
  let parsed = stdout
    .trim()
    .split('\r\n')
    .filter(line => {
      return line.includes('Mbps');
    });
  // eslint-disable-next-line prefer-destructuring
  parsed = parsed[0];
  parsed = parseInt(parsed.split(':')[1].trim(), 10);
  return { bandwidth: parsed };
}
module.exports = checkNetwork;
