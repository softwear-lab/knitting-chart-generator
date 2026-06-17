// ==========================================================================
// PREPROCESSING & COLOR REDUCTION FILTERS
// ==========================================================================
function applyThreshold(imageObj) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let c1 = hexToRgb(yarnColor1.value);
  let c2 = hexToRgb(yarnColor2.value);
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    
    let gray = 0.299 * r + 0.587 * g + 0.114 * b;
    let finalColor = (gray > 127) ? c1 : c2;
    
    imageObj.pixels[idx] = finalColor[0];
    imageObj.pixels[idx + 1] = finalColor[1];
    imageObj.pixels[idx + 2] = finalColor[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyPosterize(imageObj, levels) {
  imageObj.loadPixels();
  let total = imageObj.width * imageObj.height;
  
  let div = levels - 1;
  if (div <= 0) div = 1;
  
  for (let i = 0; i < total; i++) {
    let idx = i * 4;
    for (let ch = 0; ch < 3; ch++) {
      let val = imageObj.pixels[idx + ch];
      let quantized = Math.round(val / 255 * div) / div * 255;
      imageObj.pixels[idx + ch] = Math.round(quantized);
    }
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyBayerDithering(imageObj, useTexture) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;

  let c1 = hexToRgb(yarnColor1.value);
  let c2 = hexToRgb(yarnColor2.value);

  const bayer2x2 = [
    [0, 2],
    [3, 1]
  ];
  const bayer4x4 = [
    [0,  8,  2,  10],
    [12, 4,  14, 6],
    [3,  11, 1,  9],
    [15, 7,  13, 5]
  ];
  const bayer8x8 = [
    [0,  48, 12, 60, 3,  51, 15, 63],
    [32, 16, 44, 28, 35, 19, 47, 31],
    [8,  56, 4,  52, 11, 59, 7,  55],
    [40, 24, 36, 20, 43, 27, 39, 23],
    [2,  50, 14, 62, 1,  49, 13, 61],
    [34, 18, 46, 30, 33, 17, 45, 29],
    [10, 58, 6,  54, 9,  57, 5,  53],
    [42, 26, 38, 22, 41, 25, 37, 21]
  ];
  const bayer12x12 = [
    [0, 8, 2, 10, 112, 120, 114, 122, 48, 56, 50, 58],
    [12, 4, 14, 6, 124, 116, 126, 118, 60, 52, 62, 54],
    [3, 11, 1, 9, 115, 123, 113, 121, 51, 59, 49, 57],
    [15, 7, 13, 5, 127, 119, 125, 117, 63, 55, 61, 53],
    [96, 104, 98, 106, 80, 88, 82, 90, 32, 40, 34, 42],
    [108, 100, 110, 102, 92, 84, 94, 86, 44, 36, 46, 38],
    [99, 107, 97, 105, 83, 91, 81, 89, 35, 43, 33, 41],
    [111, 103, 109, 101, 95, 87, 93, 85, 47, 39, 45, 37],
    [16, 24, 18, 26, 64, 72, 66, 74, 128, 136, 130, 138],
    [28, 20, 30, 22, 76, 68, 78, 70, 140, 132, 142, 134],
    [19, 27, 17, 25, 67, 75, 65, 73, 131, 139, 129, 137],
    [31, 23, 29, 21, 79, 71, 77, 69, 143, 135, 141, 133]
  ];

  let matrixSize = bayerMatrixSelect ? parseInt(bayerMatrixSelect.value) : 4;
  let matrix = bayer4x4;
  let maxDiv = 16.0;
  if (matrixSize === 2) {
    matrix = bayer2x2;
    maxDiv = 4.0;
  } else if (matrixSize === 8) {
    matrix = bayer8x8;
    maxDiv = 64.0;
  } else if (matrixSize === 12) {
    matrix = bayer12x12;
    maxDiv = 144.0;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let gray = 0.299 * r + 0.587 * g + 0.114 * b;
      let scaled = (gray / 255.0) * maxDiv;
      
      let mx = x % matrixSize;
      let my = y % matrixSize;
      let threshold = matrix[my][mx];
      
      let finalColor = (scaled > threshold) ? c1 : c2;
      
      imageObj.pixels[idx] = finalColor[0];
      imageObj.pixels[idx + 1] = finalColor[1];
      imageObj.pixels[idx + 2] = finalColor[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  
  imageObj.updatePixels();

  if (useTexture) {
    let hex1 = yarnColor1.value.toUpperCase();
    let hex2 = yarnColor2.value.toUpperCase();
    
    // Only initialize default symbols if they are not already set in symbolMap
    if (!symbolMap[hex1] && !symbolMap[hex2]) {
      symbolMap = {};
      symbolMap[hex2] = 'purl';
      symbolMap[hex1] = 'none';
    }
    symbolsCheckbox.checked = true;
  }
}

function applyStrayStitchCleaner(imageObj) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  // Create a copy of the pixel array to read from
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  // Helper to get pixel color from srcPixels
  let getPixelColor = (x, y) => {
    let idx = (x + y * w) * 4;
    return [srcPixels[idx], srcPixels[idx + 1], srcPixels[idx + 2]];
  };
  
  // Helper to compare two RGB colors
  let colorsMatch = (c1, c2) => {
    return c1[0] === c2[0] && c1[1] === c2[1] && c1[2] === c2[2];
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let targetColor = [srcPixels[idx], srcPixels[idx + 1], srcPixels[idx + 2]];
      
      // Get cardinal neighbors
      let isIsolated = true;
      const dirs = [
        {dx: 0, dy: -1}, // Up
        {dx: 0, dy: 1},  // Down
        {dx: -1, dy: 0}, // Left
        {dx: 1, dy: 0}   // Right
      ];
      
      for (let d = 0; d < dirs.length; d++) {
        let nx = x + dirs[d].dx;
        let ny = y + dirs[d].dy;
        
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          let nColor = getPixelColor(nx, ny);
          if (colorsMatch(nColor, targetColor)) {
            isIsolated = false;
            break;
          }
        }
      }
      
      // If it has no cardinal neighbor of the same color, it is isolated!
      if (isIsolated) {
        // Collect all 8 neighbors to find the most common color to merge into
        let counts = {};
        for (let ny = -1; ny <= 1; ny++) {
          for (let nx = -1; nx <= 1; nx++) {
            if (nx === 0 && ny === 0) continue;
            let px = x + nx;
            let py = y + ny;
            
            if (px >= 0 && px < w && py >= 0 && py < h) {
              let nColor = getPixelColor(px, py);
              let key = `${nColor[0]},${nColor[1]},${nColor[2]}`;
              counts[key] = (counts[key] || 0) + 1;
            }
          }
        }
        
        // Find most frequent neighbor color
        let bestKey = null;
        let maxCount = -1;
        for (let key in counts) {
          if (counts[key] > maxCount) {
            maxCount = counts[key];
            bestKey = key;
          }
        }
        
        if (bestKey) {
          let bestColor = bestKey.split(',').map(Number);
          imageObj.pixels[idx] = bestColor[0];
          imageObj.pixels[idx + 1] = bestColor[1];
          imageObj.pixels[idx + 2] = bestColor[2];
        }
      }
    }
  }
  
  imageObj.updatePixels();
}

function applySmoothingFilter(imageObj, radius) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  let getPixelKey = (x, y) => {
    let idx = (x + y * w) * 4;
    return `${srcPixels[idx]},${srcPixels[idx + 1]},${srcPixels[idx + 2]}`;
  };

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let counts = {};
      
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          let px = x + dx;
          let py = y + dy;
          if (px >= 0 && px < w && py >= 0 && py < h) {
            let key = getPixelKey(px, py);
            counts[key] = (counts[key] || 0) + 1;
          }
        }
      }
      
      let bestKey = null;
      let maxCount = -1;
      for (let key in counts) {
        if (counts[key] > maxCount) {
          maxCount = counts[key];
          bestKey = key;
        }
      }
      
      if (bestKey) {
        let bestColor = bestKey.split(',').map(Number);
        imageObj.pixels[idx] = bestColor[0];
        imageObj.pixels[idx + 1] = bestColor[1];
        imageObj.pixels[idx + 2] = bestColor[2];
      }
    }
  }
  
  imageObj.updatePixels();
}

function applyHistogramEqualization(imageObj) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let total = w * h;
  
  // Process each channel independently
  for (let ch = 0; ch < 3; ch++) {
    // Build histogram
    let hist = new Int32Array(256);
    for (let i = 0; i < total; i++) {
      hist[imageObj.pixels[i * 4 + ch]]++;
    }
    
    // Build cumulative distribution
    let cdf = new Int32Array(256);
    cdf[0] = hist[0];
    for (let i = 1; i < 256; i++) {
      cdf[i] = cdf[i - 1] + hist[i];
    }
    
    // Find minimum non-zero CDF value
    let cdfMin = 0;
    for (let i = 0; i < 256; i++) {
      if (cdf[i] > 0) { cdfMin = cdf[i]; break; }
    }
    
    // Build lookup table
    let lut = new Uint8ClampedArray(256);
    let denom = total - cdfMin;
    if (denom <= 0) denom = 1;
    for (let i = 0; i < 256; i++) {
      lut[i] = Math.round(((cdf[i] - cdfMin) / denom) * 255);
    }
    
    // Apply LUT
    for (let i = 0; i < total; i++) {
      imageObj.pixels[i * 4 + ch] = lut[imageObj.pixels[i * 4 + ch]];
    }
  }
  
  imageObj.updatePixels();
}

function applyBilateralFilter(imageObj, radius) {
  if (radius <= 0) return;
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let spatialSigma = radius;
  let intensitySigma = 30 + radius * 10;
  let spatialCoeff = -0.5 / (spatialSigma * spatialSigma);
  let intensityCoeff = -0.5 / (intensitySigma * intensitySigma);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let cr = srcPixels[idx], cg = srcPixels[idx + 1], cb = srcPixels[idx + 2];
      
      let sumR = 0, sumG = 0, sumB = 0, sumW = 0;
      
      for (let ny = -radius; ny <= radius; ny++) {
        let py = y + ny;
        if (py < 0 || py >= h) continue;
        for (let nx = -radius; nx <= radius; nx++) {
          let px = x + nx;
          if (px < 0 || px >= w) continue;
          
          let nIdx = (px + py * w) * 4;
          let nr = srcPixels[nIdx], ng = srcPixels[nIdx + 1], nb = srcPixels[nIdx + 2];
          
          let spatialDist = nx * nx + ny * ny;
          let intensityDist = (cr - nr) * (cr - nr) + (cg - ng) * (cg - ng) + (cb - nb) * (cb - nb);
          
          let weight = Math.exp(spatialCoeff * spatialDist + intensityCoeff * intensityDist);
          
          sumR += nr * weight;
          sumG += ng * weight;
          sumB += nb * weight;
          sumW += weight;
        }
      }
      
      if (sumW > 0) {
        imageObj.pixels[idx] = Math.round(sumR / sumW);
        imageObj.pixels[idx + 1] = Math.round(sumG / sumW);
        imageObj.pixels[idx + 2] = Math.round(sumB / sumW);
      }
    }
  }
  
  imageObj.updatePixels();
}

function applyOctreeQuantization(imageObj, targetColors) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let total = w * h;
  
  // Build color frequency map
  let colorMap = {};
  for (let i = 0; i < total; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    let key = (r << 16) | (g << 8) | b;
    colorMap[key] = (colorMap[key] || 0) + 1;
  }
  
  // Sort colors by frequency
  let colors = Object.keys(colorMap).map(k => {
    let key = parseInt(k);
    return {
      r: (key >> 16) & 0xFF,
      g: (key >> 8) & 0xFF,
      b: key & 0xFF,
      count: colorMap[k]
    };
  });
  
  // Use median-cut quantization (practical octree alternative)
  let buckets = [colors];
  
  while (buckets.length < targetColors) {
    // Find the bucket with the largest color range
    let bestIdx = 0;
    let bestRange = -1;
    
    for (let i = 0; i < buckets.length; i++) {
      if (buckets[i].length <= 1) continue;
      let bucket = buckets[i];
      
      let rRange = Math.max(...bucket.map(c => c.r)) - Math.min(...bucket.map(c => c.r));
      let gRange = Math.max(...bucket.map(c => c.g)) - Math.min(...bucket.map(c => c.g));
      let bRange = Math.max(...bucket.map(c => c.b)) - Math.min(...bucket.map(c => c.b));
      let range = Math.max(rRange, gRange, bRange);
      
      if (range > bestRange) {
        bestRange = range;
        bestIdx = i;
      }
    }
    
    if (bestRange <= 0) break;
    
    let bucket = buckets[bestIdx];
    let rRange = Math.max(...bucket.map(c => c.r)) - Math.min(...bucket.map(c => c.r));
    let gRange = Math.max(...bucket.map(c => c.g)) - Math.min(...bucket.map(c => c.g));
    let bRange = Math.max(...bucket.map(c => c.b)) - Math.min(...bucket.map(c => c.b));
    
    let sortChannel = rRange >= gRange && rRange >= bRange ? 'r' : (gRange >= bRange ? 'g' : 'b');
    bucket.sort((a, b) => a[sortChannel] - b[sortChannel]);
    
    let mid = Math.floor(bucket.length / 2);
    buckets.splice(bestIdx, 1, bucket.slice(0, mid), bucket.slice(mid));
  }
  
  // Compute representative color for each bucket (weighted average)
  let palette = buckets.map(bucket => {
    let totalCount = bucket.reduce((s, c) => s + c.count, 0);
    let r = Math.round(bucket.reduce((s, c) => s + c.r * c.count, 0) / totalCount);
    let g = Math.round(bucket.reduce((s, c) => s + c.g * c.count, 0) / totalCount);
    let b = Math.round(bucket.reduce((s, c) => s + c.b * c.count, 0) / totalCount);
    return [r, g, b];
  });
  
  // Map each pixel to nearest palette color
  for (let i = 0; i < total; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    
    let minDist = Infinity;
    let bestColor = palette[0];
    
    for (let c = 0; c < palette.length; c++) {
      let dr = r - palette[c][0];
      let dg = g - palette[c][1];
      let db = b - palette[c][2];
      let dist = dr * dr + dg * dg + db * db;
      if (dist < minDist) {
        minDist = dist;
        bestColor = palette[c];
      }
    }
    
    imageObj.pixels[idx] = bestColor[0];
    imageObj.pixels[idx + 1] = bestColor[1];
    imageObj.pixels[idx + 2] = bestColor[2];
  }
  
  imageObj.updatePixels();
}

