import { machineIdSync } from 'node-machine-id';

class SystemVariable {
  constructor() {
    if (SystemVariable.instance) {
      return SystemVariable.instance;
    }
    SystemVariable.instance = this;
    this.accessToken = '';
    this.refreshToken = '';
    this.mid = '';
    return this;
  }

  setMachinId() {
    const id = machineIdSync();
    this.mid = id;
  }
}

export default SystemVariable;
