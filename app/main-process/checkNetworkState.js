// import { exec } from 'child_process';
import speedTest from 'speedtest-net';

async function checkNetwork() {
  const speed = await speedTest();
  return speed.download.bandwidth;
}

export default checkNetwork;