function applyMorphologicalCleanup(imageObj, operation) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let runOp = (src, op) => {
    let out = new Uint8ClampedArray(src.length);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let idx = (x + y * w) * 4;
        let bestR = src[idx], bestG = src[idx + 1], bestB = src[idx + 2];
        
        // Collect 3x3 neighborhood colors
        let neighbors = [];
        for (let ny = -1; ny <= 1; ny++) {
          for (let nx = -1; nx <= 1; nx++) {
            let px = Math.max(0, Math.min(w - 1, x + nx));
            let py = Math.max(0, Math.min(h - 1, y + ny));
            let nIdx = (px + py * w) * 4;
            neighbors.push({
              r: src[nIdx], g: src[nIdx + 1], b: src[nIdx + 2],
              lum: 0.299 * src[nIdx] + 0.587 * src[nIdx + 1] + 0.114 * src[nIdx + 2]
            });
          }
        }
        
        if (op === 'erode') {
          // Pick darkest neighbor (minimum luminance)
          let darkest = neighbors.reduce((a, b) => a.lum < b.lum ? a : b);
          bestR = darkest.r; bestG = darkest.g; bestB = darkest.b;
        } else if (op === 'dilate') {
          // Pick brightest neighbor (maximum luminance)
          let brightest = neighbors.reduce((a, b) => a.lum > b.lum ? a : b);
          bestR = brightest.r; bestG = brightest.g; bestB = brightest.b;
        }
        
        out[idx] = bestR;
        out[idx + 1] = bestG;
        out[idx + 2] = bestB;
        out[idx + 3] = 255;
      }
    }
    return out;
  };
  
  let pixels = new Uint8ClampedArray(imageObj.pixels);
  
  if (operation === 'erode') {
    pixels = runOp(pixels, 'erode');
  } else if (operation === 'dilate') {
    pixels = runOp(pixels, 'dilate');
  } else if (operation === 'open') {
    pixels = runOp(pixels, 'erode');
    pixels = runOp(pixels, 'dilate');
  } else if (operation === 'close') {
    pixels = runOp(pixels, 'dilate');
    pixels = runOp(pixels, 'erode');
  }
  
  for (let i = 0; i < imageObj.pixels.length; i++) {
    imageObj.pixels[i] = pixels[i];
  }
  imageObj.updatePixels();
}

function applyRowColorLimit(imageObj, maxColors) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  for (let y = 0; y < h; y++) {
    // Count colors in this row
    let colorCounts = {};
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let key = `${imageObj.pixels[idx]},${imageObj.pixels[idx + 1]},${imageObj.pixels[idx + 2]}`;
      colorCounts[key] = (colorCounts[key] || 0) + 1;
    }
    
    let uniqueColors = Object.keys(colorCounts);
    if (uniqueColors.length <= maxColors) continue;
    
    // Sort colors by frequency (descending) and keep top N
    uniqueColors.sort((a, b) => colorCounts[b] - colorCounts[a]);
    let allowedColors = uniqueColors.slice(0, maxColors);
    let allowedRGB = allowedColors.map(c => c.split(',').map(Number));
    
    // Remap minority pixels to nearest allowed color
    let allowedSet = new Set(allowedColors);
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let key = `${imageObj.pixels[idx]},${imageObj.pixels[idx + 1]},${imageObj.pixels[idx + 2]}`;
      
      if (!allowedSet.has(key)) {
        let r = imageObj.pixels[idx], g = imageObj.pixels[idx + 1], b = imageObj.pixels[idx + 2];
        let minDist = Infinity;
        let bestColor = allowedRGB[0];
        
        for (let c = 0; c < allowedRGB.length; c++) {
          let dr = r - allowedRGB[c][0];
          let dg = g - allowedRGB[c][1];
          let db = b - allowedRGB[c][2];
          let dist = dr * dr + dg * dg + db * db;
          if (dist < minDist) {
            minDist = dist;
            bestColor = allowedRGB[c];
          }
        }
        
        imageObj.pixels[idx] = bestColor[0];
        imageObj.pixels[idx + 1] = bestColor[1];
        imageObj.pixels[idx + 2] = bestColor[2];
      }
    }
  }
  
  imageObj.updatePixels();
}





function applyHalftone(imageObj, hexColorBg, hexColorDot, spacing) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let bgRGB = hexToRgb(hexColorBg || '#FFFFFF');
  let dotRGB = hexToRgb(hexColorDot || '#000000');
  
  // Frequency multiplier to control dot size (repeat every 'spacing' pixels)
  spacing = spacing || 4;
  let freq = (2 * Math.PI) / spacing;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      // Calculate luminance (0.0 to 1.0)
      let brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
      
      // Dot screen function: cosine wave overlay
      let screenVal = (Math.cos(x * freq) * Math.cos(y * freq) + 1) / 2;
      
      // Compare: if pixel is lighter than screen value, map to bgRGB, else dotRGB
      let isBg = brightness > screenVal;
      let finalColor = isBg ? bgRGB : dotRGB;
      
      imageObj.pixels[idx] = finalColor[0];
      imageObj.pixels[idx + 1] = finalColor[1];
      imageObj.pixels[idx + 2] = finalColor[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyGlitch(imageObj, intensity, aberration) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  intensity = intensity !== undefined ? intensity : 5;
  aberration = aberration !== undefined ? aberration : 2;
  
  // 1. Horizontal Displacement Slices
  let numSlices = Math.floor(random(intensity / 2 + 1, intensity + 4));
  for (let i = 0; i < numSlices; i++) {
    let sliceY = Math.floor(random(0, h));
    let sliceH = Math.floor(random(2, Math.max(5, h / 8)));
    let shiftX = Math.floor(random(-Math.max(2, w / 15), Math.max(2, w / 15)) * (intensity / 5.0));
    
    for (let y = sliceY; y < Math.min(h, sliceY + sliceH); y++) {
      for (let x = 0; x < w; x++) {
        let targetX = (x + shiftX + w) % w;
        let srcIdx = (x + y * w) * 4;
        let destIdx = (targetX + y * w) * 4;
        
        imageObj.pixels[destIdx] = srcPixels[srcIdx];
        imageObj.pixels[destIdx + 1] = srcPixels[srcIdx + 1];
        imageObj.pixels[destIdx + 2] = srcPixels[srcIdx + 2];
        imageObj.pixels[destIdx + 3] = srcPixels[srcIdx + 3];
      }
    }
  }
  
  // Reload displaced pixels
  let displacedPixels = new Uint8ClampedArray(imageObj.pixels);
  
  // 2. Chromatic Aberration (Red and Blue channel offset splits)
  let rShift = aberration;
  let bShift = aberration;
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let rx = (x - rShift + w) % w;
      let bx = (x + bShift) % w;
      
      let rIdx = (rx + y * w) * 4;
      let bIdx = (bx + y * w) * 4;
      
      imageObj.pixels[idx] = displacedPixels[rIdx]; // Red channel shift
      imageObj.pixels[idx + 1] = displacedPixels[idx + 1]; // Green channel same
      imageObj.pixels[idx + 2] = displacedPixels[bIdx + 2]; // Blue channel shift
    }
  }
  
  // Reload for Scanline Overlay
  let currentPixels = new Uint8ClampedArray(imageObj.pixels);
  
  // 3. Horizontal Scanlines
  for (let y = 0; y < h; y++) {
    if (y % 3 === 0) {
      for (let x = 0; x < w; x++) {
        let idx = (x + y * w) * 4;
        imageObj.pixels[idx] = Math.max(0, currentPixels[idx] - 35);
        imageObj.pixels[idx + 1] = Math.max(0, currentPixels[idx + 1] - 35);
        imageObj.pixels[idx + 2] = Math.max(0, currentPixels[idx + 2] - 35);
      }
    }
  }
  
  // 4. Digital Noise Glitch Color Blocks
  let numBlocks = Math.floor(random(1, 4));
  for (let i = 0; i < numBlocks; i++) {
    let bx = Math.floor(random(0, w - 8));
    let by = Math.floor(random(0, h - 4));
    let bw = Math.floor(random(4, 12));
    let bh = Math.floor(random(2, 5));
    
    // Pick bright saturated colors
    let rCol = random() > 0.5 ? 255 : 0;
    let gCol = random() > 0.5 ? 255 : 0;
    let bCol = random() > 0.5 ? 255 : 0;
    if (rCol === 0 && gCol === 0 && bCol === 0) rCol = 255;
    
    for (let y = by; y < Math.min(h, by + bh); y++) {
      for (let x = bx; x < Math.min(w, bx + bw); x++) {
        let idx = (x + y * w) * 4;
        imageObj.pixels[idx] = rCol;
        imageObj.pixels[idx + 1] = gCol;
        imageObj.pixels[idx + 2] = bCol;
      }
    }
  }
  
  imageObj.updatePixels();
}

function applyRippleHalftone(imageObj, bgHex, rippleHex, period) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let cx = w / 2;
  let cy = h / 2;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let rip = hexToRgb(rippleHex || '#000000');
  
  period = period || 6;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 (dark) to 1 (bright)
      
      let dx = x - cx;
      let dy = y - cy;
      let d = Math.sqrt(dx * dx + dy * dy);
      
      let fraction = (d / period) % 1.0;
      // We want darker areas to have thicker ripple lines.
      // So if fraction < (1 - val), use ripple color, otherwise background color.
      let useRipple = fraction < (1.0 - val);
      let target = useRipple ? rip : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyCrossHatch(imageObj, bgHex, hatchHex, period) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let hatch = hexToRgb(hatchHex || '#000000');
  
  period = period || 5;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      let d1 = (x + y) % period;
      let d2 = (x - y + h * period) % period; // add offset to prevent negative values
      
      let drawHatch = false;
      
      if (val < 0.15) {
        // Deep shadow: thick cross-hatch
        drawHatch = (d1 <= 1 || d2 <= 1);
      } else if (val < 0.40) {
        // Shadow: standard cross-hatch
        drawHatch = (d1 === 0 || d2 === 0);
      } else if (val < 0.65) {
        // Mid-tone: single diagonal hatch
        drawHatch = (d1 === 0);
      } else if (val < 0.85) {
        // Highlights mid-tone: sparse single diagonal hatch
        drawHatch = ((x + y) % (period * 2) === 0);
      } else {
        // Pure highlights: background
        drawHatch = false;
      }
      
      let target = drawHatch ? hatch : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyOffsetStencil(imageObj, bgHex, stencilHex, offsetHex, offsetDistance) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let stencil = hexToRgb(stencilHex || '#000000');
  let offset = hexToRgb(offsetHex || '#FF0000');
  
  // Calculate adaptive threshold (average luminance)
  let totalL = 0;
  let lums = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      lums[x + y * w] = L;
      totalL += L;
    }
  }
  let threshold = totalL / (w * h);
  
  // Create a helper to check if a pixel is foreground (darker than threshold)
  let isForeground = (px, py) => {
    if (px < 0 || px >= w || py < 0 || py >= h) return false;
    return lums[px + py * w] < threshold;
  };
  
  // Offset based on user parameter
  offsetDistance = offsetDistance !== undefined ? offsetDistance : 3;
  let dx = offsetDistance;
  let dy = offsetDistance;
  
  // Apply the stencil mapping
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let target;
      if (isForeground(x, y)) {
        // Main stencil
        target = stencil;
      } else if (isForeground(x - dx, y - dy)) {
        // Offset shadow stencil
        target = offset;
      } else {
        // Background
        target = bg;
      }
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}



