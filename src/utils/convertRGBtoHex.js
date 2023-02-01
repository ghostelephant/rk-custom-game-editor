const convertRGBtoHex = rgbArray => {
  const digitValues = "0123456789ABCDEF";
  const convertOne = dec =>
    `${digitValues[Math.floor(dec / 16)]}${digitValues[dec % 16]}`;
  return "#" + rgbArray.map(val => convertOne(val)).join("");
};

export default convertRGBtoHex;