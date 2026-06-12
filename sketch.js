const APP_STRINGS = {
  // Modes menu.
  MODE_ORIGINAL: 'Original Colors',
  MODE_BW: 'Black & White (Threshold)',
  MODE_POSTERIZE: 'Color Reduction (Posterize)',
  MODE_FLOYD: 'Floyd-Steinberg Dithering',
  MODE_FLOYD_PALETTE: 'Dithering + Custom Palette',
  MODE_ATKINSON: 'Atkinson Dithering',
  MODE_ATKINSON_PALETTE: 'Atkinson + Custom Palette',
  MODE_STUCKI: 'Stucki Dithering',
  MODE_STUCKI_PALETTE: 'Stucki + Custom Palette',
  MODE_BURKES: 'Burkes Dithering',
  MODE_BURKES_PALETTE: 'Burkes + Custom Palette',
  MODE_SIERRA: 'Sierra Dithering',
  MODE_SIERRA_PALETTE: 'Sierra + Custom Palette',
  MODE_JJN: 'Jarvis-Judice-Ninke Dithering',
  MODE_JJN_PALETTE: 'JJN + Custom Palette',

  // Buttons, labels.
  CHECKBOX_GRID: ' Show grid (stitch outlines)',
  PLACEHOLDER_LEVELS: 'Number of levels (2-255)',
  BTN_GENERATE: 'Generate chart',
  BTN_DOWNLOAD: 'Download chart',

  // Alerts.
  CANVAS_EMPTY: "Upload an image, select a mode, and click 'Generate chart'.",
  ALERT_WRONG_TYPE: "Please upload an image file (e.g., JPG or PNG).",
  ALERT_NO_IMAGE: "Please upload an image first!",
  ALERT_BAD_WIDTH: "Please enter a valid width (a number greater than 0).",
  ALERT_NO_CHART: "There is no chart to save!",

  FILENAME: 'knitting-chart'
};

const DEFAULTS = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  GRID_ENABLED: false,
  OUTPUT_WIDTH: 200,
  COLOR1_PICKER: '#c1d8bc',
  COLOR2_PICKER: '#536a47'
};

const STUCKI_MATRIX = [
  { dx: 1, dy: 0, weight: 8 / 42 }, { dx: 2, dy: 0, weight: 4 / 42 },
  { dx: -2, dy: 1, weight: 2 / 42 }, { dx: -1, dy: 1, weight: 4 / 42 }, { dx: 0, dy: 1, weight: 8 / 42 }, { dx: 1, dy: 1, weight: 4 / 42 }, { dx: 2, dy: 1, weight: 2 / 42 },
  { dx: -2, dy: 2, weight: 1 / 42 }, { dx: -1, dy: 2, weight: 2 / 42 }, { dx: 0, dy: 2, weight: 4 / 42 }, { dx: 1, dy: 2, weight: 2 / 42 }, { dx: 2, dy: 2, weight: 1 / 42 }
];

const BURKES_MATRIX = [
  { dx: 1, dy: 0, weight: 8 / 32 }, { dx: 2, dy: 0, weight: 4 / 32 },
  { dx: -2, dy: 1, weight: 2 / 32 }, { dx: -1, dy: 1, weight: 4 / 32 }, { dx: 0, dy: 1, weight: 8 / 32 }, { dx: 1, dy: 1, weight: 4 / 32 }, { dx: 2, dy: 1, weight: 2 / 32 }
];

// Sierra (tzw. "Sierra-3" - pełny algorytm)
const SIERRA_MATRIX = [
  { dx: 1, dy: 0, weight: 5 / 32 }, { dx: 2, dy: 0, weight: 3 / 32 },
  { dx: -2, dy: 1, weight: 2 / 32 }, { dx: -1, dy: 1, weight: 4 / 32 }, { dx: 0, dy: 1, weight: 5 / 32 }, { dx: 1, dy: 1, weight: 4 / 32 }, { dx: 2, dy: 1, weight: 2 / 32 },
  { dx: -1, dy: 2, weight: 2 / 32 }, { dx: 0, dy: 2, weight: 3 / 32 }, { dx: 1, dy: 2, weight: 2 / 32 }
];