function applyMosaicSlipStitch(imageObj, bgHex, patternHex) {
  // First map to custom 2-color palette
  applyCustomPaletteMapping(imageObj, [bgHex, patternHex]);
  
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let pat = hexToRgb(patternHex || '#000000');
  
  // We represent the pixels in a grid of 0 (bg) and 1 (pat)
  let grid = new Uint8Array(w * h);
  let distSq = (r1, g1, b1, r2, g2, b2) => {
    let dr = r1 - r2, dg = g1 - g2, db = b1 - b2;
    return dr * dr + dg * dg + db * db;
  };
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    
    let d1 = distSq(r, g, b, bg[0], bg[1], bg[2]);
    let d2 = distSq(r, g, b, pat[0], pat[1], pat[2]);
    grid[i] = d1 < d2 ? 0 : 1;
  }
  
  // Enforce mosaic rules column by column
  for (let x = 0; x < w; x++) {
    let consecutiveSlipped = 0;
    for (let y = 0; y < h; y++) {
      // Slipped color changes every 2 rows
      let activeColor = Math.floor(y / 2) % 2; 
      let pixelColor = grid[x + y * w];
      
      if (pixelColor !== activeColor) {
        consecutiveSlipped++;
        if (consecutiveSlipped > 2) {
          grid[x + y * w] = activeColor;
          consecutiveSlipped = 0;
        }
      } else {
        consecutiveSlipped = 0;
      }
    }
  }
  
  // Write back to image
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let target = grid[i] === 0 ? bg : pat;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyShadowIllusion(imageObj, colorAHex, colorBHex, thickness) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let cA = hexToRgb(colorAHex || '#FFFFFF');
  let cB = hexToRgb(colorBHex || '#000000');
  
  // Calculate average luminance threshold for motif detection
  let totalL = 0;
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let L = 0.299 * imageObj.pixels[idx] + 0.587 * imageObj.pixels[idx + 1] + 0.114 * imageObj.pixels[idx + 2];
    lums[i] = L;
    totalL += L;
  }
  let threshold = totalL / (w * h);
  
  thickness = thickness || 2;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let L = lums[x + y * w];
      let isMotif = L < threshold; // Motif is the darker region
      
      let stripe = Math.floor(y / thickness) % 2; // alternates based on thickness
      let useColorA;
      
      if (isMotif) {
        // Motif: phase shifted stripes
        useColorA = (stripe === 1);
      } else {
        // Background: standard stripes
        useColorA = (stripe === 0);
      }
      
      let target = useColorA ? cA : cB;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyBargelloWave(imageObj, c1Hex, c2Hex, c3Hex, c4Hex, amplitude, scale) {
  // First map to 4 colors
  let palette = [c1Hex, c2Hex, c3Hex, c4Hex];
  applyCustomPaletteMapping(imageObj, palette);
  
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  amplitude = amplitude !== undefined ? amplitude : 4;
  scale = scale !== undefined ? scale : 10;
  let freqScale = scale / 10.0;
  
  // We displace each column of pixels vertically to create the Bargello flame wave
  for (let x = 0; x < w; x++) {
    // Generate a stepped wave offset for column x
    let waveOffset = Math.round((Math.sin(x * 0.3 * freqScale) * 4 + Math.sin(x * 0.1 * freqScale) * 2) * (amplitude / 4.0));
    
    for (let y = 0; y < h; y++) {
      let destIdx = (x + y * w) * 4;
      
      // Calculate displaced Y, wrapping around the boundaries
      let srcY = (y + waveOffset + h) % h;
      let srcIdx = (x + srcY * w) * 4;
      
      imageObj.pixels[destIdx] = srcPixels[srcIdx];
      imageObj.pixels[destIdx + 1] = srcPixels[srcIdx + 1];
      imageObj.pixels[destIdx + 2] = srcPixels[srcIdx + 2];
      imageObj.pixels[destIdx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyStainedGlass(imageObj, c1, c2, c3, c4, outlineHex) {
  let palette = [c1, c2, c3, c4];
  applyCustomPaletteMapping(imageObj, palette);
  
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let outline = hexToRgb(outlineHex || '#000000');
  
  let isSameColor = (idx1, idx2) => {
    return srcPixels[idx1] === srcPixels[idx2] &&
           srcPixels[idx1 + 1] === srcPixels[idx2 + 1] &&
           srcPixels[idx1 + 2] === srcPixels[idx2 + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let onBoundary = false;
      
      // Check right neighbor
      if (x < w - 1) {
        let rightIdx = ((x + 1) + y * w) * 4;
        if (!isSameColor(idx, rightIdx)) {
          onBoundary = true;
        }
      }
      
      // Check bottom neighbor
      if (y < h - 1) {
        let bottomIdx = (x + (y + 1) * w) * 4;
        if (!isSameColor(idx, bottomIdx)) {
          onBoundary = true;
        }
      }
      
      if (onBoundary) {
        imageObj.pixels[idx] = outline[0];
        imageObj.pixels[idx + 1] = outline[1];
        imageObj.pixels[idx + 2] = outline[2];
        imageObj.pixels[idx + 3] = 255;
      }
    }
  }
  imageObj.updatePixels();
}

function applyComicHalftone(imageObj, bgHex, dotHex, period) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let dot = hexToRgb(dotHex || '#000000');
  
  // Store original pixels to read luminance
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, Math.round(px)));
    py = Math.max(0, Math.min(h - 1, Math.round(py)));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  period = period || 8;
  let hSpacing = period * Math.sqrt(3) / 2;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      // Find nearest hex center
      let row = Math.round(y / hSpacing);
      let cy = row * hSpacing;
      let cx = (row % 2 === 0) ? Math.round(x / period) * period : Math.round((x - period / 2) / period) * period + period / 2;
      
      let bestCx = cx, bestCy = cy;
      let minDistSq = (x - cx) * (x - cx) + (y - cy) * (y - cy);
      
      for (let offset = -1; offset <= 1; offset += 2) {
        let testRow = row + offset;
        let testCy = testRow * hSpacing;
        let testCx = (testRow % 2 === 0) ? Math.round(x / period) * period : Math.round((x - period / 2) / period) * period + period / 2;
        let distSq = (x - testCx) * (x - testCx) + (y - testCy) * (y - testCy);
        if (distSq < minDistSq) {
          minDistSq = distSq;
          bestCx = testCx;
          bestCy = testCy;
        }
      }
      
      let d = Math.sqrt(minDistSq);
      
      // Get luminance at nearest hex center
      let L = getLuminance(bestCx, bestCy);
      let val = L / 255.0; // 0 to 1
      
      // Maximum radius is period * 0.65 to allow dots to overlap in dark regions
      let maxRadius = period * 0.65;
      let targetRadius = maxRadius * (1.0 - val);
      
      let target = (d < targetRadius) ? dot : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyRibbedScanlines(imageObj, bgHex, stripeHex) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let str = hexToRgb(stripeHex || '#000000');
  
  // Calculate average luminance for each row
  let rowLums = new Float32Array(h);
  for (let y = 0; y < h; y++) {
    let sumL = 0;
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      sumL += 0.299 * imageObj.pixels[idx] + 0.587 * imageObj.pixels[idx + 1] + 0.114 * imageObj.pixels[idx + 2];
    }
    rowLums[y] = sumL / (w * 255.0); // 0 to 1
  }
  
  let period = 4; // block of 4 rows
  
  for (let y = 0; y < h; y++) {
    let val = rowLums[y]; // average luminance of the row
    let phase = y % period;
    
    // Determine number of dark lines (Color B) out of the period
    let darkLinesCount = Math.round((1.0 - val) * period);
    let useStripeColor = (phase < darkLinesCount);
    
    let target = useStripeColor ? str : bg;
    
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}function applyContourWaves(imageObj, bgHex, waveHex, period, amplitude) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let wave = hexToRgb(waveHex || '#000000');
  
  period = period || 4; // wave spacing
  amplitude = amplitude !== undefined ? amplitude : 3;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      // Meandering sine wave formula
      let wavePhase = y + Math.sin(x * 0.25) * amplitude;
      let frac = (wavePhase % period + period) % period; // handle negative modulo
      
      // If frac is less than thickness threshold (based on darkness), use wave color
      let useWave = frac < (1.0 - val) * period;
      let target = useWave ? wave : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyTruchetMaze(imageObj, bgHex, mazeHex, blockSize) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let maze = hexToRgb(mazeHex || '#000000');
  
  blockSize = blockSize || 4;
  
  // Store original pixels to read luminance
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let blockX = Math.floor(x / blockSize);
      let blockY = Math.floor(y / blockSize);
      
      let innerX = x % blockSize;
      let innerY = y % blockSize;
      
      // Get average luminance of the block (read center of block)
      let L = getLuminance(blockX * blockSize + Math.floor(blockSize / 2), blockY * blockSize + Math.floor(blockSize / 2));
      let val = L / 255.0; // 0 to 1
      
      // Pseudo-random tile orientation based on block coordinates
      let seed = Math.sin(blockX * 12.9898 + blockY * 78.233) * 43758.5453;
      let orientation = (seed - Math.floor(seed)) > 0.5;
      
      let drawLine = false;
      if (orientation) {
        // Left-to-right diagonal: x === y
        drawLine = (innerX === innerY || innerX === innerY - 1 || innerX === innerY + 1);
      } else {
        // Right-to-left diagonal: x === blockSize - 1 - y
        drawLine = (innerX === (blockSize - 1 - innerY) || 
                    innerX === (blockSize - 1 - innerY) - 1 || 
                    innerX === (blockSize - 1 - innerY) + 1);
      }
      
      // The maze lines fade out in highlights
      let isMazePixel = drawLine && (val < 0.65);
      let target = isMazePixel ? maze : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyInkStippling(imageObj, bgHex, stippleHex, noiseScale) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let stip = hexToRgb(stippleHex || '#000000');
  
  // Use a pseudo-random seed to make the stippling pattern deterministic
  let randomVal = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  noiseScale = noiseScale !== undefined ? noiseScale : 180;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      
      // Generate deterministic noise
      let seed = x * 12.9898 + y * 78.233;
      let noise = (randomVal(seed) - 0.5) * noiseScale;
      
      // Threshold the noisy luminance
      let isStipple = (L + noise) < 128;
      let target = isStipple ? stip : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyCableRibIllusion(imageObj, bgHex, ribHex, colWidth) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let rib = hexToRgb(ribHex || '#000000');
  
  colWidth = colWidth || 4; // width of vertical ribs
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      let col = Math.floor(x / colWidth) % 2;
      let useColorA = (col === 0);
      
      // Invert where it is dark (val < 0.5) to reveal the image shape
      if (val < 0.5) {
        useColorA = !useColorA;
      }
      
      let target = useColorA ? bg : rib;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyHerringboneHatch(imageObj, bgHex, hatchHex, period, colWidth) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let hatch = hexToRgb(hatchHex || '#000000');
  
  colWidth = colWidth || 6;
  period = period || 5;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      let col = Math.floor(x / colWidth) % 2;
      let d = (col === 0) ? (x + y) % period : (x - y + h * period) % period;
      
      let drawHatch = false;
      if (val < 0.2) {
        drawHatch = (d <= 1);
      } else if (val < 0.5) {
        drawHatch = (d === 0);
      } else if (val < 0.75) {
        drawHatch = (d === 0 && (x + y) % 2 === 0);
      } else {
        drawHatch = false;
      }
      
      let target = drawHatch ? hatch : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyVoronoiMosaic(imageObj, bgHex, lineHex, cellSize) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let line = hexToRgb(lineHex || '#000000');
  
  cellSize = cellSize || 8; // Size of each grid block
  let cols = Math.ceil(w / cellSize);
  let rows = Math.ceil(h / cellSize);
  
  // 1. Generate jittered Voronoi sites
  let sites = [];
  let randomVal = (seed) => {
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
  };
  
  for (let gy = 0; gy < rows; gy++) {
    for (let gx = 0; gx < cols; gx++) {
      let seedX = gx * 12.9898 + gy * 78.233;
      let seedY = gx * 43.1232 + gy * 91.567;
      let jX = (randomVal(seedX) - 0.5) * cellSize * 0.7;
      let jY = (randomVal(seedY) - 0.5) * cellSize * 0.7;
      sites.push({
        x: gx * cellSize + cellSize / 2 + jX,
        y: gy * cellSize + cellSize / 2 + jY,
        sumL: 0,
        count: 0
      });
    }
  }
  
  // 2. Map pixels to sites to calculate average cell luminance
  let pixelNearestSite = new Int32Array(w * h);
  let pixelDistSq = new Float32Array(w * h);
  let pixelSecondDistSq = new Float32Array(w * h);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let pIdx = x + y * w;
      let minDistSq = Infinity;
      let secondMinDistSq = Infinity;
      let nearestIdx = 0;
      
      // Look at neighboring cells (3x3 sites) to find the closest site quickly
      let bgx = Math.floor(x / cellSize);
      let bgy = Math.floor(y / cellSize);
      
      for (let dy = -1; dy <= 1; dy++) {
        let ty = bgy + dy;
        if (ty < 0 || ty >= rows) continue;
        for (let dx = -1; dx <= 1; dx++) {
          let tx = bgx + dx;
          if (tx < 0 || tx >= cols) continue;
          
          let sIdx = tx + ty * cols;
          let site = sites[sIdx];
          let dxS = x - site.x;
          let dyS = y - site.y;
          let d2 = dxS * dxS + dyS * dyS;
          
          if (d2 < minDistSq) {
            secondMinDistSq = minDistSq;
            minDistSq = d2;
            nearestIdx = sIdx;
          } else if (d2 < secondMinDistSq) {
            secondMinDistSq = d2;
          }
        }
      }
      
      pixelNearestSite[pIdx] = nearestIdx;
      pixelDistSq[pIdx] = minDistSq;
      pixelSecondDistSq[pIdx] = secondMinDistSq;
      
      let imgIdx = pIdx * 4;
      let L = 0.299 * imageObj.pixels[imgIdx] + 0.587 * imageObj.pixels[imgIdx + 1] + 0.114 * imageObj.pixels[imgIdx + 2];
      sites[nearestIdx].sumL += L;
      sites[nearestIdx].count += 1;
    }
  }
  
  // 3. Compute active state for each cell
  let cellActive = new Uint8Array(sites.length);
  for (let i = 0; i < sites.length; i++) {
    let avg = sites[i].count > 0 ? sites[i].sumL / sites[i].count : 255;
    cellActive[i] = avg < 128 ? 1 : 0; // Dark cells are active (Color B)
  }
  
  // 4. Render Voronoi cells and boundaries
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let pIdx = x + y * w;
      let nearestIdx = pixelNearestSite[pIdx];
      let d1 = Math.sqrt(pixelDistSq[pIdx]);
      let d2 = Math.sqrt(pixelSecondDistSq[pIdx]);
      
      let target;
      // If close to a cell boundary (distance to 1st vs 2nd site is small), draw boundary line
      if ((d2 - d1) < 1.0) {
        target = line;
      } else {
        // Otherwise, fill with cell color
        target = cellActive[nearestIdx] === 1 ? line : bg;
      }
      
      let imgIdx = pIdx * 4;
      imageObj.pixels[imgIdx] = target[0];
      imageObj.pixels[imgIdx + 1] = target[1];
      imageObj.pixels[imgIdx + 2] = target[2];
      imageObj.pixels[imgIdx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyTypographyArt(imageObj, bgHex, textHex) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let txt = hexToRgb(textHex || '#000000');
  
  let font = {
    'K': [
      [1, 0, 1],
      [1, 1, 0],
      [1, 0, 1]
    ],
    'P': [
      [1, 1, 0],
      [1, 1, 0],
      [1, 0, 0]
    ],
    'O': [
      [0, 1, 0],
      [1, 0, 1],
      [0, 1, 0]
    ],
    '.': [
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0]
    ],
    ' ': [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  };
  
  let blockSize = 3;
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, px));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let blockX = Math.floor(x / blockSize);
      let blockY = Math.floor(y / blockSize);
      
      let innerX = x % blockSize;
      let innerY = y % blockSize;
      
      // Get average luminance at block center
      let L = getLuminance(blockX * blockSize + 1, blockY * blockSize + 1);
      
      let charSelected;
      if (L < 55) {
        charSelected = 'K';
      } else if (L < 110) {
        charSelected = 'P';
      } else if (L < 165) {
        charSelected = 'O';
      } else if (L < 220) {
        charSelected = '.';
      } else {
        charSelected = ' ';
      }
      
      let pixelActive = font[charSelected][innerY][innerX] === 1;
      let target = pixelActive ? txt : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyMoireOpArt(imageObj, bgHex, lineHex, density) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let line = hexToRgb(lineHex || '#000000');
  
  density = density || 60;
  let freq = density / 100.0;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      // Line grid 1: straight vertical columns
      let grid1 = Math.sin(x * freq) > 0;
      
      // Line grid 2: wavy lines deformed by image darkness
      let deformation = (1.0 - val) * 6.0;
      let grid2 = Math.sin(x * freq + y * 0.05 + deformation) > 0;
      
      // XOR interference creates the Moiré bands
      let active = (grid1 !== grid2);
      let target = active ? line : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applySpiralHalftone(imageObj, bgHex, lineHex, spacing) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let line = hexToRgb(lineHex || '#000000');
  
  let cx = w / 2;
  let cy = h / 2;
  
  // Spacing (period) for spiral turns
  spacing = spacing || 6;
  let maxThickness = spacing * 0.65;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      let dx = x - cx;
      let dy = y - cy;
      let d = Math.sqrt(dx * dx + dy * dy);
      
      let theta = Math.atan2(dy, dx);
      if (theta < 0) theta += 2 * Math.PI;
      
      // Determine which spiral turn is closest
      let turn = Math.round((d / spacing) - (theta / (2 * Math.PI)));
      let targetD = (turn + theta / (2 * Math.PI)) * spacing;
      let err = Math.abs(d - targetD);
      
      let targetThickness = maxThickness * (1.0 - val);
      let useLine = (err < targetThickness / 2.0);
      
      let target = useLine ? line : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyHoundstoothCheck(imageObj, bgHex, checkHex) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let chk = hexToRgb(checkHex || '#000000');
  
  let hGrad = [
    [0.1, 0.1, 0.2, 0.3, 0.4, 0.5, 0.8, 0.9],
    [0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 0.9, 0.9],
    [0.2, 0.3, 0.4, 0.5, 0.6, 0.8, 0.9, 0.7],
    [0.3, 0.4, 0.5, 0.6, 0.7, 0.9, 0.8, 0.6],
    [0.4, 0.5, 0.6, 0.7, 0.8, 0.7, 0.5, 0.4],
    [0.5, 0.7, 0.8, 0.9, 0.7, 0.5, 0.4, 0.3],
    [0.8, 0.9, 0.9, 0.8, 0.5, 0.4, 0.3, 0.2],
    [0.9, 0.9, 0.7, 0.6, 0.4, 0.3, 0.2, 0.1]
  ];
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = imageObj.pixels[idx];
      let g = imageObj.pixels[idx + 1];
      let b = imageObj.pixels[idx + 2];
      
      let L = 0.299 * r + 0.587 * g + 0.114 * b;
      let val = L / 255.0; // 0 to 1
      
      let tx = x % 8;
      let ty = y % 8;
      
      let useCheck = (val < hGrad[ty][tx]);
      let target = useCheck ? chk : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyTuringPattern(imageObj, bgHex, stripeHex, iterations) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let str = hexToRgb(stripeHex || '#000000');
  
  // 1. Initialize grid with luminance values (-1.0 for light, 1.0 for dark)
  let grid = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    let L = 0.299 * r + 0.587 * g + 0.114 * b;
    grid[i] = (L < 128) ? 1.0 : -1.0;
  }
  
  // Helper to get grid value with border mirroring
  let getGrid = (gx, gy) => {
    gx = Math.max(0, Math.min(w - 1, gx));
    gy = Math.max(0, Math.min(h - 1, gy));
    return grid[gx + gy * w];
  };
  
  // 2. Run local-excitation wide-inhibition CA for 'iterations'
  iterations = iterations || 8;
  let nextGrid = new Float32Array(w * h);
  for (let iter = 0; iter < iterations; iter++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let idx = x + y * w;
        
        // Local activator (3x3 average)
        let sum3 = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            sum3 += getGrid(x + dx, y + dy);
          }
        }
        let local = sum3 / 9.0;
        
        // Wide inhibitor (5x5 average)
        let sum5 = 0;
        for (let dy = -2; dy <= 2; dy++) {
          for (let dx = -2; dx <= 2; dx++) {
            sum5 += getGrid(x + dx, y + dy);
          }
        }
        let wide = sum5 / 25.0;
        
        // Feed forward
        let diff = local - 0.75 * wide;
        let nextVal = grid[idx] + diff * 1.5;
        
        // Clamp to [-1.0, 1.0]
        nextGrid[idx] = Math.max(-1.0, Math.min(1.0, nextVal));
      }
    }
    grid.set(nextGrid);
  }
  
  // 3. Render grid
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let target = (grid[i] > 0) ? str : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyCellularAutomata(imageObj, bgHex, cellHex, generations) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let cellColor = hexToRgb(cellHex || '#000000');
  
  let grid = new Uint8Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = imageObj.pixels[idx];
    let g = imageObj.pixels[idx + 1];
    let b = imageObj.pixels[idx + 2];
    let L = 0.299 * r + 0.587 * g + 0.114 * b;
    grid[i] = (L < 128) ? 1 : 0;
  }
  
  let getCell = (gx, gy) => {
    if (gx < 0 || gx >= w || gy < 0 || gy >= h) return 0;
    return grid[gx + gy * w];
  };
  
  // Run 'generations' of Conway's Game of Life
  generations = generations || 4;
  let nextGrid = new Uint8Array(w * h);
  for (let gen = 0; gen < generations; gen++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let idx = x + y * w;
        
        let neighbors = 0;
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0) continue;
            neighbors += getCell(x + dx, y + dy);
          }
        }
        
        let state = grid[idx];
        if (state === 1) {
          nextGrid[idx] = (neighbors === 2 || neighbors === 3) ? 1 : 0;
        } else {
          nextGrid[idx] = (neighbors === 3) ? 1 : 0;
        }
      }
    }
    grid.set(nextGrid);
  }
  
  // Render back
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let target = (grid[i] === 1) ? cellColor : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyCrossStitchTapestry(imageObj, bgHex, crossHex) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let cross = hexToRgb(crossHex || '#000000');
  
  let blockSize = 3;
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, px));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let blockX = Math.floor(x / blockSize);
      let blockY = Math.floor(y / blockSize);
      
      let innerX = x % blockSize;
      let innerY = y % blockSize;
      
      let L = getLuminance(blockX * blockSize + 1, blockY * blockSize + 1);
      let val = L / 255.0; // 0 to 1
      
      let drawActive = false;
      if (val < 0.25) {
        // Very dark: Solid fill
        drawActive = true;
      } else if (val < 0.55) {
        // Medium dark: Plus shape (+)
        drawActive = (innerX === 1 || innerY === 1);
      } else if (val < 0.8) {
        // Light-medium: Cross shape (x)
        drawActive = (innerX === innerY || innerX === (2 - innerY));
      } else {
        // Highlights: Empty
        drawActive = false;
      }
      
      let target = drawActive ? cross : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

