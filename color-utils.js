function rgbToHex(r, g, b) {
  let toHex = (c) => {
    let hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + (toHex(r) + toHex(g) + toHex(b)).toUpperCase();
}

function hexToRgb(hex) {
  let c = hex.replace('#', '');
  let r = parseInt(c.substring(0, 2), 16);
  let g = parseInt(c.substring(2, 4), 16);
  let b = parseInt(c.substring(4, 6), 16);
  return [r, g, b];
}

function rgbToLab(r, g, b) {
  let rNormal = r / 255;
  let gNormal = g / 255;
  let bNormal = b / 255;

  rNormal = rNormal > 0.04045 ? Math.pow((rNormal + 0.055) / 1.055, 2.4) : rNormal / 12.92;
  gNormal = gNormal > 0.04045 ? Math.pow((gNormal + 0.055) / 1.055, 2.4) : gNormal / 12.92;
  bNormal = bNormal > 0.04045 ? Math.pow((bNormal + 0.055) / 1.055, 2.4) : bNormal / 12.92;

  rNormal *= 100;
  gNormal *= 100;
  bNormal *= 100;

  let x = rNormal * 0.4124 + gNormal * 0.3576 + bNormal * 0.1805;
  let y = rNormal * 0.2126 + gNormal * 0.7152 + bNormal * 0.0722;
  let z = rNormal * 0.0193 + gNormal * 0.1192 + bNormal * 0.9505;

  x /= 95.047;
  y /= 100.000;
  z /= 108.883;

  x = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + (16 / 116);
  y = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + (16 / 116);
  z = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + (16 / 116);

  let l = (116 * y) - 16;
  let a = 500 * (x - y);
  let dbVal = 200 * (y - z);

  return [l, a, dbVal];
}

function ciede2000(lab1, lab2) {
  let L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
  let L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];

  let kL = 1, kC = 1, kH = 1;

  let C1 = Math.sqrt(a1 * a1 + b1 * b1);
  let C2 = Math.sqrt(a2 * a2 + b2 * b2);

  let meanC = (C1 + C2) / 2;
  let G = 0.5 * (1 - Math.sqrt(Math.pow(meanC, 7) / (Math.pow(meanC, 7) + Math.pow(25, 7))));

  let a1Prime = a1 * (1 + G);
  let a2Prime = a2 * (1 + G);

  let C1Prime = Math.sqrt(a1Prime * a1Prime + b1 * b1);
  let C2Prime = Math.sqrt(a2Prime * a2Prime + b2 * b2);

  let h1Prime = C1Prime === 0 ? 0 : Math.atan2(b1, a1Prime);
  if (h1Prime < 0) h1Prime += 2 * Math.PI;

  let h2Prime = C2Prime === 0 ? 0 : Math.atan2(b2, a2Prime);
  if (h2Prime < 0) h2Prime += 2 * Math.PI;

  let deltaLPrime = L2 - L1;
  let deltaCPrime = C2Prime - C1Prime;

  let deltahPrime = 0;
  if (C1Prime * C2Prime !== 0) {
    deltahPrime = h2Prime - h1Prime;
    if (deltahPrime > Math.PI) deltahPrime -= 2 * Math.PI;
    else if (deltahPrime < -Math.PI) deltahPrime += 2 * Math.PI;
  }
  let deltaHPrime = 2 * Math.sqrt(C1Prime * C2Prime) * Math.sin(deltahPrime / 2);

  let meanLPrime = (L1 + L2) / 2;
  let meanCPrime = (C1Prime + C2Prime) / 2;

  let meanhPrime = 0;
  if (C1Prime * C2Prime !== 0) {
    let sumh = h1Prime + h2Prime;
    if (Math.abs(h1Prime - h2Prime) <= Math.PI) {
      meanhPrime = sumh / 2;
    } else {
      meanhPrime = sumh < 2 * Math.PI ? (sumh + 2 * Math.PI) / 2 : (sumh - 2 * Math.PI) / 2;
    }
  }

  let T = 1 - 0.17 * Math.cos(meanhPrime - Math.PI / 6) +
              0.24 * Math.cos(2 * meanhPrime) +
              0.32 * Math.cos(3 * meanhPrime + Math.PI / 30) -
              0.20 * Math.cos(4 * meanhPrime - 63 * Math.PI / 180);

  let deltaTheta = 30 * Math.PI / 180 * Math.exp(-Math.pow((meanhPrime * 180 / Math.PI - 275) / 25, 2));

  let RC = 2 * Math.sqrt(Math.pow(meanCPrime, 7) / (Math.pow(meanCPrime, 7) + Math.pow(25, 7)));
  let RT = -Math.sin(2 * deltaTheta) * RC;

  let SL = 1 + (0.015 * Math.pow(meanLPrime - 50, 2)) / Math.sqrt(20 + Math.pow(meanLPrime - 50, 2));
  let SC = 1 + 0.045 * meanCPrime;
  let SH = 1 + 0.015 * meanCPrime * T;

  let dE = Math.sqrt(
    Math.pow(deltaLPrime / (kL * SL), 2) +
    Math.pow(deltaCPrime / (kC * SC), 2) +
    Math.pow(deltaHPrime / (kH * SH), 2) +
    RT * (deltaCPrime / (kC * SC)) * (deltaHPrime / (kH * SH))
  );

  return dE;
}
