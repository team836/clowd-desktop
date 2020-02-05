class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.bandwidth = 0 //fetch from server
    this.capacity = 0 // get-folder-size
    this.usage = 0
    this.size = 0
    this.free = 0
    return this
  }
}

module.exports = { SystemVariable }