// IMAGE PREPROCESSING HELPERS
function applyAntiConfetti(imageObj, radius) {
  if (radius <= 0) return;
  
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  // Create a copy of the pixel array to read from while writing to the original imageObj
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let neighbors = [];
      
      // Collect all color values in the neighborhood
      for (let ny = -radius; ny <= radius; ny++) {
        let py = y + ny;
        if (py < 0 || py >= h) continue;
        
        for (let nx = -radius; nx <= radius; nx++) {
          let px = x + nx;
          if (px < 0 || px >= w) continue;
          
          let idx = (px + py * w) * 4;
          neighbors.push({
            r: srcPixels[idx],
            g: srcPixels[idx + 1],
            b: srcPixels[idx + 2]
          });
        }
      }
      
      // Find the vector median color in the neighborhood
      let bestColor = neighbors[0];
      let minDistanceSum = Infinity;
      
      for (let i = 0; i < neighbors.length; i++) {
        let c1 = neighbors[i];
        let distanceSum = 0;
        
        for (let j = 0; j < neighbors.length; j++) {
          let c2 = neighbors[j];
          let dr = c1.r - c2.r;
          let dg = c1.g - c2.g;
          let db = c1.b - c2.b;
          distanceSum += Math.sqrt(dr * dr + dg * dg + db * db);
        }
        
        if (distanceSum < minDistanceSum) {
          minDistanceSum = distanceSum;
          bestColor = c1;
        }
      }
      
      // Write the vector median color to the target pixel
      let targetIdx = (x + y * w) * 4;
      imageObj.pixels[targetIdx] = bestColor.r;
      imageObj.pixels[targetIdx + 1] = bestColor.g;
      imageObj.pixels[targetIdx + 2] = bestColor.b;
    }
  }
  
  imageObj.updatePixels();
}

