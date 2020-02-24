function countFileOS(arg) {
  let count = arg;

  // for mac
  if (process.platform === 'darwin') {
    count -= 1;
    if (arg.fileCount < 0) {
      count = 0;
    }
  }
  return count;
}

export default countFileOS;
