class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.bandwidth = 0 //fetch from server Mbps
    this.capacity = 0 // min(free ,total-usage) KB
    this.folderUsage = 0 // folder using size KB
    this.settingSize = 0 // set user total GB-> KB
    this.diskSize = 0 // disk total size KB
    this.diskFree = 0 // disk remain size KB
    return this
  }
}

module.exports = { SystemVariable }