function applyKuwaharaFilter(imageObj, radius) {
  if (radius <= 0) return;
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let regions = [
        [x - radius, x, y - radius, y], // TL
        [x, x + radius, y - radius, y], // TR
        [x - radius, x, y, y + radius], // BL
        [x, x + radius, y, y + radius]  // BR
      ];
      
      let minVariance = Infinity;
      let bestMeanR = 0, bestMeanG = 0, bestMeanB = 0;
      
      for (let r = 0; r < 4; r++) {
        let [xStart, xEnd, yStart, yEnd] = regions[r];
        
        let sumR = 0, sumG = 0, sumB = 0;
        let sumL = 0, sumL2 = 0;
        let count = 0;
        
        for (let qy = yStart; qy <= yEnd; qy++) {
          if (qy < 0 || qy >= h) continue;
          for (let qx = xStart; qx <= xEnd; qx++) {
            if (qx < 0 || qx >= w) continue;
            
            let idx = (qx + qy * w) * 4;
            let pr = srcPixels[idx];
            let pg = srcPixels[idx + 1];
            let pb = srcPixels[idx + 2];
            
            sumR += pr;
            sumG += pg;
            sumB += pb;
            
            let l = 0.299 * pr + 0.587 * pg + 0.114 * pb;
            sumL += l;
            sumL2 += l * l;
            count++;
          }
        }
        
        if (count > 0) {
          let meanR = sumR / count;
          let meanG = sumG / count;
          let meanB = sumB / count;
          let meanL = sumL / count;
          let variance = (sumL2 / count) - (meanL * meanL);
          
          if (variance < minVariance) {
            minVariance = variance;
            bestMeanR = meanR;
            bestMeanG = meanG;
            bestMeanB = meanB;
          }
        }
      }
      
      let destIdx = (x + y * w) * 4;
      imageObj.pixels[destIdx] = Math.round(bestMeanR);
      imageObj.pixels[destIdx + 1] = Math.round(bestMeanG);
      imageObj.pixels[destIdx + 2] = Math.round(bestMeanB);
      imageObj.pixels[destIdx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyBrightnessContrast(imageObj, brightness, contrast) {
  if (brightness === 0 && contrast === 0) return;
  
  imageObj.loadPixels();
  let factor = (259 * (contrast + 255)) / (255 * (259 - contrast));
  
  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    
    // Apply brightness
    if (brightness !== 0) {
      r += brightness;
      g += brightness;
      b += brightness;
    }
    
    // Apply contrast
    if (contrast !== 0) {
      r = factor * (r - 128) + 128;
      g = factor * (g - 128) + 128;
      b = factor * (b - 128) + 128;
    }
    
    // Clamp to 0..255
    imageObj.pixels[i] = Math.max(0, Math.min(255, r));
    imageObj.pixels[i + 1] = Math.max(0, Math.min(255, g));
    imageObj.pixels[i + 2] = Math.max(0, Math.min(255, b));
  }
  imageObj.updatePixels();
}

function applyKMeans(imageObj, k) {
  imageObj.loadPixels();
  let pixelsCount = imageObj.width * imageObj.height;
  
  // Pick K initial random centroids from the image pixels
  let centroids = [];
  let attempts = 0;
  while (centroids.length < k && attempts < k * 10) {
    let randIdx = Math.floor(Math.random() * pixelsCount) * 4;
    let r = imageObj.pixels[randIdx];
    let g = imageObj.pixels[randIdx + 1];
    let b = imageObj.pixels[randIdx + 2];
    
    let exists = centroids.some(c => c.r === r && c.g === g && c.b === b);
    if (!exists) {
      centroids.push({ r, g, b });
    }
    attempts++;
  }
  
  // Fallback if we couldn't find enough unique colors
  while (centroids.length < k) {
    centroids.push({
      r: Math.floor(Math.random() * 256),
      g: Math.floor(Math.random() * 256),
      b: Math.floor(Math.random() * 256)
    });
  }
  
  let assignments = new Int32Array(pixelsCount);
  let maxIterations = 10;
  
  for (let iter = 0; iter < maxIterations; iter++) {
    let sums = Array.from({ length: k }, () => ({ r: 0, g: 0, b: 0, count: 0 }));
    let changed = false;
    
    for (let i = 0; i < pixelsCount; i++) {
      let pxIdx = i * 4;
      let r = imageObj.pixels[pxIdx];
      let g = imageObj.pixels[pxIdx + 1];
      let b = imageObj.pixels[pxIdx + 2];
      
      let minDistSq = Infinity;
      let closestCentroidIdx = 0;
      
      for (let c = 0; c < k; c++) {
        let dr = r - centroids[c].r;
        let dg = g - centroids[c].g;
        let db = b - centroids[c].b;
        let distSq = dr * dr + dg * dg + db * db;
        
        if (distSq < minDistSq) {
          minDistSq = distSq;
          closestCentroidIdx = c;
        }
      }
      
      if (assignments[i] !== closestCentroidIdx) {
        assignments[i] = closestCentroidIdx;
        changed = true;
      }
      
      sums[closestCentroidIdx].r += r;
      sums[closestCentroidIdx].g += g;
      sums[closestCentroidIdx].b += b;
      sums[closestCentroidIdx].count++;
    }
    
    if (!changed && iter > 0) {
      break;
    }
    
    for (let c = 0; c < k; c++) {
      if (sums[c].count > 0) {
        centroids[c].r = Math.round(sums[c].r / sums[c].count);
        centroids[c].g = Math.round(sums[c].g / sums[c].count);
        centroids[c].b = Math.round(sums[c].b / sums[c].count);
      }
    }
  }
  
  for (let i = 0; i < pixelsCount; i++) {
    let pxIdx = i * 4;
    let centroid = centroids[assignments[i]];
    imageObj.pixels[pxIdx] = centroid.r;
    imageObj.pixels[pxIdx + 1] = centroid.g;
    imageObj.pixels[pxIdx + 2] = centroid.b;
  }
  imageObj.updatePixels();
}


// ==========================================================================
// DITHERING & ERROR DIFFUSION FILTERS
// ==========================================================================
// ==========================================================================
// DITHERING / ALGORITHM FILTERS
// ==========================================================================

function applyFloydSteinberg(imageObj, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;

  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b; 
    imageObj.pixels[i] = gray;
    imageObj.pixels[i + 1] = gray;
    imageObj.pixels[i + 2] = gray;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;
      let oldVal = imageObj.pixels[index];
      let newVal = oldVal < 128 ? 0 : 255; 
      let err = oldVal - newVal; 

      imageObj.pixels[index] = newVal;
      imageObj.pixels[index + 1] = newVal;
      imageObj.pixels[index + 2] = newVal;

      addError(imageObj, x + 1, y, w, h, err, 7 / 16);
      addError(imageObj, x - 1, y + 1, w, h, err, 3 / 16);
      addError(imageObj, x, y + 1, w, h, err, 5 / 16);
      addError(imageObj, x + 1, y + 1, w, h, err, 1 / 16);
    }
  }

  applyCustomPalette(imageObj, usePalette);
}

function applyAtkinson(imageObj, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;

  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b; 
    imageObj.pixels[i] = gray;
    imageObj.pixels[i + 1] = gray;
    imageObj.pixels[i + 2] = gray;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;
      let oldVal = imageObj.pixels[index];
      let newVal = oldVal < 128 ? 0 : 255; 
      let err = oldVal - newVal; 

      imageObj.pixels[index] = newVal;
      imageObj.pixels[index + 1] = newVal;
      imageObj.pixels[index + 2] = newVal;

      addError(imageObj, x + 1, y, w, h, err, 1 / 8);    
      addError(imageObj, x + 2, y, w, h, err, 1 / 8);     
      addError(imageObj, x - 1, y + 1, w, h, err, 1 / 8); 
      addError(imageObj, x, y + 1, w, h, err, 1 / 8);     
      addError(imageObj, x + 1, y + 1, w, h, err, 1 / 8); 
      addError(imageObj, x, y + 2, w, h, err, 1 / 8);     
    }
  }

  applyCustomPalette(imageObj, usePalette);
}

function applyCustomPalette(imageObj, usePalette) {
  if (usePalette) {
    let c1Val = yarnColor1.value;
    let c2Val = yarnColor2.value;
    let rgb1 = hexToRgb(c1Val);
    let rgb2 = hexToRgb(c2Val);

    for (let i = 0; i < imageObj.pixels.length; i += 4) {
      let val = imageObj.pixels[i]; 
      let finalColor = val === 255 ? rgb1 : rgb2; 
      
      imageObj.pixels[i] = finalColor[0];
      imageObj.pixels[i + 1] = finalColor[1];
      imageObj.pixels[i + 2] = finalColor[2];
    }
  }
  imageObj.updatePixels();
}

function applyCustomPaletteMapping(imageObj, colorsArray) {
  imageObj.loadPixels();
  let rgbColors = colorsArray.map(hex => hexToRgb(hex));
  let useCIEDE = colorDistanceSelect && colorDistanceSelect.value === 'CIEDE2000';
  
  let labColors = [];
  if (useCIEDE) {
    labColors = rgbColors.map(rgb => rgb ? rgbToLab(rgb[0], rgb[1], rgb[2]) : null);
  }

  // Memoization cache: unique 24-bit color key -> best RGB color array
  let colorCache = new Map();

  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];

    let colorKey = (r << 16) | (g << 8) | b;
    let bestColor = colorCache.get(colorKey);

    if (bestColor === undefined) {
      let minDist = Infinity;
      bestColor = rgbColors[0] || [255, 255, 255];

      if (useCIEDE) {
        let currentLab = rgbToLab(r, g, b);
        for (let c = 0; c < rgbColors.length; c++) {
          let rgb = rgbColors[c];
          if (!rgb) continue;
          let lab = labColors[c];
          if (!lab) continue;
          let dist = ciede2000(currentLab, lab);
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgb;
          }
        }
      } else {
        for (let c = 0; c < rgbColors.length; c++) {
          let rgb = rgbColors[c];
          if (!rgb) continue;
          let dr = r - rgb[0];
          let dg = g - rgb[1];
          let db = b - rgb[2];
          let dist = dr * dr + dg * dg + db * db;

          if (dist < minDist) {
            minDist = dist;
            bestColor = rgb;
          }
        }
      }
      colorCache.set(colorKey, bestColor);
    }

    imageObj.pixels[i] = bestColor[0];
    imageObj.pixels[i + 1] = bestColor[1];
    imageObj.pixels[i + 2] = bestColor[2];
  }
  imageObj.updatePixels();
}


// ==========================================================================
// ADVANCED ALGORITHMIC FILTERS & TEXTURING
// ==========================================================================

function addError(imageObj, x, y, w, h, err, factor) {
  if (x >= 0 && x < w && y >= 0 && y < h) {
    let index = (x + y * w) * 4;
    let c = imageObj.pixels[index] + err * factor;
    imageObj.pixels[index] = c;
    imageObj.pixels[index + 1] = c;
    imageObj.pixels[index + 2] = c;
  }
}

function applyErrorDiffusion(imageObj, matrix, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;

  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b; 
    imageObj.pixels[i] = gray;
    imageObj.pixels[i + 1] = gray;
    imageObj.pixels[i + 2] = gray;
  }

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;
      let oldVal = imageObj.pixels[index];
      let newVal = oldVal < 128 ? 0 : 255; 
      let err = oldVal - newVal; 

      imageObj.pixels[index] = newVal;
      imageObj.pixels[index + 1] = newVal;
      imageObj.pixels[index + 2] = newVal;

      for (let step of matrix) {
        addError(imageObj, x + step.dx, y + step.dy, w, h, err, step.weight);
      }
    }
  }

  applyCustomPalette(imageObj, usePalette);
}

function applyStucki(imageObj, usePalette) {
  applyErrorDiffusion(imageObj, STUCKI_MATRIX, usePalette);
}

function applyBurkes(imageObj, usePalette) {
  applyErrorDiffusion(imageObj, BURKES_MATRIX, usePalette);
}

function applySierra(imageObj, usePalette) {
  applyErrorDiffusion(imageObj, SIERRA_MATRIX, usePalette);
}

function applyJJN(imageObj, usePalette) {
  applyErrorDiffusion(imageObj, JJN_MATRIX, usePalette);
}

// Global visual error boundary for in-browser debugging
window.addEventListener('error', function(e) {
  let errorDiv = document.getElementById('debug-error-log');
  if (!errorDiv) {
    errorDiv = document.createElement('div');
    errorDiv.id = 'debug-error-log';
    errorDiv.style.position = 'fixed';
    errorDiv.style.bottom = '20px';
    errorDiv.style.right = '20px';
    errorDiv.style.backgroundColor = '#D36B5C'; // warm terracotta
    errorDiv.style.color = '#FFFFFF';
    errorDiv.style.padding = '16px';
    errorDiv.style.borderRadius = '8px';
    errorDiv.style.zIndex = '99999';
    errorDiv.style.maxWidth = '320px';
    errorDiv.style.fontFamily = 'monospace';
    errorDiv.style.fontSize = '11px';
    errorDiv.style.lineHeight = '1.4';
    errorDiv.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
    errorDiv.style.cursor = 'pointer';
    errorDiv.title = 'Click to dismiss error alert';
    errorDiv.addEventListener('click', () => errorDiv.style.display = 'none');
    document.body.appendChild(errorDiv);
  }
  errorDiv.innerHTML = `<strong>JavaScript Error:</strong><br>${e.message}<br><small>in ${e.filename.split('/').pop()}:${e.lineno}:${e.colno}</small><br><br><span style="text-decoration: underline; font-size: 9px; opacity: 0.8;">Click to close</span>`;
});

