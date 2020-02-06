class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.diskSize = 0 // disk total size KB
    this.diskFree = 0 // disk remain size KB
    this.folderUsage = 0 // folder using size KB
    this.settingSize = 1000000 // set user total KB
    this.capacity = 0 // min(free ,total-usage) KB
    this.bandwidth = 0 //fetch from server Mbps

    return this
  }
  print() {
    console.log(`diskSize ${this.diskSize}`)
    console.log(`diskFree ${this.diskFree}`)
    console.log(`folderUsage ${this.folderUsage}`)
    console.log(`settingSize ${this.settingSize}`)
    console.log(`capacity ${this.capacity}`)
    console.log(`bandwidth ${this.bandwidth}`)
  }
}

module.exports = { SystemVariable }
