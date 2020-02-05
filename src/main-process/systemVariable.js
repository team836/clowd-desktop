class SystemVariable {
  constructor() {
    if (!!SystemVariable.instance) {
      return SystemVariable.instance
    }
    SystemVariable.instance = this
    this.total = 5 //fetch from server
    this.usage = 0 // get-folder-size
    this.server = 'wss://dev.clowd.xyz/v1/test'
    this.local = 'http://localhost:8081'
    this.dir = 'C:\\Users\\chea1\\AppData\\Local\\atom'

    return this
  }
  getTotal() {
    return this.total
  }
  getUsage() {
    return this.usage
  }
  setTotal(_total) {
    this.total = _total
  }
  setUsage(_usage) {
    this.usage = _usage
  }
}

module.exports = { SystemVariable }
