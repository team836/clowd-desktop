class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.diskSize = 0 // disk total size GB
    this.diskFree = 0 // disk remain size GB
    this.folderUsage = 0 // folder using size GB
    this.settingSize = 50 // set user total GB
    this.minSettingSize = 0
    this.maxSettingSize = 100
    this.capacity = 0 // min(free ,total-usage) GB
    this.bandwidth = 0 //fetch from server Mbps
    return this
  }
  print() {
    console.log('=====================')
    console.log(`diskSize ${this.diskSize}`)
    console.log(`diskFree ${this.diskFree}`)
    console.log(`folderUsage ${this.folderUsage}`)
    console.log(`settingSize ${this.settingSize}`)
    console.log(`capacity ${this.capacity}`)
    console.log(`bandwidth ${this.bandwidth}`)
    console.log('=====================')
  }
}

module.exports = { SystemVariable }
