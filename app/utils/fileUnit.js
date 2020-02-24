function changeUnitDown(arg, pow) {
  return parseInt(arg / 1024 ** pow, 10);
}

function changeUnitUpper(arg, pow) {
  return arg * 1024 ** pow;
}

export { changeUnitDown, changeUnitUpper };