// Jarvis-Judice-Ninke
const JJN_MATRIX = [
  { dx: 1, dy: 0, weight: 7 / 48 }, { dx: 2, dy: 0, weight: 5 / 48 },
  { dx: -2, dy: 1, weight: 3 / 48 }, { dx: -1, dy: 1, weight: 5 / 48 }, { dx: 0, dy: 1, weight: 7 / 48 }, { dx: 1, dy: 1, weight: 5 / 48 }, { dx: 2, dy: 1, weight: 3 / 48 },
  { dx: -2, dy: 2, weight: 1 / 48 }, { dx: -1, dy: 2, weight: 3 / 48 }, { dx: 0, dy: 2, weight: 5 / 48 }, { dx: 1, dy: 2, weight: 3 / 48 }, { dx: 2, dy: 2, weight: 1 / 48 }
];

let img;
let widthInput;
let generateBtn;
let saveBtn;
let processedImg;
let colorModeSelect;
let colorLevelsInput;
let gridCheckbox;

let color1Picker;
let color2Picker;



function setup() {
  let canvas = createCanvas(DEFAULTS.CANVAS_WIDTH, DEFAULTS.CANVAS_WIDTH);
  canvas.parent('canvas-container');

  gridCheckbox = createCheckbox(APP_STRINGS.CHECKBOX_GRID, DEFAULTS.GRID_ENABLED);
  gridCheckbox.parent('grid-container');
  gridCheckbox.changed(loop);

  let uploadBtn = createFileInput(handleFile);
  uploadBtn.parent('upload-container');

  widthInput = createInput(DEFAULTS.OUTPUT_WIDTH); 
  widthInput.parent('input-container');

  colorModeSelect = createSelect();
  colorModeSelect.parent('color-mode-container');
  colorModeSelect.option(APP_STRINGS.MODE_ORIGINAL);
  colorModeSelect.option(APP_STRINGS.MODE_BW);
  colorModeSelect.option(APP_STRINGS.MODE_POSTERIZE);
  colorModeSelect.option(APP_STRINGS.MODE_FLOYD);
  colorModeSelect.option(APP_STRINGS.MODE_FLOYD_PALETTE);
  colorModeSelect.option(APP_STRINGS.MODE_ATKINSON);
  colorModeSelect.option(APP_STRINGS.MODE_ATKINSON_PALETTE);
  colorModeSelect.option(APP_STRINGS.MODE_STUCKI);
  colorModeSelect.option(APP_STRINGS.MODE_STUCKI_PALETTE);
  colorModeSelect.option(APP_STRINGS.MODE_BURKES);
  colorModeSelect.option(APP_STRINGS.MODE_BURKES_PALETTE);
  colorModeSelect.option(APP_STRINGS.MODE_SIERRA);
  colorModeSelect.option(APP_STRINGS.MODE_SIERRA_PALETTE);
  colorModeSelect.option(APP_STRINGS.MODE_JJN);
  colorModeSelect.option(APP_STRINGS.MODE_JJN_PALETTE);

  colorLevelsInput = createInput();
  colorLevelsInput.parent('color-count-container');
  colorLevelsInput.attribute('placeholder', APP_STRINGS.PLACEHOLDER_LEVELS);

  color1Picker = createColorPicker(DEFAULTS.COLOR1_PICKER); 
  color1Picker.parent('custom-colors-container');
  color2Picker = createColorPicker(DEFAULTS.COLOR2_PICKER); 
  color2Picker.parent('custom-colors-container');

  color1Picker.input(autoUpdateChart);
  color2Picker.input(autoUpdateChart);
  colorModeSelect.changed(autoUpdateChart);

  generateBtn = createButton(APP_STRINGS.BTN_GENERATE);
  generateBtn.parent('buttons-container');
  generateBtn.mousePressed(generateChart);

  saveBtn = createButton(APP_STRINGS.BTN_DOWNLOAD);
  saveBtn.parent('buttons-container');
  saveBtn.mousePressed(saveChart);

  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(245);

  if (processedImg) {
    let cellW = width / processedImg.width;
    let cellH = height / processedImg.height;
    let cellSize = min(cellW, cellH) * 0.95; 

    let offsetX = (width - processedImg.width * cellSize) / 2;
    let offsetY = (height - processedImg.height * cellSize) / 2;

    for (let x = 0; x < processedImg.width; x++) {
      for (let y = 0; y < processedImg.height; y++) {
        let c = processedImg.get(x, y); 
        
        fill(c);             
        
        if (gridCheckbox.checked()) {
          stroke(150);         
          strokeWeight(1);     
        } else {
          noStroke();          
        }
        
        rect(offsetX + x * cellSize, offsetY + y * cellSize, cellSize, cellSize);
      }
    }
  } else {
    fill(100);
    noStroke();
    text(APP_STRINGS.CANVAS_EMPTY, width / 2, height / 2);
  }
  
  noLoop(); 
}

