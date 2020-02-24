// import checkDiskSpace from './checkDiskSpace';
import checkDiskSpace from 'check-disk-space';
import checkFileCount from './checkFileCount';
import checkFolderUsage from './checkFolderUsage';
import countFileOS from '../utils/fileCount';
// import checkNetworkState from './checkNetworkState';

class LocalVariable {
  constructor() {
    if (LocalVariable.instance) {
      return LocalVariable.instance;
    }
    LocalVariable.instance = this;
    this.diskSize = 0; // disk total size (Byte)
    this.diskFree = 0; // disk remain size (Byte)
    this.fileCount = 0;
    this.folderUsage = 0; // folder using size (Byte)
    this.settingSize = 104857600; // default 100MB set user total (Byte)
    this.minSettingSize = 0;
    this.maxSettingSize = 1024 ** 3;
    this.capacity = 0; // min(free ,total-usage) (Byte)
    this.bandwidth = 0; // fetch from server Mbps
    return this;
  }

  async checkLocalVariable(FOLDERPATH) {
    // checkNetworkState()
    const [disk, folder, fileCount] = await Promise.all([
      checkDiskSpace(FOLDERPATH),
      checkFolderUsage(FOLDERPATH),
      checkFileCount(FOLDERPATH)
    ]);

    this.diskFree = disk.free;
    this.diskSize = disk.size;
    this.folderUsage = folder;
    this.fileCount = countFileOS(fileCount);
    this.capacity = Math.min(
      this.diskFree,
      this.settingSize - this.folderUsage
    );
    this.bandwidth = 50;
    this.print();
    const temp = {
      folder: {
        usage: this.folderUsage,
        setting: this.settingSize,
        percent: Math.round((this.folderUsage / this.settingSize) * 100)
      },
      file: { count: this.fileCount },
      limit: {
        current: this.settingSize,
        min: this.minSettingSize,
        max: this.maxSettingSize,
        percent: Math.round(
          (this.settingSize / (this.maxSettingSize - this.minSettingSize)) * 100
        )
      }
      // folderUsage: this.folderUsage,
      // settingSize: this.settingSize,
      // fileCount: this.fileCount,
      // folderPercent: Math.round(
      //   ((this.folderUsage * 1024) / this.settingSize) * 100
      // ),
      // settingPercent: Math.round(
      //   (this.settingSize / (this.maxSettingSize - this.minSettingSize)) * 100
      // )
    };
    console.log(temp);

    return temp;
  }

  print() {
    console.log('=====================');
    console.log(`diskSize ${this.diskSize}`);
    console.log(`diskFree ${this.diskFree}`);
    console.log(`fileCount ${this.fileCount}`);
    console.log(`folderUsage ${this.folderUsage}`);
    console.log(`settingSize ${this.settingSize}`);
    console.log(`capacity ${this.capacity}`);
    console.log(`bandwidth ${this.bandwidth}`);
  }
}

export default LocalVariable;