function applyLaplacianEdge(imageObj, bgHex, edgeHex, strength, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  strength = strength !== undefined ? strength : 4;
  threshold = threshold !== undefined ? threshold : 45;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let sum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          let lum = getLuminance(x + kx, y + ky);
          if (kx === 0 && ky === 0) {
            sum += 8 * lum;
          } else {
            sum -= lum;
          }
        }
      }
      let edgeIntensity = Math.abs(sum) * strength;
      let isEdge = edgeIntensity > threshold;
      let target = isEdge ? edge : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyCannyEdge(imageObj, bgHex, edgeHex, highThreshold, lowThreshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  highThreshold = highThreshold !== undefined ? highThreshold : 50;
  lowThreshold = lowThreshold !== undefined ? lowThreshold : 20;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    lums[i] = 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  }
  
  // 1. Gaussian Blur (Sigma = 1.0, radius = 2)
  let blurred = new Float32Array(w * h);
  let kernel = new Float32Array([0.06136, 0.24477, 0.38774, 0.24477, 0.06136]); // sigma = 1.0
  let radius = 2;
  
  let temp = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let val = 0;
      for (let k = -radius; k <= radius; k++) {
        let kx = Math.max(0, Math.min(w - 1, x + k));
        val += lums[kx + y * w] * kernel[k + radius];
      }
      temp[x + y * w] = val;
    }
  }
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let val = 0;
      for (let k = -radius; k <= radius; k++) {
        let ky = Math.max(0, Math.min(h - 1, y + k));
        val += temp[x + ky * w] * kernel[k + radius];
      }
      blurred[x + y * w] = val;
    }
  }
  
  // 2. Gradients (Sobel)
  let mag = new Float32Array(w * h);
  let theta = new Float32Array(w * h);
  
  let getVal = (arr, px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    return arr[px + py * w];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = x + y * w;
      let gx = 
        -1 * getVal(blurred, x - 1, y - 1) + 1 * getVal(blurred, x + 1, y - 1) +
        -2 * getVal(blurred, x - 1, y)     + 2 * getVal(blurred, x + 1, y) +
        -1 * getVal(blurred, x - 1, y + 1) + 1 * getVal(blurred, x + 1, y + 1);
      
      let gy = 
        -1 * getVal(blurred, x - 1, y - 1) - 2 * getVal(blurred, x, y - 1) - 1 * getVal(blurred, x + 1, y - 1) +
         1 * getVal(blurred, x - 1, y + 1) + 2 * getVal(blurred, x, y + 1) + 1 * getVal(blurred, x + 1, y + 1);
      
      mag[idx] = Math.sqrt(gx * gx + gy * gy);
      
      let angle = Math.atan2(gy, gx) * 180 / Math.PI;
      if (angle < 0) angle += 180;
      theta[idx] = angle;
    }
  }
  
  // 3. Non-Maximum Suppression (NMS)
  let nms = new Float32Array(w * h);
  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      let idx = x + y * w;
      let angle = theta[idx];
      let val = mag[idx];
      
      let q = 255;
      let r = 255;
      
      if ((angle >= 0 && angle < 22.5) || (angle >= 157.5 && angle <= 180)) {
        q = mag[x + 1 + y * w];
        r = mag[x - 1 + y * w];
      } else if (angle >= 22.5 && angle < 67.5) {
        q = mag[x + 1 + (y - 1) * w];
        r = mag[x - 1 + (y + 1) * w];
      } else if (angle >= 67.5 && angle < 112.5) {
        q = mag[x + (y - 1) * w];
        r = mag[x + (y + 1) * w];
      } else if (angle >= 112.5 && angle < 157.5) {
        q = mag[x - 1 + (y - 1) * w];
        r = mag[x + 1 + (y + 1) * w];
      }
      
      if (val >= q && val >= r) {
        nms[idx] = val;
      } else {
        nms[idx] = 0;
      }
    }
  }
  
  // 4. Double Thresholding & 5. Edge Tracking by Hysteresis
  let result = new Uint8Array(w * h);
  let queue = [];
  
  for (let i = 0; i < w * h; i++) {
    let val = nms[i];
    if (val >= highThreshold) {
      result[i] = 2;
      queue.push(i);
    } else if (val >= lowThreshold) {
      result[i] = 1;
    } else {
      result[i] = 0;
    }
  }
  
  let visited = new Uint8Array(w * h);
  for (let qIdx = 0; qIdx < queue.length; qIdx++) {
    let curr = queue[qIdx];
    visited[curr] = 1;
    
    let cx = curr % w;
    let cy = Math.floor(curr / w);
    
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        let nx = cx + dx;
        let ny = cy + dy;
        if (nx >= 0 && nx < w && ny >= 0 && ny < h) {
          let nIdx = nx + ny * w;
          if (result[nIdx] === 1 && visited[nIdx] === 0) {
            result[nIdx] = 2;
            visited[nIdx] = 1;
            queue.push(nIdx);
          }
        }
      }
    }
  }
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let isEdge = result[i] === 2;
    let target = isEdge ? edge : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyLaplacianOfGaussian(imageObj, bgHex, edgeHex, sigma, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  sigma = sigma !== undefined ? sigma : 1.5;
  threshold = threshold !== undefined ? threshold : 30;
  let strength = 5.0;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    lums[i] = 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  }
  
  let radius = Math.ceil(sigma * 3);
  let size = radius * 2 + 1;
  let kernel = new Float32Array(size);
  let sum = 0;
  for (let i = -radius; i <= radius; i++) {
    let v = Math.exp(-(i * i) / (2 * sigma * sigma));
    kernel[i + radius] = v;
    sum += v;
  }
  for (let i = 0; i < size; i++) kernel[i] /= sum;
  
  let temp = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let val = 0;
      for (let k = -radius; k <= radius; k++) {
        let kx = Math.max(0, Math.min(w - 1, x + k));
        val += lums[kx + y * w] * kernel[k + radius];
      }
      temp[x + y * w] = val;
    }
  }
  
  let blurred = new Float32Array(w * h);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let val = 0;
      for (let k = -radius; k <= radius; k++) {
        let ky = Math.max(0, Math.min(h - 1, y + k));
        val += temp[x + ky * w] * kernel[k + radius];
      }
      blurred[x + y * w] = val;
    }
  }
  
  let getVal = (arr, px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    return arr[px + py * w];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let valSum = 0;
      for (let ky = -1; ky <= 1; ky++) {
        for (let kx = -1; kx <= 1; kx++) {
          let val = getVal(blurred, x + kx, y + ky);
          if (kx === 0 && ky === 0) {
            valSum += 8 * val;
          } else {
            valSum -= val;
          }
        }
      }
      
      let edgeIntensity = Math.abs(valSum) * strength;
      let isEdge = edgeIntensity > threshold;
      let target = isEdge ? edge : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyMedianOtsu(imageObj, bgHex, edgeHex, radius, multiplier) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  radius = radius !== undefined ? radius : 2;
  multiplier = multiplier !== undefined ? multiplier : 1.0;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let medians = new Float32Array(w * h);
  
  // 1. Median Filtering Pass
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let vals = [];
      for (let dy = -radius; dy <= radius; dy++) {
        for (let dx = -radius; dx <= radius; dx++) {
          let px = Math.max(0, Math.min(w - 1, x + dx));
          let py = Math.max(0, Math.min(h - 1, y + dy));
          let idx = (px + py * w) * 4;
          vals.push(0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2]);
        }
      }
      vals.sort((a, b) => a - b);
      medians[x + y * w] = vals[Math.floor(vals.length / 2)];
    }
  }
  
  // 2. Otsu threshold calculation
  let hist = new Int32Array(256);
  for (let i = 0; i < w * h; i++) {
    hist[Math.max(0, Math.min(255, Math.floor(medians[i])))]++;
  }
  
  let total = w * h;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  
  let sumB = 0;
  let wB = 0;
  let wF = 0;
  let varMax = 0;
  let threshold = 127;
  
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (wB === 0) continue;
    wF = total - wB;
    if (wF === 0) break;
    sumB += t * hist[t];
    
    let mB = sumB / wB;
    let mF = (sum - sumB) / wF;
    let varBetween = wB * wF * (mB - mF) * (mB - mF);
    
    if (varBetween > varMax) {
      varMax = varBetween;
      threshold = t;
    }
  }
  
  let finalThreshold = threshold * multiplier;
  
  // 3. Apply thresholding
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let isEdge = medians[i] < finalThreshold;
    let target = isEdge ? edge : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyContourTracing(imageObj, bgHex, contourHex, contourCount, lineWidth) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let contour = hexToRgb(contourHex || '#000000');
  
  contourCount = contourCount !== undefined ? contourCount : 8;
  lineWidth = lineWidth !== undefined ? lineWidth : 1;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  let step = 255.0 / contourCount;
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let lum = getLuminance(x, y);
      let val = Math.floor(lum / step);
      
      let isContour = false;
      // Check neighbors within line width radius
      for (let dy = 0; dy <= lineWidth; dy++) {
        for (let dx = 0; dx <= lineWidth; dx++) {
          if (dx === 0 && dy === 0) continue;
          let nLum = getLuminance(x + dx, y + dy);
          let nVal = Math.floor(nLum / step);
          if (val !== nVal) {
            isContour = true;
            break;
          }
        }
        if (isContour) break;
      }
      
      let target = isContour ? contour : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyDifferenceOfGaussians(imageObj, bgHex, edgeHex, sigma1, sigma2) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  sigma1 = sigma1 !== undefined ? sigma1 : 1.0;
  sigma2 = sigma2 !== undefined ? sigma2 : 2.0;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    lums[i] = 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  }
  
  // Split Gaussian blur implementation
  let blur = (pixels, sigma) => {
    let radius = Math.ceil(sigma * 3);
    let size = radius * 2 + 1;
    let kernel = new Float32Array(size);
    let sum = 0;
    for (let i = -radius; i <= radius; i++) {
      let v = Math.exp(-(i * i) / (2 * sigma * sigma));
      kernel[i + radius] = v;
      sum += v;
    }
    for (let i = 0; i < size; i++) kernel[i] /= sum;
    
    let temp = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let k = -radius; k <= radius; k++) {
          let kx = Math.max(0, Math.min(w - 1, x + k));
          val += pixels[kx + y * w] * kernel[k + radius];
        }
        temp[x + y * w] = val;
      }
    }
    
    let dest = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let val = 0;
        for (let k = -radius; k <= radius; k++) {
          let ky = Math.max(0, Math.min(h - 1, y + k));
          val += temp[x + ky * w] * kernel[k + radius];
        }
        dest[x + y * w] = val;
      }
    }
    return dest;
  };
  
  let G1 = blur(lums, sigma1);
  let G2 = blur(lums, sigma2);
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let diff = G1[i] - 0.96 * G2[i];
    let isEdge = diff > 1.5;
    let target = isEdge ? edge : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applySobelOperator(imageObj, bgHex, edgeHex, strength, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  strength = strength !== undefined ? strength : 3;
  threshold = threshold !== undefined ? threshold : 50;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let gx = 
        -1 * getLuminance(x - 1, y - 1) + 1 * getLuminance(x + 1, y - 1) +
        -2 * getLuminance(x - 1, y)     + 2 * getLuminance(x + 1, y) +
        -1 * getLuminance(x - 1, y + 1) + 1 * getLuminance(x + 1, y + 1);
      
      let gy = 
        -1 * getLuminance(x - 1, y - 1) - 2 * getLuminance(x, y - 1) - 1 * getLuminance(x + 1, y - 1) +
         1 * getLuminance(x - 1, y + 1) + 2 * getLuminance(x, y + 1) + 1 * getLuminance(x + 1, y + 1);
         
      let magnitude = Math.sqrt(gx * gx + gy * gy);
      let isEdge = (magnitude * strength) > threshold;
      let target = isEdge ? edge : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyAdaptiveThresholding(imageObj, bgHex, edgeHex, blockSize, cConstant) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  blockSize = blockSize !== undefined ? blockSize : 15;
  cConstant = cConstant !== undefined ? cConstant : 5;
  
  let half = Math.floor(blockSize / 2);
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  let sumTable = new Float32Array(w * h);
  let getLuminance = (px, py) => {
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    let rowSum = 0;
    for (let x = 0; x < w; x++) {
      rowSum += getLuminance(x, y);
      sumTable[x + y * w] = rowSum + (y > 0 ? sumTable[x + (y - 1) * w] : 0);
    }
  }
  
  let getBoxSum = (x1, y1, x2, y2) => {
    x1 = Math.max(0, x1);
    y1 = Math.max(0, y1);
    x2 = Math.min(w - 1, x2);
    y2 = Math.min(h - 1, y2);
    
    let sum = sumTable[x2 + y2 * w];
    if (x1 > 0) sum -= sumTable[(x1 - 1) + y2 * w];
    if (y1 > 0) sum -= sumTable[x2 + (y1 - 1) * w];
    if (x1 > 0 && y1 > 0) sum += sumTable[(x1 - 1) + (y1 - 1) * w];
    return sum;
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let lum = getLuminance(x, y);
      
      let x1 = x - half, x2 = x + half;
      let y1 = y - half, y2 = y + half;
      let count = (Math.min(w - 1, x2) - Math.max(0, x1) + 1) * (Math.min(h - 1, y2) - Math.max(0, y1) + 1);
      
      let mean = getBoxSum(x1, y1, x2, y2) / count;
      let isEdge = lum < (mean - cConstant);
      
      let target = isEdge ? edge : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyHighPassFilter(imageObj, bgHex, edgeHex, radius, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  radius = radius !== undefined ? radius : 5;
  threshold = threshold !== undefined ? threshold : 128;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    lums[i] = 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  }
  
  let size = radius * 2 + 1;
  let blurred = new Float32Array(w * h);
  let temp = new Float32Array(w * h);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        let kx = Math.max(0, Math.min(w - 1, x + k));
        sum += lums[kx + y * w];
      }
      temp[x + y * w] = sum / size;
    }
  }
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        let ky = Math.max(0, Math.min(h - 1, y + k));
        sum += temp[x + ky * w];
      }
      blurred[x + y * w] = sum / size;
    }
  }
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let highPassVal = lums[i] - blurred[i] + 128;
    let isEdge = highPassVal < threshold;
    let target = isEdge ? edge : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyPrewittFilter(imageObj, bgHex, edgeHex, strength, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  strength = strength !== undefined ? strength : 4;
  threshold = threshold !== undefined ? threshold : 45;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let gx = 
        -1 * getLuminance(x - 1, y - 1) + 1 * getLuminance(x + 1, y - 1) +
        -1 * getLuminance(x - 1, y)     + 1 * getLuminance(x + 1, y) +
        -1 * getLuminance(x - 1, y + 1) + 1 * getLuminance(x + 1, y + 1);
      
      let gy = 
        -1 * getLuminance(x - 1, y - 1) - 1 * getLuminance(x, y - 1) - 1 * getLuminance(x + 1, y - 1) +
         1 * getLuminance(x - 1, y + 1) + 1 * getLuminance(x, y + 1) + 1 * getLuminance(x + 1, y + 1);
         
      let magnitude = Math.sqrt(gx * gx + gy * gy);
      let isEdge = (magnitude * strength) > threshold;
      let target = isEdge ? edge : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyBlueNoiseDithering(imageObj, bgHex, edgeHex, ditherIntensity, noiseScale) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  ditherIntensity = ditherIntensity !== undefined ? ditherIntensity : 50;
  noiseScale = noiseScale !== undefined ? noiseScale : 1;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  let noiseW = Math.ceil(w / noiseScale);
  let noiseH = Math.ceil(h / noiseScale);
  let whiteNoise = new Float32Array(noiseW * noiseH);
  for (let i = 0; i < noiseW * noiseH; i++) {
    whiteNoise[i] = random(0, 255);
  }
  
  let radius = 2;
  let size = radius * 2 + 1;
  let blurred = new Float32Array(noiseW * noiseH);
  let temp = new Float32Array(noiseW * noiseH);
  
  for (let y = 0; y < noiseH; y++) {
    for (let x = 0; x < noiseW; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        let kx = Math.max(0, Math.min(noiseW - 1, x + k));
        sum += whiteNoise[kx + y * noiseW];
      }
      temp[x + y * noiseW] = sum / size;
    }
  }
  for (let y = 0; y < noiseH; y++) {
    for (let x = 0; x < noiseW; x++) {
      let sum = 0;
      for (let k = -radius; k <= radius; k++) {
        let ky = Math.max(0, Math.min(noiseH - 1, y + k));
        sum += temp[x + ky * noiseW];
      }
      blurred[x + y * noiseW] = sum / size;
    }
  }
  
  let blueNoise = new Float32Array(noiseW * noiseH);
  for (let i = 0; i < noiseW * noiseH; i++) {
    blueNoise[i] = whiteNoise[i] - blurred[i] + 128;
  }
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = srcPixels[idx];
      let g = srcPixels[idx + 1];
      let b = srcPixels[idx + 2];
      let lum = 0.299 * r + 0.587 * g + 0.114 * b;
      
      let nx = Math.floor(x / noiseScale) % noiseW;
      let ny = Math.floor(y / noiseScale) % noiseH;
      let noiseVal = blueNoise[nx + ny * noiseW];
      
      let noiseOffset = (noiseVal - 128) * (ditherIntensity / 100.0);
      let isEdge = (lum + noiseOffset) < 128;
      
      let target = isEdge ? edge : bg;
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applySuperpixels(imageObj, superpixelSize, compactness, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  superpixelSize = superpixelSize !== undefined ? superpixelSize : 8;
  compactness = compactness !== undefined ? compactness : 10;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  let S = superpixelSize;
  let cols = Math.floor(w / S);
  let rows = Math.floor(h / S);
  if (cols < 1) cols = 1;
  if (rows < 1) rows = 1;
  
  let centers = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cx = Math.floor(c * S + S / 2);
      let cy = Math.floor(r * S + S / 2);
      cx = Math.max(0, Math.min(w - 1, cx));
      cy = Math.max(0, Math.min(h - 1, cy));
      
      let idx = (cx + cy * w) * 4;
      centers.push({
        r: srcPixels[idx],
        g: srcPixels[idx + 1],
        b: srcPixels[idx + 2],
        x: cx,
        y: cy,
        pixelsCount: 0,
        sumR: 0, sumG: 0, sumB: 0, sumX: 0, sumY: 0
      });
    }
  }
  
  let assignments = new Int32Array(w * h).fill(-1);
  let distances = new Float32Array(w * h).fill(Infinity);
  
  for (let iter = 0; iter < 3; iter++) {
    distances.fill(Infinity);
    assignments.fill(-1);
    
    for (let c = 0; c < centers.length; c++) {
      let center = centers[c];
      let startX = Math.max(0, center.x - S * 2);
      let endX = Math.min(w - 1, center.x + S * 2);
      let startY = Math.max(0, center.y - S * 2);
      let endY = Math.min(h - 1, center.y + S * 2);
      
      for (let y = startY; y <= endY; y++) {
        for (let x = startX; x <= endX; x++) {
          let idx = x + y * w;
          let pIdx = idx * 4;
          
          let dr = srcPixels[pIdx] - center.r;
          let dg = srcPixels[pIdx + 1] - center.g;
          let db = srcPixels[pIdx + 2] - center.b;
          let dColor = dr * dr + dg * dg + db * db;
          
          let dx = x - center.x;
          let dy = y - center.y;
          let dSpatial = dx * dx + dy * dy;
          
          let dist = dColor + dSpatial * (compactness / S) * (compactness / S);
          
          if (dist < distances[idx]) {
            distances[idx] = dist;
            assignments[idx] = c;
          }
        }
      }
    }
    
    centers.forEach(c => {
      c.pixelsCount = 0;
      c.sumR = 0; c.sumG = 0; c.sumB = 0;
      c.sumX = 0; c.sumY = 0;
    });
    
    for (let i = 0; i < w * h; i++) {
      let assignIdx = assignments[i];
      if (assignIdx !== -1) {
        let center = centers[assignIdx];
        let pIdx = i * 4;
        center.pixelsCount++;
        center.sumR += srcPixels[pIdx];
        center.sumG += srcPixels[pIdx + 1];
        center.sumB += srcPixels[pIdx + 2];
        center.sumX += i % w;
        center.sumY += Math.floor(i / w);
      }
    }
    
    centers.forEach(c => {
      if (c.pixelsCount > 0) {
        c.r = c.sumR / c.pixelsCount;
        c.g = c.sumG / c.pixelsCount;
        c.b = c.sumB / c.pixelsCount;
        c.x = Math.floor(c.sumX / c.pixelsCount);
        c.y = Math.floor(c.sumY / c.pixelsCount);
      }
    });
  }
  
  let rgbColors = usePalette.map(hex => hexToRgb(hex));
  let labColors = null;
  if (typeof ciede2000 !== 'undefined' && typeof rgbToLab !== 'undefined') {
    labColors = rgbColors.map(rgb => rgbToLab(rgb[0], rgb[1], rgb[2]));
  }
  
  let colorCache = new Map();
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let assignIdx = assignments[i];
    let r, g, b;
    if (assignIdx !== -1) {
      r = centers[assignIdx].r;
      g = centers[assignIdx].g;
      b = centers[assignIdx].b;
    } else {
      r = srcPixels[idx];
      g = srcPixels[idx + 1];
      b = srcPixels[idx + 2];
    }
    
    let colorKey = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    let bestColor;
    if (colorCache.has(colorKey)) {
      bestColor = colorCache.get(colorKey);
    } else {
      let minDist = Infinity;
      bestColor = rgbColors[0] || [255, 255, 255];
      
      if (labColors && typeof rgbToLab !== 'undefined' && typeof ciede2000 !== 'undefined') {
        let currentLab = rgbToLab(r, g, b);
        for (let c = 0; c < rgbColors.length; c++) {
          let dist = ciede2000(currentLab, labColors[c]);
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      } else {
        for (let c = 0; c < rgbColors.length; c++) {
          let dr = r - rgbColors[c][0];
          let dg = g - rgbColors[c][1];
          let db = b - rgbColors[c][2];
          let dist = dr*dr + dg*dg + db*db;
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      }
      colorCache.set(colorKey, bestColor);
    }
    
    imageObj.pixels[idx] = bestColor[0];
    imageObj.pixels[idx + 1] = bestColor[1];
    imageObj.pixels[idx + 2] = bestColor[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyBilateralMode(imageObj, spatialSigma, rangeSigma, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  spatialSigma = spatialSigma !== undefined ? spatialSigma : 3;
  rangeSigma = rangeSigma !== undefined ? rangeSigma : 25;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let tempPixels = new Uint8ClampedArray(w * h * 4);
  
  let spatialFactor = -0.5 / (spatialSigma * spatialSigma);
  let rangeFactor = -0.5 / (rangeSigma * rangeSigma);
  let radius = Math.ceil(spatialSigma * 2);
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      let r = srcPixels[idx];
      let g = srcPixels[idx + 1];
      let b = srcPixels[idx + 2];
      
      let sumW = 0;
      let sumR = 0, sumG = 0, sumB = 0;
      
      for (let dy = -radius; dy <= radius; dy++) {
        let ny = y + dy;
        if (ny < 0 || ny >= h) continue;
        
        for (let dx = -radius; dx <= radius; dx++) {
          let nx = x + dx;
          if (nx < 0 || nx >= w) continue;
          
          let nIdx = (nx + ny * w) * 4;
          let nr = srcPixels[nIdx];
          let ng = srcPixels[nIdx + 1];
          let nb = srcPixels[nIdx + 2];
          
          let dSpatial = dx * dx + dy * dy;
          let wSpatial = Math.exp(dSpatial * spatialFactor);
          
          let dRange = (r - nr) * (r - nr) + (g - ng) * (g - ng) + (b - nb) * (b - nb);
          let wRange = Math.exp(dRange * rangeFactor);
          
          let weight = wSpatial * wRange;
          sumW += weight;
          sumR += nr * weight;
          sumG += ng * weight;
          sumB += nb * weight;
        }
      }
      
      let destIdx = (x + y * w) * 4;
      tempPixels[destIdx] = sumW > 0 ? sumR / sumW : r;
      tempPixels[destIdx + 1] = sumW > 0 ? sumG / sumW : g;
      tempPixels[destIdx + 2] = sumW > 0 ? sumB / sumW : b;
    }
  }
  
  let rgbColors = usePalette.map(hex => hexToRgb(hex));
  let labColors = null;
  if (typeof ciede2000 !== 'undefined' && typeof rgbToLab !== 'undefined') {
    labColors = rgbColors.map(rgb => rgbToLab(rgb[0], rgb[1], rgb[2]));
  }
  
  let colorCache = new Map();
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = tempPixels[idx];
    let g = tempPixels[idx + 1];
    let b = tempPixels[idx + 2];
    
    let colorKey = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    let bestColor;
    if (colorCache.has(colorKey)) {
      bestColor = colorCache.get(colorKey);
    } else {
      let minDist = Infinity;
      bestColor = rgbColors[0] || [255, 255, 255];
      
      if (labColors && typeof rgbToLab !== 'undefined' && typeof ciede2000 !== 'undefined') {
        let currentLab = rgbToLab(r, g, b);
        for (let c = 0; c < rgbColors.length; c++) {
          let dist = ciede2000(currentLab, labColors[c]);
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      } else {
        for (let c = 0; c < rgbColors.length; c++) {
          let dr = r - rgbColors[c][0];
          let dg = g - rgbColors[c][1];
          let db = b - rgbColors[c][2];
          let dist = dr*dr + dg*dg + db*db;
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      }
      colorCache.set(colorKey, bestColor);
    }
    
    imageObj.pixels[idx] = bestColor[0];
    imageObj.pixels[idx + 1] = bestColor[1];
    imageObj.pixels[idx + 2] = bestColor[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyAnisotropicDiffusion(imageObj, iterations, kappa, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  iterations = iterations !== undefined ? iterations : 5;
  kappa = kappa !== undefined ? kappa : 20;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let currentImg = new Float32Array(w * h * 3);
  let nextImg = new Float32Array(w * h * 3);
  
  for (let i = 0; i < w * h; i++) {
    currentImg[i * 3] = srcPixels[i * 4];
    currentImg[i * 3 + 1] = srcPixels[i * 4 + 1];
    currentImg[i * 3 + 2] = srcPixels[i * 4 + 2];
  }
  
  let lambda = 0.20;
  let k2 = kappa * kappa;
  
  for (let step = 0; step < iterations; step++) {
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let idx = x + y * w;
        
        let nr = (y > 0) ? (x + (y - 1) * w) : idx;
        let sr = (y < h - 1) ? (x + (y + 1) * w) : idx;
        let er = (x < w - 1) ? ((x + 1) + y * w) : idx;
        let wr = (x > 0) ? ((x - 1) + y * w) : idx;
        
        for (let c = 0; c < 3; c++) {
          let val = currentImg[idx * 3 + c];
          
          let gradN = currentImg[nr * 3 + c] - val;
          let gradS = currentImg[sr * 3 + c] - val;
          let gradE = currentImg[er * 3 + c] - val;
          let gradW = currentImg[wr * 3 + c] - val;
          
          let cN = Math.exp(-(gradN * gradN) / k2);
          let cS = Math.exp(-(gradS * gradS) / k2);
          let cE = Math.exp(-(gradE * gradE) / k2);
          let cW = Math.exp(-(gradW * gradW) / k2);
          
          nextImg[idx * 3 + c] = val + lambda * (cN * gradN + cS * gradS + cE * gradE + cW * gradW);
        }
      }
    }
    currentImg.set(nextImg);
  }
  
  let rgbColors = usePalette.map(hex => hexToRgb(hex));
  let labColors = null;
  if (typeof ciede2000 !== 'undefined' && typeof rgbToLab !== 'undefined') {
    labColors = rgbColors.map(rgb => rgbToLab(rgb[0], rgb[1], rgb[2]));
  }
  
  let colorCache = new Map();
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let r = currentImg[i * 3];
    let g = currentImg[i * 3 + 1];
    let b = currentImg[i * 3 + 2];
    
    let colorKey = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    let bestColor;
    if (colorCache.has(colorKey)) {
      bestColor = colorCache.get(colorKey);
    } else {
      let minDist = Infinity;
      bestColor = rgbColors[0] || [255, 255, 255];
      
      if (labColors && typeof rgbToLab !== 'undefined' && typeof ciede2000 !== 'undefined') {
        let currentLab = rgbToLab(r, g, b);
        for (let c = 0; c < rgbColors.length; c++) {
          let dist = ciede2000(currentLab, labColors[c]);
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      } else {
        for (let c = 0; c < rgbColors.length; c++) {
          let dr = r - rgbColors[c][0];
          let dg = g - rgbColors[c][1];
          let db = b - rgbColors[c][2];
          let dist = dr*dr + dg*dg + db*db;
          if (dist < minDist) {
            minDist = dist;
            bestColor = rgbColors[c];
          }
        }
      }
      colorCache.set(colorKey, bestColor);
    }
    
    imageObj.pixels[idx] = bestColor[0];
    imageObj.pixels[idx + 1] = bestColor[1];
    imageObj.pixels[idx + 2] = bestColor[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyDifferenceOfMedians(imageObj, bgHex, edgeHex, r1, r2) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  r1 = r1 !== undefined ? r1 : 1;
  r2 = r2 !== undefined ? r2 : 3;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let lums = new Float32Array(w * h);
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    lums[i] = 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  }
  
  let median = (pixels, radius) => {
    let dest = new Float32Array(w * h);
    for (let y = 0; y < h; y++) {
      for (let x = 0; x < w; x++) {
        let vals = [];
        for (let dy = -radius; dy <= radius; dy++) {
          for (let dx = -radius; dx <= radius; dx++) {
            let px = Math.max(0, Math.min(w - 1, x + dx));
            let py = Math.max(0, Math.min(h - 1, y + dy));
            vals.push(pixels[px + py * w]);
          }
        }
        vals.sort((a, b) => a - b);
        dest[x + y * w] = vals[Math.floor(vals.length / 2)];
      }
    }
    return dest;
  };
  
  let med1 = median(lums, r1);
  let med2 = median(lums, r2);
  
  for (let i = 0; i < w * h; i++) {
    let idx = i * 4;
    let diff = Math.abs(med1[i] - med2[i]);
    let isEdge = (diff * 5) > 40;
    let target = isEdge ? edge : bg;
    imageObj.pixels[idx] = target[0];
    imageObj.pixels[idx + 1] = target[1];
    imageObj.pixels[idx + 2] = target[2];
    imageObj.pixels[idx + 3] = 255;
  }
  imageObj.updatePixels();
}

function applyBinarizationRidgeDetection(imageObj, bgHex, edgeHex, strength, threshold) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  let bg = hexToRgb(bgHex || '#FFFFFF');
  let edge = hexToRgb(edgeHex || '#000000');
  
  strength = strength !== undefined ? strength : 4;
  threshold = threshold !== undefined ? threshold : 20;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  let getLuminance = (px, py) => {
    px = Math.max(0, Math.min(w - 1, px));
    py = Math.max(0, Math.min(h - 1, py));
    let idx = (px + py * w) * 4;
    return 0.299 * srcPixels[idx] + 0.587 * srcPixels[idx + 1] + 0.114 * srcPixels[idx + 2];
  };
  
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let idx = (x + y * w) * 4;
      
      let lum = getLuminance(x, y);
      let lxx = getLuminance(x - 1, y) - 2 * lum + getLuminance(x + 1, y);
      let lyy = getLuminance(x, y - 1) - 2 * lum + getLuminance(x, y + 1);
      let lxy = (getLuminance(x + 1, y + 1) - getLuminance(x + 1, y - 1) - 
                 getLuminance(x - 1, y + 1) + getLuminance(x - 1, y - 1)) / 4.0;
                 
      let trace = lxx + lyy;
      let determinant = lxx * lyy - lxy * lxy;
      let term = Math.sqrt(Math.max(0, trace * trace - 4 * determinant));
      
      let lambda1 = (trace + term) / 2.0;
      let lambda2 = (trace - term) / 2.0;
      
      let ridgeVal = Math.max(Math.abs(lambda1), Math.abs(lambda2));
      let isEdge = (ridgeVal * strength) > threshold;
      let target = isEdge ? edge : bg;
      
      imageObj.pixels[idx] = target[0];
      imageObj.pixels[idx + 1] = target[1];
      imageObj.pixels[idx + 2] = target[2];
      imageObj.pixels[idx + 3] = 255;
    }
  }
  imageObj.updatePixels();
}

function applyVectorQuantization(imageObj, blockSize, codebookSize, usePalette) {
  imageObj.loadPixels();
  let w = imageObj.width;
  let h = imageObj.height;
  
  blockSize = blockSize !== undefined ? blockSize : 2;
  codebookSize = codebookSize !== undefined ? codebookSize : 16;
  
  let srcPixels = new Uint8ClampedArray(imageObj.pixels);
  
  // 1. Extract block vectors
  let B = blockSize;
  let blocksW = Math.floor(w / B);
  let blocksH = Math.floor(h / B);
  if (blocksW < 1) blocksW = 1;
  if (blocksH < 1) blocksH = 1;
  
  let vectors = [];
  let vectorDim = B * B * 3;
  
  for (let by = 0; by < blocksH; by++) {
    for (let bx = 0; bx < blocksW; bx++) {
      let vec = new Float32Array(vectorDim);
      let vIdx = 0;
      for (let dy = 0; dy < B; dy++) {
        for (let dx = 0; dx < B; dx++) {
          let px = Math.min(w - 1, bx * B + dx);
          let py = Math.min(h - 1, by * B + dy);
          let idx = (px + py * w) * 4;
          vec[vIdx++] = srcPixels[idx];
          vec[vIdx++] = srcPixels[idx + 1];
          vec[vIdx++] = srcPixels[idx + 2];
        }
      }
      vectors.push(vec);
    }
  }
  
  // 2. K-Means clustering on block vectors
  let K = Math.min(codebookSize, vectors.length);
  let centroids = [];
  
  // Random initialization from vectors
  let usedIndices = new Set();
  while (centroids.length < K) {
    let randIdx = Math.floor(Math.random() * vectors.length);
    if (!usedIndices.has(randIdx)) {
      usedIndices.add(randIdx);
      centroids.push(new Float32Array(vectors[randIdx]));
    }
  }
  
  let assignments = new Int32Array(vectors.length);
  
  for (let iter = 0; iter < 5; iter++) {
    // Assignment step
    for (let i = 0; i < vectors.length; i++) {
      let vec = vectors[i];
      let minDist = Infinity;
      let bestCentroid = 0;
      for (let c = 0; c < K; c++) {
        let cent = centroids[c];
        let d = 0;
        for (let j = 0; j < vectorDim; j++) {
          let diff = vec[j] - cent[j];
          d += diff * diff;
        }
        if (d < minDist) {
          minDist = d;
          bestCentroid = c;
        }
      }
      assignments[i] = bestCentroid;
    }
    
    // Update step
    let nextCentroids = [];
    let counts = new Int32Array(K);
    for (let c = 0; c < K; c++) {
      nextCentroids.push(new Float32Array(vectorDim));
    }
    
    for (let i = 0; i < vectors.length; i++) {
      let vec = vectors[i];
      let c = assignments[i];
      counts[c]++;
      for (let j = 0; j < vectorDim; j++) {
        nextCentroids[c][j] += vec[j];
      }
    }
    
    for (let c = 0; c < K; c++) {
      if (counts[c] > 0) {
        for (let j = 0; j < vectorDim; j++) {
          centroids[c][j] = nextCentroids[c][j] / counts[c];
        }
      }
    }
  }
  
  // 3. Reconstruct image and map to palette
  let rgbColors = usePalette.map(hex => hexToRgb(hex));
  let labColors = null;
  if (typeof ciede2000 !== 'undefined' && typeof rgbToLab !== 'undefined') {
    labColors = rgbColors.map(rgb => rgbToLab(rgb[0], rgb[1], rgb[2]));
  }
  
  let colorCache = new Map();
  let getNearestColor = (r, g, b) => {
    let key = `${Math.round(r)},${Math.round(g)},${Math.round(b)}`;
    if (colorCache.has(key)) return colorCache.get(key);
    
    let minDist = Infinity;
    let bestColor = rgbColors[0] || [255, 255, 255];
    
    if (labColors && typeof rgbToLab !== 'undefined' && typeof ciede2000 !== 'undefined') {
      let currentLab = rgbToLab(r, g, b);
      for (let c = 0; c < rgbColors.length; c++) {
        let dist = ciede2000(currentLab, labColors[c]);
        if (dist < minDist) {
          minDist = dist;
          bestColor = rgbColors[c];
        }
      }
    } else {
      for (let c = 0; c < rgbColors.length; c++) {
        let dr = r - rgbColors[c][0];
        let dg = g - rgbColors[c][1];
        let db = b - rgbColors[c][2];
        let dist = dr*dr + dg*dg + db*db;
        if (dist < minDist) {
          minDist = dist;
          bestColor = rgbColors[c];
        }
      }
    }
    colorCache.set(key, bestColor);
    return bestColor;
  };
  
  let blockIdx = 0;
  for (let by = 0; by < blocksH; by++) {
    for (let bx = 0; bx < blocksW; bx++) {
      let cent = centroids[assignments[blockIdx++]];
      let vIdx = 0;
      for (let dy = 0; dy < B; dy++) {
        for (let dx = 0; dx < B; dx++) {
          let px = Math.min(w - 1, bx * B + dx);
          let py = Math.min(h - 1, by * B + dy);
          let idx = (px + py * w) * 4;
          
          let cr = cent[vIdx++];
          let cg = cent[vIdx++];
          let cb = cent[vIdx++];
          
          let nearest = getNearestColor(cr, cg, cb);
          
          imageObj.pixels[idx] = nearest[0];
          imageObj.pixels[idx + 1] = nearest[1];
          imageObj.pixels[idx + 2] = nearest[2];
          imageObj.pixels[idx + 3] = 255;
        }
      }
    }
  }
  
  // Fill in any border pixels if width/height not divisible by B
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (x >= blocksW * B || y >= blocksH * B) {
        let idx = (x + y * w) * 4;
        let r = srcPixels[idx];
        let g = srcPixels[idx + 1];
        let b = srcPixels[idx + 2];
        let nearest = getNearestColor(r, g, b);
        imageObj.pixels[idx] = nearest[0];
        imageObj.pixels[idx + 1] = nearest[1];
        imageObj.pixels[idx + 2] = nearest[2];
        imageObj.pixels[idx + 3] = 255;
      }
    }
  }
  
  imageObj.updatePixels();
}
