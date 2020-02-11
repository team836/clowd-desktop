'use strict'

function checkDiskSpaceWrapper(LOCALDIR) {
  checkDiskSpace(LOCALDIR).then((diskSpace) => {
    console.log(diskSpace)
    // {
    //     free: 12345678,
    //     size: 98756432
    // }
    return diskSpace
  })
}

// function mapOutput(stdout) {
//   let parsed = stdout
//     .trim()
//     .split('\n')
//     .slice(1)
//     .map((line) => {
//       return line.trim().split(/\s+(?=[\d/])/)
//     })
//   parsed = parsed[0]
//   return {
//     free: parseInt(parsed[1]) / Math.pow(1024, 1),
//     size: parseInt(parsed[2]) / Math.pow(1024, 1)
//   }
// }
module.exports = checkDiskSpaceWrapper
