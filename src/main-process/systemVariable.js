const checkFolderSize = require('./folderspace')
const checkDiskSpace = require('check-disk-space')
const checkNetwork = require('./network')
const checkfileCount = require('./filesCount')

class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.diskSize = 0 // disk total size GB
    this.diskFree = 0 // disk remain size GB
    this.fileCount = 0
    this.folderUsage = 0 // folder using size GB
    this.settingSize = 2 // set user total GB
    this.minSettingSize = 0
    this.maxSettingSize = 100
    this.capacity = 0 // min(free ,total-usage) GB
    this.bandwidth = 0 //fetch from server Mbps
    return this
  }
  async checkSystemVariable(LOCALDIR) {
    let [ntw, use, disk, fileCount] = await Promise.all([
      checkNetwork(),
      checkFolderSize(LOCALDIR),
      checkDiskSpace(LOCALDIR),
      checkfileCount(LOCALDIR)
    ])
    this.folderUsage = use
    this.diskFree = (disk.free / 1024 ** 3).toFixed(2)
    this.diskSize = (disk.size / 1024 ** 3).toFixed(2)
    this.fileCount = fileCount
    this.bandwidth = ntw.bandwidth
    this.capacity = Math.min(this.diskFree, this.settingSize - this.folderUsage)
    this.print()
    let temp = {
      folderUsage: this.folderUsage,
      settingSize: this.settingSize,
      fileCount: this.fileCount,
      folderPercent: (this.folderUsage / this.settingSize) * 100,
      settingPercent: parseInt(
        (this.settingSize / (this.maxSettingSize - this.minSettingSize)) * 100
      )
    }
    return temp
  }
  print() {
    console.log('=====================')
    console.log(`diskSize ${this.diskSize}`)
    console.log(`diskFree ${this.diskFree}`)
    console.log(`folderUsage ${this.folderUsage}`)
    console.log(`settingSize ${this.settingSize}`)
    console.log(`capacity ${this.capacity}`)
    console.log(`bandwidth ${this.bandwidth}`)
  }
}

module.exports = { SystemVariable }
