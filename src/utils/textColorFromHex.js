const textColorFromHex = hex => {
  if(!hex || typeof hex !== "string"){
    return {
      error: "Please enter a non-empty string.",
      textColor: "black"
    }
  }
  const isValidHex6 = hex => {
    if(hex.length !== 6) return false;
    if(hex.split("").some(c =>
      !("0123456789abcdef".includes(c)))
    ) return false;
    return true;
  };

  // Remove number sign
  if(hex[0] === "#"){
    hex = hex.substring(1);
  }

  // Remove opacity mark, if included
  if(hex.length % 4 === 0){
    hex = hex.substring(0, hex.length / 4 * 3);
  }
  // If 3-digit, convert to 6-digit
  if(hex.length === 3){
    hex = hex.split("").map(c => `${c}${c}`).join("");
  }
  hex = hex.toLowerCase();
  
  if(!isValidHex6(hex))
    return {
      error: "Please enter a valid hex value.",
      textColor: "white"
    };
  
  const rgb = [
    {hex: hex.substring(0, 2)},
    {hex: hex.substring(2, 4)},
    {hex: hex.substring(4, 6)}
  ];
  
  rgb.forEach(({hex}, idx) => {
    const key = "0123456789abcdef";
    let dec = 0;
    for(let i=0; i<hex.length; i++){
      const place = 16 ** i;
      const val = key.indexOf(hex[hex.length - i - 1]);
      dec += place * val;
    }
    rgb[idx].dec = dec;
  });
  
  const total = rgb.reduce((acc, color) => acc + color.dec, 0);
  const tippingPoint = 450;
  
  return {
    error: false,
    textColor: (total > tippingPoint ? "black" : "white")
  }
};

export default textColorFromHex;