function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      processedImg = null; 
      loop();              
    });
  } else {
    alert(APP_STRINGS.ALERT_WRONG_TYPE);
  }
}

function autoUpdateChart() {
  if (img) {
    generateChart();
  }
}

function generateChart() {
  if (!img) {
    alert(APP_STRINGS.ALERT_NO_IMAGE);
    return;
  }

  let targetW = parseInt(widthInput.value());
  
  if (isNaN(targetW) || targetW <= 0) {
    alert(APP_STRINGS.ALERT_BAD_WIDTH);
    return;
  }

  let ratio = img.height / img.width;
  let targetH = Math.floor(targetW * ratio);

  processedImg = createImage(targetW, targetH);
  processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);

  let mode = colorModeSelect.value();

  if (mode === APP_STRINGS.MODE_BW) {
    processedImg.filter(THRESHOLD, 0.5); 
  } 
  else if (mode === APP_STRINGS.MODE_POSTERIZE) {
    let levels = parseInt(colorLevelsInput.value());
    if (isNaN(levels) || levels < 2) levels = 2; 
    if (levels > 255) levels = 255;
    processedImg.filter(POSTERIZE, levels);
  }
  else if (mode === APP_STRINGS.MODE_FLOYD) {
    applyFloydSteinberg(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_FLOYD_PALETTE) {
    applyFloydSteinberg(processedImg, true);
  }
  else if (mode === APP_STRINGS.MODE_ATKINSON) {
    applyAtkinson(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_ATKINSON_PALETTE) {
    applyAtkinson(processedImg, true);
  }
  else if (mode === APP_STRINGS.MODE_STUCKI) {
    applyStucki(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_STUCKI_PALETTE) {
    applyStucki(processedImg, true);
  }
  else if (mode === APP_STRINGS.MODE_BURKES) {
    applyBurkes(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_BURKES_PALETTE) {
    applyBurkes(processedImg, true);
  }
  else if (mode === APP_STRINGS.MODE_SIERRA) {
    applySierra(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_SIERRA_PALETTE) {
    applySierra(processedImg, true);
  }
  else if (mode === APP_STRINGS.MODE_JJN) {
    applyJJN(processedImg, false);
  }
  else if (mode === APP_STRINGS.MODE_JJN_PALETTE) {
    applyJJN(processedImg, true);
  } 

  loop(); 
}

function saveChart() {
  if (processedImg) {
    processedImg.save(APP_STRINGS.FILENAME, 'png');
  } else {
    alert(APP_STRINGS.ALERT_NO_CHART);
  }
}

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
    let c1 = color1Picker.color(); 
    let c2 = color2Picker.color(); 
    let rgb1 = [red(c1), green(c1), blue(c1)];
    let rgb2 = [red(c2), green(c2), blue(c2)];

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

  // Konwersja na odcienie szarości
  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    let gray = 0.299 * r + 0.587 * g + 0.114 * b; 
    imageObj.pixels[i] = gray;
    imageObj.pixels[i + 1] = gray;
    imageObj.pixels[i + 2] = gray;
  }

  // Aplikacja ditheringu
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;
      let oldVal = imageObj.pixels[index];
      let newVal = oldVal < 128 ? 0 : 255; 
      let err = oldVal - newVal; 

      // Ustawiamy nowy kolor czarny/biały
      imageObj.pixels[index] = newVal;
      imageObj.pixels[index + 1] = newVal;
      imageObj.pixels[index + 2] = newVal;

      // Rozpraszamy błąd za pomocą przekazanej macierzy
      for (let step of matrix) {
        addError(imageObj, x + step.dx, y + step.dy, w, h, err, step.weight);
      }
    }
  }

  // Nałożenie ewentualnej niestandardowej palety
  applyCustomPalette(imageObj, usePalette);
}

// 3. Redukujemy oryginalne funkcje do prostych wywołań
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