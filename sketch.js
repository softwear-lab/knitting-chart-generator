// Knitting Chart Generator - Main Application Script
// Modularized components are split into: constants.js, color-utils.js, filters.js, exporters.js

// p5.Image variables
let img;
let processedImg;

// HTML Native Element bindings
let fileInput;
let dropzone;
let widthInputVal;
let widthSlider;
let brightnessInputVal;
let brightnessSlider;
let contrastInputVal;
let contrastSlider;
let smoothingInputVal;
let smoothingSlider;
let calcStitchLengthInput;
let calcSkeinLengthInput;
let colorModeSelect;
let colorLevelsInput;
let yarnColor1;
let yarnColor2;
let yarnColor1Hex;
let yarnColor2Hex;
let gridCheckbox;
let btnGenerate;
let btnDownload;
let btnReset;
let btnExportPDF;
let btnExportXLS;
let symbolsCheckbox;
let symbolMap = {};

// Custom Palette variables
let paletteSizeInput;
let yarnPickers = [];
let yarnPickerHexes = [];

// New Advanced Features variables
let kuwaharaSlider;
let kuwaharaVal;
let stitchAspectSelect;
let knittingMethodSelect;
let btnCopyInstructions;
let writtenInstructionsTextarea;
let colorDistanceSelect;

let bayerMatrixSelect;
let strayStitchCheckbox;
let histEqCheckbox;
let bilateralSlider;
let bilateralVal;
let morphCleanupSelect;
let rowColorLimitCheckbox;
let rowColorLimitInput;

let algoParamContainer1, algoParamLabel1, algoParamVal1, algoParamSlider1, algoParamHelp1;
let algoParamContainer2, algoParamLabel2, algoParamVal2, algoParamSlider2, algoParamHelp2;

// Settings cache
let currentSettings = {};
let currentLanguage = 'en';

function setup() {
  // Canvas creation
  let viewportFrameEl = document.getElementById('viewport-frame');
  let containerWidth = viewportFrameEl.clientWidth - 40; 
  let canvasWidth = min(containerWidth, 800);
  let canvasHeight = canvasWidth * 0.75;
  
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('canvas-container');

  // Bind Native DOM Inputs
  fileInput = document.getElementById('image-upload');
  dropzone = document.getElementById('dropzone');
  widthInputVal = document.getElementById('chart-width-val');
  widthSlider = document.getElementById('chart-width-slider');
  brightnessInputVal = document.getElementById('chart-brightness-val');
  brightnessSlider = document.getElementById('chart-brightness-slider');
  contrastInputVal = document.getElementById('chart-contrast-val');
  contrastSlider = document.getElementById('chart-contrast-slider');
  smoothingInputVal = document.getElementById('chart-smoothing-val');
  smoothingSlider = document.getElementById('chart-smoothing-slider');
  calcStitchLengthInput = document.getElementById('calc-stitch-length');
  calcSkeinLengthInput = document.getElementById('calc-skein-length');
  colorModeSelect = document.getElementById('color-mode-select');
  colorLevelsInput = document.getElementById('color-levels-input');
  
  // New Advanced Features Bindings
  kuwaharaSlider = document.getElementById('kuwahara-slider');
  kuwaharaVal = document.getElementById('kuwahara-val');
  stitchAspectSelect = document.getElementById('stitch-aspect-select');
  knittingMethodSelect = document.getElementById('knitting-method-select');
  btnCopyInstructions = document.getElementById('btn-copy-instructions');
  writtenInstructionsTextarea = document.getElementById('written-instructions-textarea');
  colorDistanceSelect = document.getElementById('color-distance-select');

  bayerMatrixSelect = document.getElementById('bayer-matrix-select');
  strayStitchCheckbox = document.getElementById('stray-stitch-checkbox');
  histEqCheckbox = document.getElementById('hist-eq-checkbox');
  bilateralSlider = document.getElementById('bilateral-slider');
  bilateralVal = document.getElementById('bilateral-val');
  morphCleanupSelect = document.getElementById('morph-cleanup-select');
  rowColorLimitCheckbox = document.getElementById('row-color-limit-checkbox');
  rowColorLimitInput = document.getElementById('row-color-limit-input');

  algoParamContainer1 = document.getElementById('algo-parameter-container-1');
  algoParamLabel1 = document.getElementById('algo-parameter-label-1');
  algoParamVal1 = document.getElementById('algo-parameter-val-1');
  algoParamSlider1 = document.getElementById('algo-parameter-slider-1');
  algoParamHelp1 = document.getElementById('algo-parameter-help-1');

  algoParamContainer2 = document.getElementById('algo-parameter-container-2');
  algoParamLabel2 = document.getElementById('algo-parameter-label-2');
  algoParamVal2 = document.getElementById('algo-parameter-val-2');
  algoParamSlider2 = document.getElementById('algo-parameter-slider-2');
  algoParamHelp2 = document.getElementById('algo-parameter-help-2');



  
  // Custom Palette Bindings
  paletteSizeInput = document.getElementById('palette-size-input');
  yarnPickers = [];
  yarnPickerHexes = [];
  for (let i = 1; i <= 8; i++) {
    yarnPickers.push(document.getElementById(`yarn-color-${i}`));
    yarnPickerHexes.push(document.getElementById(`yarn-color-${i}-hex`));
  }
  yarnColor1 = yarnPickers[0];
  yarnColor2 = yarnPickers[1];
  yarnColor1Hex = yarnPickerHexes[0];
  yarnColor2Hex = yarnPickerHexes[1];

  gridCheckbox = document.getElementById('grid-checkbox');
  btnGenerate = document.getElementById('btn-generate');
  btnDownload = document.getElementById('btn-download');
  btnReset = document.getElementById('btn-reset');
  btnExportPDF = document.getElementById('btn-export-pdf');
  btnExportXLS = document.getElementById('btn-export-xls');
  symbolsCheckbox = document.getElementById('symbols-checkbox');

  // Set Default states
  widthInputVal.value = DEFAULTS.OUTPUT_WIDTH;
  widthSlider.value = DEFAULTS.OUTPUT_WIDTH;
  brightnessInputVal.value = 0;
  brightnessSlider.value = 0;
  contrastInputVal.value = 0;
  contrastSlider.value = 0;
  smoothingInputVal.value = 0;
  smoothingSlider.value = 0;
  paletteSizeInput.value = DEFAULTS.PALETTE_SIZE;
  yarnPickers.forEach((picker, i) => {
    picker.value = DEFAULTS.YARN_COLORS[i];
    yarnPickerHexes[i].textContent = DEFAULTS.YARN_COLORS[i].toUpperCase();
  });
  gridCheckbox.checked = DEFAULTS.GRID_ENABLED;
  updateVisiblePalettePickers();

  // Set advanced feature defaults
  kuwaharaSlider.value = 0;
  kuwaharaVal.value = 0;
  stitchAspectSelect.value = "1.0";
  knittingMethodSelect.value = "flat";
  colorDistanceSelect.value = "CIEDE2000";

  if (bayerMatrixSelect) bayerMatrixSelect.value = 4;
  if (strayStitchCheckbox) strayStitchCheckbox.checked = false;
  if (histEqCheckbox) histEqCheckbox.checked = false;
  if (bilateralSlider) { bilateralSlider.value = 0; bilateralVal.value = 0; }
  if (morphCleanupSelect) morphCleanupSelect.value = 'none';
  if (rowColorLimitCheckbox) rowColorLimitCheckbox.checked = false;
  if (rowColorLimitInput) rowColorLimitInput.value = 2;



  // Initialize Settings Cache
  cacheCurrentSettings();

  // Range Slider and input sync - with manual edit interception
  widthInputVal.addEventListener('input', () => {
    widthSlider.value = widthInputVal.value;
  });
  widthInputVal.addEventListener('change', (e) => {
    handleSettingChange(widthInputVal, parseInt(e.target.value), 'width');
  });

  widthSlider.addEventListener('input', () => {
    widthInputVal.value = widthSlider.value;
  });
  widthSlider.addEventListener('change', (e) => {
    handleSettingChange(widthSlider, parseInt(e.target.value), 'width');
  });

  // Yarn Palette sync
  yarnPickers.forEach((picker, index) => {
    picker.addEventListener('input', (e) => {
      yarnPickerHexes[index].textContent = e.target.value.toUpperCase();
    });
    picker.addEventListener('change', (e) => {
      handleSettingChange(picker, e.target.value, `yarnColor${index}`);
    });
  });

  // Palette Size sync
  paletteSizeInput.addEventListener('change', (e) => {
    let val = Math.max(2, Math.min(8, parseInt(e.target.value) || 4));
    paletteSizeInput.value = val;
    handleSettingChange(paletteSizeInput, val, 'paletteSize');
  });

  // Algorithm select dropdown sync
  colorModeSelect.addEventListener('change', (e) => {
    handleSettingChange(colorModeSelect, e.target.value, 'mode');
  });

  // Levels input sync
  colorLevelsInput.addEventListener('change', (e) => {
    handleSettingChange(colorLevelsInput, parseInt(e.target.value), 'levels');
  });

  // Brightness input & slider sync
  brightnessInputVal.addEventListener('input', () => {
    brightnessSlider.value = brightnessInputVal.value;
  });
  brightnessInputVal.addEventListener('change', (e) => {
    handleSettingChange(brightnessInputVal, parseInt(e.target.value), 'brightness');
  });
  brightnessSlider.addEventListener('input', () => {
    brightnessInputVal.value = brightnessSlider.value;
  });
  brightnessSlider.addEventListener('change', (e) => {
    handleSettingChange(brightnessSlider, parseInt(e.target.value), 'brightness');
  });

  // Contrast input & slider sync
  contrastInputVal.addEventListener('input', () => {
    contrastSlider.value = contrastInputVal.value;
  });
  contrastInputVal.addEventListener('change', (e) => {
    handleSettingChange(contrastInputVal, parseInt(e.target.value), 'contrast');
  });
  contrastSlider.addEventListener('input', () => {
    contrastInputVal.value = contrastSlider.value;
  });
  contrastSlider.addEventListener('change', (e) => {
    handleSettingChange(contrastSlider, parseInt(e.target.value), 'contrast');
  });

  // Smoothing input & slider sync
  smoothingInputVal.addEventListener('input', () => {
    smoothingSlider.value = smoothingInputVal.value;
  });
  smoothingInputVal.addEventListener('change', (e) => {
    handleSettingChange(smoothingInputVal, parseInt(e.target.value), 'smoothing');
  });
  smoothingSlider.addEventListener('input', () => {
    smoothingInputVal.value = smoothingSlider.value;
  });
  smoothingSlider.addEventListener('change', (e) => {
    handleSettingChange(smoothingSlider, parseInt(e.target.value), 'smoothing');
  });

  gridCheckbox.addEventListener('change', () => loop());
  symbolsCheckbox.addEventListener('change', () => {
    if (processedImg) {
      generateWrittenInstructions();
    }
    loop();
  });

  // Yarn Gauge Calculator input listeners
  calcStitchLengthInput.addEventListener('input', () => {
    updateLegend();
  });
  calcSkeinLengthInput.addEventListener('input', () => {
    updateLegend();
  });

  // Algo Parameter 1 input & slider sync
  if (algoParamVal1 && algoParamSlider1) {
    algoParamVal1.addEventListener('input', () => {
      algoParamSlider1.value = algoParamVal1.value;
    });
    algoParamVal1.addEventListener('change', (e) => {
      let val = parseFloat(e.target.value);
      handleSettingChange(algoParamVal1, val, 'algoParam1');
    });
    algoParamSlider1.addEventListener('input', () => {
      algoParamVal1.value = algoParamSlider1.value;
    });
    algoParamSlider1.addEventListener('change', (e) => {
      let val = parseFloat(e.target.value);
      handleSettingChange(algoParamSlider1, val, 'algoParam1');
    });
  }

  // Algo Parameter 2 input & slider sync
  if (algoParamVal2 && algoParamSlider2) {
    algoParamVal2.addEventListener('input', () => {
      algoParamSlider2.value = algoParamVal2.value;
    });
    algoParamVal2.addEventListener('change', (e) => {
      let val = parseFloat(e.target.value);
      handleSettingChange(algoParamVal2, val, 'algoParam2');
    });
    algoParamSlider2.addEventListener('input', () => {
      algoParamVal2.value = algoParamSlider2.value;
    });
    algoParamSlider2.addEventListener('change', (e) => {
      let val = parseFloat(e.target.value);
      handleSettingChange(algoParamSlider2, val, 'algoParam2');
    });
  }

  // Advanced features input listeners
  kuwaharaSlider.addEventListener('input', () => {
    kuwaharaVal.value = kuwaharaSlider.value;
  });
  kuwaharaSlider.addEventListener('change', (e) => {
    handleSettingChange(kuwaharaSlider, parseInt(e.target.value), 'kuwahara');
  });

  stitchAspectSelect.addEventListener('change', () => {
    loop();
  });

  knittingMethodSelect.addEventListener('change', () => {
    if (processedImg) {
      generateWrittenInstructions();
    }
  });

  colorDistanceSelect.addEventListener('change', (e) => {
    handleSettingChange(colorDistanceSelect, e.target.value, 'colorDistance');
  });



  if (bayerMatrixSelect) {
    bayerMatrixSelect.addEventListener('change', (e) => {
      handleSettingChange(bayerMatrixSelect, parseInt(e.target.value), 'bayerSize');
    });
  }

  if (strayStitchCheckbox) {
    strayStitchCheckbox.addEventListener('change', (e) => {
      handleSettingChange(strayStitchCheckbox, e.target.checked, 'cleanStrays');
    });
  }

  if (histEqCheckbox) {
    histEqCheckbox.addEventListener('change', (e) => {
      handleSettingChange(histEqCheckbox, e.target.checked, 'histEq');
    });
  }

  bilateralSlider.addEventListener('input', () => {
    bilateralVal.value = bilateralSlider.value;
  });
  bilateralSlider.addEventListener('change', (e) => {
    handleSettingChange(bilateralSlider, parseInt(e.target.value), 'bilateral');
  });

  if (morphCleanupSelect) {
    morphCleanupSelect.addEventListener('change', (e) => {
      handleSettingChange(morphCleanupSelect, e.target.value, 'morphCleanup');
    });
  }

  if (rowColorLimitCheckbox) {
    rowColorLimitCheckbox.addEventListener('change', (e) => {
      handleSettingChange(rowColorLimitCheckbox, e.target.checked, 'rowColorLimit');
    });
  }
  if (rowColorLimitInput) {
    rowColorLimitInput.addEventListener('change', (e) => {
      handleSettingChange(rowColorLimitInput, parseInt(e.target.value), 'rowColorMax');
    });
  }





  btnCopyInstructions.addEventListener('click', () => {
    writtenInstructionsTextarea.select();
    navigator.clipboard.writeText(writtenInstructionsTextarea.value);
    btnCopyInstructions.textContent = "Copied!";
    setTimeout(() => {
      btnCopyInstructions.textContent = "Copy Text";
    }, 2000);
  });

  // Action Buttons
  if (btnGenerate) {
    btnGenerate.addEventListener('click', () => {
      handleSettingChange(btnGenerate, null, 'regenerate');
    });
  }
  btnDownload.addEventListener('click', saveChart);
  btnExportPDF.addEventListener('click', exportPDF);
  btnExportXLS.addEventListener('click', exportXLS);
  btnReset.addEventListener('click', handleResetClick);



  // File Upload Handlers (Standard and drag-and-drop)
  fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      processUploadedFile(e.target.files[0]);
    }
  });

  dropzone.addEventListener('click', () => {
    fileInput.click();
  });

  dropzone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropzone.classList.add('dragover');
  });

  dropzone.addEventListener('dragleave', () => {
    dropzone.classList.remove('dragover');
  });

  dropzone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropzone.classList.remove('dragover');
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processUploadedFile(e.dataTransfer.files[0]);
    }
  });

  // Viewport Upload Prompt (primary upload zone on the canvas preview area)
  let viewportPrompt = document.getElementById('viewport-upload-prompt');
  let viewportFrame = document.getElementById('viewport-frame');

  if (viewportPrompt) {
    // Click on the prompt opens file picker
    viewportPrompt.addEventListener('click', () => {
      fileInput.click();
    });

    // Drag-over on the prompt
    viewportPrompt.addEventListener('dragover', (e) => {
      e.preventDefault();
      viewportPrompt.classList.add('dragover');
    });

    viewportPrompt.addEventListener('dragleave', () => {
      viewportPrompt.classList.remove('dragover');
    });

    viewportPrompt.addEventListener('drop', (e) => {
      e.preventDefault();
      viewportPrompt.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });
  }

  // Also allow drag-and-drop on the viewport frame itself (even after an image is loaded)
  if (viewportFrame) {
    viewportFrame.addEventListener('dragover', (e) => {
      e.preventDefault();
      if (viewportPrompt && !viewportPrompt.classList.contains('hidden')) return; // prompt handles it
      viewportFrame.classList.add('dragover');
    });

    viewportFrame.addEventListener('dragleave', (e) => {
      // Only remove if leaving the viewport entirely (not entering a child)
      if (!viewportFrame.contains(e.relatedTarget)) {
        viewportFrame.classList.remove('dragover');
      }
    });

    viewportFrame.addEventListener('drop', (e) => {
      e.preventDefault();
      viewportFrame.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        processUploadedFile(e.dataTransfer.files[0]);
      }
    });
  }

  let btnRemoveFile = document.getElementById('btn-remove-file');
  if (btnRemoveFile) {
    btnRemoveFile.addEventListener('click', () => {
      executeRemoveImage();
    });
  }

  let btnRemoveCanvas = document.getElementById('btn-remove-image-canvas');
  if (btnRemoveCanvas) {
    btnRemoveCanvas.addEventListener('click', () => {
      executeRemoveImage();
    });
  }

  let btnChangeCanvas = document.getElementById('btn-change-image-canvas');
  if (btnChangeCanvas) {
    btnChangeCanvas.addEventListener('click', () => {
      fileInput.click();
    });
  }



  // Collapsible Step Cards Event Delegation (Targeting the step header or legend header)
  document.addEventListener('click', (e) => {
    // If the click is on an interactive element (like the copy instructions button), do not toggle collapse
    if (e.target.closest('button, input, select, textarea')) {
      return;
    }
    
    let header = e.target.closest('.step-header, .legend-header');
    if (header) {
      let card = header.closest('.step-card, .legend-card');
      if (card && !card.classList.contains('disabled')) {
        card.classList.toggle('collapsed');
      }
    }
  });

  // Mobile Settings Drawer toggle listeners
  let btnToggleDrawer = document.getElementById('btn-toggle-drawer');
  let btnCloseDrawer = document.getElementById('btn-close-drawer');
  let drawerBackdrop = document.getElementById('drawer-backdrop');
  let sidebarPanel = document.querySelector('.sidebar-panel');

  if (btnToggleDrawer && sidebarPanel && drawerBackdrop) {
    btnToggleDrawer.addEventListener('click', () => {
      sidebarPanel.classList.add('active');
      drawerBackdrop.classList.add('active');
      document.body.classList.add('drawer-open');
    });
  }

  const closeDrawer = () => {
    if (sidebarPanel) sidebarPanel.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');
    document.body.classList.remove('drawer-open');
  };

  if (btnCloseDrawer) {
    btnCloseDrawer.addEventListener('click', closeDrawer);
  }
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener('click', closeDrawer);
  }

  // Canvas Font and alignments
  textFont('Outfit');
  textAlign(CENTER, CENTER);
  textSize(16);
  // Language Selectors Sync and Init
  let langSelectDesktop = document.getElementById('lang-select-desktop');
  let langSelectMobile = document.getElementById('lang-select-mobile');

  function syncAndSetLanguage(lang) {
    if (langSelectDesktop) langSelectDesktop.value = lang;
    if (langSelectMobile) langSelectMobile.value = lang;
    localStorage.setItem('knitting-chart-lang', lang);
    setLanguage(lang);
  }

  if (langSelectDesktop) {
    langSelectDesktop.addEventListener('change', (e) => {
      syncAndSetLanguage(e.target.value);
    });
  }
  if (langSelectMobile) {
    langSelectMobile.addEventListener('change', (e) => {
      syncAndSetLanguage(e.target.value);
    });
  }

  // Restore saved language
  let savedLang = localStorage.getItem('knitting-chart-lang') || 'en';
  syncAndSetLanguage(savedLang);

  toggleConditionalFields();
}

function draw() {
  // Clear background with soft warm tint matching CSS bg
  background(247, 244, 238); 

  if (processedImg) {
    let params = getGridParams();

    let adjustedGrid = [];
    if (symbolsCheckbox.checked) {
      adjustedGrid = getAdjustedSymbols();
    }

    // Render the stitches as a single scaled image (extremely fast!)
    push();
    noSmooth();
    image(processedImg, params.offsetX, params.offsetY, processedImg.width * params.cellSizeX, processedImg.height * params.cellSizeY);
    pop();

    // Render grid lines if enabled (much faster than individual cell borders)
    if (gridCheckbox.checked) {
      stroke(185, 178, 168); // Soft warm grey stitch outlines
      strokeWeight(0.5);
      
      // Vertical lines
      for (let x = 0; x <= processedImg.width; x++) {
        let lx = params.offsetX + x * params.cellSizeX;
        line(lx, params.offsetY, lx, params.offsetY + processedImg.height * params.cellSizeY);
      }
      
      // Horizontal lines
      for (let y = 0; y <= processedImg.height; y++) {
        let ly = params.offsetY + y * params.cellSizeY;
        line(params.offsetX, ly, params.offsetX + processedImg.width * params.cellSizeX, ly);
      }
    }

    // Render symbols if enabled and cell size is readable
    if (symbolsCheckbox.checked && adjustedGrid && params.cellSizeY >= 3 && params.cellSizeX >= 3) {
      processedImg.loadPixels();
      for (let y = 0; y < processedImg.height; y++) {
        if (!adjustedGrid[y]) continue;
        for (let x = 0; x < processedImg.width; x++) {
          let symbol = adjustedGrid[y][x] || 'none';
          if (symbol !== 'none') {
            let cx = params.offsetX + x * params.cellSizeX;
            let cy = params.offsetY + y * params.cellSizeY;
            let idx = (x + y * processedImg.width) * 4;
            let r = processedImg.pixels[idx];
            let g = processedImg.pixels[idx+1];
            let b = processedImg.pixels[idx+2];
            drawStitchSymbol(symbol, cx, cy, params.cellSizeX, params.cellSizeY, r, g, b);
          }
        }
      }
    }


  } else {
    fill(100, 117, 109); // slate-muted text
    noStroke();
    text(APP_STRINGS.CANVAS_EMPTY, width / 2, height / 2);
  }
  
  noLoop(); 
}

function drawStitchSymbol(symbol, cx, cy, szX, szY, r, g, b) {
  push();
  
  // Calculate contrast color: light background -> charcoal symbol; dark background -> white symbol
  let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
  let symbolColor = luminance < 128 ? color(255) : color(44, 53, 49);
  
  stroke(symbolColor);
  fill(symbolColor);
  
  let centerX = cx + szX / 2;
  let centerY = cy + szY / 2;
  let sz = min(szX, szY);
  
  if (symbol === 'purl') {
    // Solid dot in center
    noStroke();
    ellipse(centerX, centerY, Math.max(1.5, sz * 0.22), Math.max(1.5, sz * 0.22));
  } 
  else if (symbol === 'yo') {
    // Open circle in center
    noFill();
    strokeWeight(Math.max(1, sz * 0.08));
    ellipse(centerX, centerY, Math.max(2.5, sz * 0.45), Math.max(2.5, sz * 0.45));
  } 
  else if (symbol === 'k2tog') {
    // Diagonal right-leaning line (bottom-left to top-right)
    noFill();
    strokeWeight(Math.max(1, sz * 0.08));
    let padX = szX * 0.25;
    let padY = szY * 0.25;
    line(cx + padX, cy + szY - padY, cx + szX - padX, cy + padY);
  } 
  else if (symbol === 'ssk') {
    // Diagonal left-leaning line (top-left to bottom-right)
    noFill();
    strokeWeight(Math.max(1, sz * 0.08));
    let padX = szX * 0.25;
    let padY = szY * 0.25;
    line(cx + padX, cy + padY, cx + szX - padX, cy + szY - padY);
  }
  
  pop();
}

function getAdjustedSymbols() {
  if (!processedImg) return [];


  let cols = processedImg.width;
  let rows = processedImg.height;
  let grid = [];
  
  processedImg.loadPixels();
  
  // Step 1: Build the base symbol grid from color pixels
  for (let y = 0; y < rows; y++) {
    let row = [];
    for (let x = 0; x < cols; x++) {
      let idx = (x + y * cols) * 4;
      let r = processedImg.pixels[idx];
      let g = processedImg.pixels[idx+1];
      let b = processedImg.pixels[idx+2];
      let hex = rgbToHex(r, g, b);
      let cellKey = `${x},${y}`;
      let baseSymbol = symbolMap[cellKey] || symbolMap[hex] || 'none';
      row.push(baseSymbol);
    }
    grid.push(row);
  }
  
  // Helpers
  let isDecrease = (sym) => sym === 'k2tog' || sym === 'ssk';
  let isLace = (sym) => sym === 'yo' || isDecrease(sym);
  let isKnitPurl = (sym) => sym === 'none' || sym === 'purl';

  // Step 2: Apply the knitting lace adjustment rules row-by-row
  for (let y = 0; y < rows; y++) {
    let row = grid[y];
    let N = row.length;
    let paired = new Uint8Array(N);
    
    // Pass 1: Resolve adjacent YOs by converting the second one to k2tog to form a valid pair
    for (let x = 0; x < N - 1; x++) {
      if (row[x] === 'yo' && row[x + 1] === 'yo') {
        row[x + 1] = 'k2tog';
        paired[x] = 1;
        paired[x + 1] = 1;
        x++; // Skip checking the newly converted decrease
      }
    }
    
    // Pass 2a: Mark already existing valid pairs
    for (let x = 0; x < N - 1; x++) {
      if (!paired[x] && !paired[x + 1]) {
        let s1 = row[x];
        let s2 = row[x + 1];
        
        let isYoDec = (s1 === 'yo' && isDecrease(s2));
        let isDecYo = (isDecrease(s1) && s2 === 'yo');
        
        if (isYoDec || isDecYo) {
          paired[x] = 1;
          paired[x + 1] = 1;
          x++; // Skip checking the second item of the pair
        }
      }
    }
    
    // Pass 2b: Pair up unpaired decreases and yarnovers by converting adjacent Knit/Purl cells
    for (let x = 0; x < N; x++) {
      if (!paired[x] && isLace(row[x])) {
        let sym = row[x];
        if (sym === 'yo') {
          // Needs a decrease adjacent to it. Prefer converting right neighbor, then left.
          if (x + 1 < N && !paired[x + 1] && isKnitPurl(row[x + 1])) {
            row[x + 1] = 'k2tog';
            paired[x] = 1;
            paired[x + 1] = 1;
          } else if (x - 1 >= 0 && !paired[x - 1] && isKnitPurl(row[x - 1])) {
            row[x - 1] = 'ssk';
            paired[x] = 1;
            paired[x - 1] = 1;
          }
        } else if (isDecrease(sym)) {
          // Needs a YO adjacent to it. Prefer converting right neighbor, then left.
          if (x + 1 < N && !paired[x + 1] && isKnitPurl(row[x + 1])) {
            row[x + 1] = 'yo';
            paired[x] = 1;
            paired[x + 1] = 1;
          } else if (x - 1 >= 0 && !paired[x - 1] && isKnitPurl(row[x - 1])) {
            row[x - 1] = 'yo';
            paired[x] = 1;
            paired[x - 1] = 1;
          }
        }
      }
    }
    
    // Pass 3: Final cleanup - revert any still unpaired lace symbols to 'none'
    for (let x = 0; x < N; x++) {
      if (isLace(row[x]) && !paired[x]) {
        row[x] = 'none';
      }
    }
  }
  
  return grid;
}

function windowResized() {
  let viewportFrameEl = document.getElementById('viewport-frame');
  let containerWidth = viewportFrameEl.clientWidth - 40;
  let canvasWidth = min(containerWidth, 800);
  let canvasHeight = canvasWidth * 0.75;
  resizeCanvas(canvasWidth, canvasHeight);
  loop();
}




function getGridParams() {
  if (!processedImg) return null;
  let aspect = (stitchAspectSelect && parseFloat(stitchAspectSelect.value)) || 1.0;
  let cellW = width / (processedImg.width * aspect);
  let cellH = height / processedImg.height;
  let cellSize = min(cellW, cellH) * 0.88; 
  let cellSizeX = cellSize * aspect;
  let cellSizeY = cellSize;
  let offsetX = (width - processedImg.width * cellSizeX) / 2;
  let offsetY = (height - processedImg.height * cellSizeY) / 2;
  return { cellSize, cellSizeX, cellSizeY, offsetX, offsetY };
}



// ==========================================================================
// WARN AND CONFIRM REGENERATION INTERCEPTORS
// ==========================================================================

function cacheCurrentSettings() {
  currentSettings = {
    width: parseInt(widthInputVal.value),
    color1: yarnColor1.value,
    color2: yarnColor2.value,
    mode: colorModeSelect.value,
    levels: parseInt(colorLevelsInput.value),
    brightness: parseInt(brightnessInputVal.value),
    contrast: parseInt(contrastInputVal.value),
    smoothing: parseInt(smoothingInputVal.value),
    paletteSize: parseInt(paletteSizeInput.value),
    yarnColors: yarnPickers.map(p => p.value),
    kuwahara: parseInt(kuwaharaSlider.value),
    colorDistance: colorDistanceSelect.value,

    bayerSize: bayerMatrixSelect ? parseInt(bayerMatrixSelect.value) : 4,
    cleanStrays: strayStitchCheckbox ? strayStitchCheckbox.checked : false,
    histEq: histEqCheckbox ? histEqCheckbox.checked : false,
    bilateral: bilateralSlider ? parseInt(bilateralSlider.value) : 0,
    morphCleanup: morphCleanupSelect ? morphCleanupSelect.value : 'none',
    rowColorLimit: rowColorLimitCheckbox ? rowColorLimitCheckbox.checked : false,
    rowColorMax: rowColorLimitInput ? parseInt(rowColorLimitInput.value) : 2,
    algoParam1: algoParamVal1 ? parseFloat(algoParamVal1.value) : null,
    algoParam2: algoParamVal2 ? parseFloat(algoParamVal2.value) : null
  };
}

function handleSettingChange(inputEl, value, propertyName) {
  applySettingValue(propertyName, value);
  generateChart();
}

function applySettingValue(propertyName, value) {
  if (propertyName === 'width') {
    widthInputVal.value = value;
    widthSlider.value = value;
  } else if (propertyName === 'color1') {
    yarnColor1.value = value;
    yarnColor1Hex.textContent = value.toUpperCase();
  } else if (propertyName === 'color2') {
    yarnColor2.value = value;
    yarnColor2Hex.textContent = value.toUpperCase();
  } else if (propertyName === 'mode') {
    colorModeSelect.value = value;
    toggleConditionalFields();
  } else if (propertyName === 'levels') {
    colorLevelsInput.value = value;
  } else if (propertyName === 'brightness') {
    brightnessInputVal.value = value;
    brightnessSlider.value = value;
  } else if (propertyName === 'contrast') {
    contrastInputVal.value = value;
    contrastSlider.value = value;
  } else if (propertyName === 'smoothing') {
    smoothingInputVal.value = value;
    smoothingSlider.value = value;
  } else if (propertyName === 'paletteSize') {
    paletteSizeInput.value = value;
    updateVisiblePalettePickers();
  } else if (propertyName.startsWith('yarnColor')) {
    let index = parseInt(propertyName.replace('yarnColor', ''));
    yarnPickers[index].value = value;
    yarnPickerHexes[index].textContent = value.toUpperCase();
  } else if (propertyName === 'kuwahara') {
    kuwaharaSlider.value = value;
    kuwaharaVal.value = value;
  } else if (propertyName === 'colorDistance') {
    colorDistanceSelect.value = value;

  } else if (propertyName === 'bayerSize') {
    if (bayerMatrixSelect) bayerMatrixSelect.value = value;
  } else if (propertyName === 'cleanStrays') {
    if (strayStitchCheckbox) strayStitchCheckbox.checked = value;
  } else if (propertyName === 'histEq') {
    if (histEqCheckbox) histEqCheckbox.checked = value;
  } else if (propertyName === 'bilateral') {
    if (bilateralSlider) { bilateralSlider.value = value; bilateralVal.value = value; }
  } else if (propertyName === 'morphCleanup') {
    if (morphCleanupSelect) morphCleanupSelect.value = value;
  } else if (propertyName === 'rowColorLimit') {
    if (rowColorLimitCheckbox) rowColorLimitCheckbox.checked = value;
  } else if (propertyName === 'rowColorMax') {
    if (rowColorLimitInput) rowColorLimitInput.value = value;
  } else if (propertyName === 'algoParam1') {
    let mode = colorModeSelect.value;
    if (ALGO_PARAMS[mode] && ALGO_PARAMS[mode].param1) {
      ALGO_PARAMS[mode].param1.value = value;
      if (algoParamVal1) algoParamVal1.value = value;
      if (algoParamSlider1) algoParamSlider1.value = value;
    }
  } else if (propertyName === 'algoParam2') {
    let mode = colorModeSelect.value;
    if (ALGO_PARAMS[mode] && ALGO_PARAMS[mode].param2) {
      ALGO_PARAMS[mode].param2.value = value;
      if (algoParamVal2) algoParamVal2.value = value;
      if (algoParamSlider2) algoParamSlider2.value = value;
    }
  }
}



function handleResetClick() {
  resetApp();
}

// ==========================================================================
// UPLOADER LOGIC
// ==========================================================================

function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(',');
  let mimeMatch = arr[0].match(/:(.*?);/);
  let mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';
  let bstr = atob(arr[1]);
  let n = bstr.length;
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

function isBase64(str) {
  if (typeof str !== 'string') return false;
  let cleaned = str.trim().replace(/\s/g, '');
  let regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/;
  if (!regex.test(cleaned)) return false;
  try {
    return btoa(atob(cleaned)) === cleaned;
  } catch (err) {
    return false;
  }
}

function processUploadedFile(file) {
  // Check if file is a base64 data URL or raw base64 string
  if (typeof file === 'string') {
    if (file.startsWith('data:')) {
      try {
        let blob = dataURLtoBlob(file);
        let mime = blob.type || 'image/jpeg';
        let ext = mime.split('/')[1] || 'jpg';
        file = new File([blob], "uploaded_image." + ext, { type: mime });
      } catch (e) {
        console.error("Failed to parse base64 data URL:", e);
        alert(APP_STRINGS.ALERT_INVALID_BASE64);
        return;
      }
    } else if (isBase64(file)) {
      try {
        let binary = atob(file.trim().replace(/\s/g, ''));
        let array = [];
        for (let i = 0; i < binary.length; i++) {
          array.push(binary.charCodeAt(i));
        }
        let blob = new Blob([new Uint8Array(array)], { type: 'image/jpeg' });
        file = new File([blob], "uploaded_image.jpg", { type: 'image/jpeg' });
      } catch (e) {
        console.error("Failed to parse raw base64 string:", e);
        alert(APP_STRINGS.ALERT_INVALID_BASE64);
        return;
      }
    } else {
      alert(APP_STRINGS.ALERT_INVALID_FORMAT);
      return;
    }
  }

  let isImage = file.type && file.type.startsWith('image/');
  let isHeic = file.name && (file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif'));
  
  if (isImage || isHeic) {
    if (isHeic) {
      convertHeicAndUpload(file);
    } else {
      executeUpload(file);
    }
  } else {
    alert(APP_STRINGS.ALERT_WRONG_TYPE);
  }
}

function convertHeicAndUpload(file) {
  showLoader();
  
  if (typeof HeicTo === 'undefined') {
    alert(APP_STRINGS.ALERT_HEIC_NOT_LOADED);
    hideLoader();
    return;
  }
  
  // Explicitly wrap in image/heic blob if type is missing or generic
  let heicBlob = file;
  if (!file.type || file.type === "application/octet-stream" || file.type === "") {
    heicBlob = new Blob([file], { type: "image/heic" });
  }
  
  HeicTo({
    blob: heicBlob,
    type: "image/jpeg",
    quality: 0.8
  })
  .then((conversionResult) => {
    let blob = Array.isArray(conversionResult) ? conversionResult[0] : conversionResult;
    let newFilename = file.name ? (file.name.substring(0, file.name.lastIndexOf('.')) + '.jpg') : 'converted.jpg';
    let convertedFile = new File([blob], newFilename, { type: 'image/jpeg' });
    
    hideLoader();
    executeUpload(convertedFile);
  })
  .catch((error) => {
    console.error("HEIC conversion failed:", error);
    hideLoader();
    alert(APP_STRINGS.ALERT_HEIC_FAILED);
  });
}

function executeUpload(file) {
  let reader = new FileReader();
  reader.onload = (e) => {
    loadImage(e.target.result, (loadedImg) => {
      // Downscale image if too large (e.g. max 1000px) to prevent memory & processing lag
      let maxDim = 1000;
      if (loadedImg.width > maxDim || loadedImg.height > maxDim) {
        let scale = maxDim / Math.max(loadedImg.width, loadedImg.height);
        let w = Math.round(loadedImg.width * scale);
        let h = Math.round(loadedImg.height * scale);
        let temp = createImage(w, h);
        temp.copy(loadedImg, 0, 0, loadedImg.width, loadedImg.height, 0, 0, w, h);
        loadedImg = temp;
      }

      img = loadedImg;
      
      processedImg = null;
      
      // Populate Thumbnail details
      document.getElementById('thumbnail-img').src = e.target.result;
      document.getElementById('status-filename').textContent = file.name;
      document.getElementById('status-filesize').textContent = formatBytes(file.size);
      
      updateStepCardsState(true);
      generateChart();
    }, (err) => {
      console.error("Image loading error", err);
      alert(APP_STRINGS.ALERT_LOAD_FAILED);
    });
  };
  reader.onerror = (err) => {
    console.error("FileReader error", err);
  };
  reader.readAsDataURL(file);
}

function executeRemoveImage() {
  img = null;
  updateStepCardsState(false);
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  let k = 1024;
  let sizes = ['Bytes', 'KB', 'MB'];
  let i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}




// [NOTE: Image processing filters moved to filters.js]

// ==========================================================================
// CHART GENERATOR ENGINE
// ==========================================================================

function generateChart() {
  if (!img) {
    alert(APP_STRINGS.ALERT_NO_IMAGE);
    return;
  }

  let targetW = parseInt(widthInputVal.value);
  if (isNaN(targetW) || targetW < 10) {
    alert(APP_STRINGS.ALERT_BAD_WIDTH);
    return;
  }

  showLoader();

  setTimeout(() => {


    let ratio = img.height / img.width;
    let targetH = Math.floor(targetW * ratio);

    processedImg = createImage(targetW, targetH);
    processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);
    processedImg.loadPixels();

    // Apply Brightness & Contrast pre-processing
    let brightness = parseInt(brightnessInputVal.value) || 0;
    let contrast = parseInt(contrastInputVal.value) || 0;
    applyBrightnessContrast(processedImg, brightness, contrast);

    // Apply Histogram Equalization if enabled
    if (histEqCheckbox && histEqCheckbox.checked) {
      applyHistogramEqualization(processedImg);
    }

    // Apply Bilateral Filter
    let bilateralRadius = bilateralSlider ? parseInt(bilateralSlider.value) : 0;
    if (bilateralRadius > 0) {
      applyBilateralFilter(processedImg, bilateralRadius);
    }

    // Apply Kuwahara Filter
    let kuwaharaRadius = kuwaharaSlider ? parseInt(kuwaharaSlider.value) : 0;
    if (kuwaharaRadius > 0) {
      applyKuwaharaFilter(processedImg, kuwaharaRadius);
    }

    // Apply Anti-Confetti (Smoothing) filter
    let smoothingRadius = parseInt(smoothingInputVal.value) || 0;
    if (smoothingRadius > 0) {
      applySmoothingFilter(processedImg, smoothingRadius);
    }

    // Dithering and color reduction algorithms
    let mode = colorModeSelect.value;
    if (mode === APP_STRINGS.MODE_BW) {
      applyThreshold(processedImg);
    }
    else if (mode === APP_STRINGS.MODE_POSTERIZE) {
      let levels = parseInt(colorLevelsInput.value);
      if (isNaN(levels) || levels < 2) levels = 2;
      applyPosterize(processedImg, levels);
    }
    else if (mode === APP_STRINGS.MODE_KMEANS) {
      let levels = parseInt(colorLevelsInput.value);
      if (isNaN(levels) || levels < 2) levels = 2;
      applyKMeans(processedImg, levels);
    }
    else if (mode === APP_STRINGS.MODE_BAYER) {
      applyBayerDithering(processedImg, false);
    }
    else if (mode === APP_STRINGS.MODE_FLOYD) {
      applyFloydSteinberg(processedImg, true);
    }
    else if (mode === APP_STRINGS.MODE_ATKINSON) {
      applyAtkinson(processedImg, true);
    }
    else if (mode === APP_STRINGS.MODE_STUCKI) {
      applyStucki(processedImg, true);
    }
    else if (mode === APP_STRINGS.MODE_BURKES) {
      applyBurkes(processedImg, true);
    }
    else if (mode === APP_STRINGS.MODE_SIERRA) {
      applySierra(processedImg, true);
    }
    else if (mode === APP_STRINGS.MODE_JJN) {
      applyJJN(processedImg, true);
    } 
    else if (mode === APP_STRINGS.MODE_BLUE_NOISE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyBlueNoiseDithering(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_PALETTE_MAPPING) {
      applyCustomPaletteMapping(processedImg, getActiveCustomColors());
    } 
    else if (mode === APP_STRINGS.MODE_OCTREE) {
      let levels = parseInt(colorLevelsInput.value);
      if (isNaN(levels) || levels < 2) levels = 2;
      if (levels > 255) levels = 255;
      applyOctreeQuantization(processedImg, levels);
    }
    else if (mode === APP_STRINGS.MODE_BILATERAL_MODE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyBilateralMode(processedImg, p1, p2, getActiveCustomColors());
    }
    else if (mode === APP_STRINGS.MODE_VECTOR_QUANTIZATION) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyVectorQuantization(processedImg, p1, p2, getActiveCustomColors());
    }
    else if (mode === APP_STRINGS.MODE_HALFTONE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyHalftone(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_GLITCH) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyGlitch(processedImg, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_RIPPLE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyRippleHalftone(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_HATCH) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyCrossHatch(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_STENCIL) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyOffsetStencil(processedImg, yarnColor1.value, yarnColor2.value, yarnPickers[2].value, p1);
    }
    else if (mode === APP_STRINGS.MODE_SHADOW) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyShadowIllusion(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_BARGELLO) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyBargelloWave(processedImg, yarnColor1.value, yarnColor2.value, yarnPickers[2].value, yarnPickers[3].value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_STAINED_GLASS) {
      applyStainedGlass(processedImg, yarnColor1.value, yarnColor2.value, yarnPickers[2].value, yarnPickers[3].value, yarnPickers[4].value);
    }
    else if (mode === APP_STRINGS.MODE_COMIC) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyComicHalftone(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_WAVES) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyContourWaves(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_MAZE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyTruchetMaze(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_STIPPLING) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyInkStippling(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_CABLERIB) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyCableRibIllusion(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_HERRINGBONE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyHerringboneHatch(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_VORONOI) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyVoronoiMosaic(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_MOIRE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyMoireOpArt(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_SPIRAL) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applySpiralHalftone(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_HOUNDSTOOTH) {
      applyHoundstoothCheck(processedImg, yarnColor1.value, yarnColor2.value);
    }
    else if (mode === APP_STRINGS.MODE_TURING) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyTuringPattern(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_AUTOMATA) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      applyCellularAutomata(processedImg, yarnColor1.value, yarnColor2.value, p1);
    }
    else if (mode === APP_STRINGS.MODE_LAPLACIAN) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyLaplacianEdge(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_CANNY) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyCannyEdge(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_LOG) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyLaplacianOfGaussian(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_MEDIAN_OTSU) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyMedianOtsu(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_CONTOUR) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyContourTracing(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_DOG) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyDifferenceOfGaussians(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_SOBEL) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applySobelOperator(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_ADAPTIVE_THRESHOLD) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyAdaptiveThresholding(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_HPF) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyHighPassFilter(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_PREWITT) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyPrewittFilter(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_SUPERPIXELS) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applySuperpixels(processedImg, p1, p2, getActiveCustomColors());
    }
    else if (mode === APP_STRINGS.MODE_ANISOTROPIC) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyAnisotropicDiffusion(processedImg, p1, p2, getActiveCustomColors());
    }
    else if (mode === APP_STRINGS.MODE_DOM) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyDifferenceOfMedians(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }
    else if (mode === APP_STRINGS.MODE_RIDGE) {
      let p1 = ALGO_PARAMS[mode].param1.value;
      let p2 = ALGO_PARAMS[mode].param2.value;
      applyBinarizationRidgeDetection(processedImg, yarnColor1.value, yarnColor2.value, p1, p2);
    }

    // Clean Stray Stitches (Confetti Cleaner) if enabled
    if (strayStitchCheckbox && strayStitchCheckbox.checked) {
      applyStrayStitchCleaner(processedImg);
    }

    // Morphological Cleanup
    if (morphCleanupSelect && morphCleanupSelect.value !== 'none') {
      applyMorphologicalCleanup(processedImg, morphCleanupSelect.value);
    }

    // Row-by-Row Color Limit
    if (rowColorLimitCheckbox && rowColorLimitCheckbox.checked) {
      let maxColors = rowColorLimitInput ? parseInt(rowColorLimitInput.value) : 2;
      applyRowColorLimit(processedImg, maxColors);
    }



    // Save current states into setting cache
    cacheCurrentSettings();

    // Enable download button and update chart stats info
    btnDownload.removeAttribute('disabled');
    btnExportPDF.removeAttribute('disabled');
    btnExportXLS.removeAttribute('disabled');
    let filename = document.getElementById('status-filename') ? document.getElementById('status-filename').textContent : '';
    let infoText = `${processedImg.width} × ${processedImg.height} stitches`;
    if (filename) {
      infoText = `${filename} (${infoText})`;
    }
    document.getElementById('chart-info-tag').textContent = infoText;

    // Draw & updates the Yarn Legend
    updateLegend();

    // Generate written instructions
    generateWrittenInstructions();

    // Close mobile settings drawer
    let sidebarPanel = document.querySelector('.sidebar-panel');
    let drawerBackdrop = document.getElementById('drawer-backdrop');
    if (sidebarPanel) sidebarPanel.classList.remove('active');
    if (drawerBackdrop) drawerBackdrop.classList.remove('active');

    loop(); 
    hideLoader();
  }, 50);
}

function saveChart() {
  if (processedImg) {
    processedImg.save(APP_STRINGS.FILENAME, 'png');
  } else {
    alert(APP_STRINGS.ALERT_NO_CHART);
  }
}


// [NOTE: Exporters moved to exporters.js]


function resetApp() {
  img = null;
  processedImg = null;
  symbolMap = {};
  
  // Reset all DOM structures
  widthInputVal.value = DEFAULTS.OUTPUT_WIDTH;
  widthSlider.value = DEFAULTS.OUTPUT_WIDTH;
  brightnessInputVal.value = 0;
  brightnessSlider.value = 0;
  contrastInputVal.value = 0;
  contrastSlider.value = 0;
  smoothingInputVal.value = 0;
  smoothingSlider.value = 0;
  calcStitchLengthInput.value = 3.0;
  calcSkeinLengthInput.value = 200;
  colorModeSelect.value = APP_STRINGS.MODE_BAYER;
  colorLevelsInput.value = 4;
  
  paletteSizeInput.value = DEFAULTS.PALETTE_SIZE;
  yarnPickers.forEach((picker, i) => {
    picker.value = DEFAULTS.YARN_COLORS[i];
    yarnPickerHexes[i].textContent = DEFAULTS.YARN_COLORS[i].toUpperCase();
  });
  gridCheckbox.checked = DEFAULTS.GRID_ENABLED;
  symbolsCheckbox.checked = false;
  
  updateVisiblePalettePickers();

  // Reset advanced features
  kuwaharaSlider.value = 0;
  kuwaharaVal.value = 0;
  stitchAspectSelect.value = "1.0";
  knittingMethodSelect.value = "flat";
  colorDistanceSelect.value = "CIEDE2000";

  if (bayerMatrixSelect) bayerMatrixSelect.value = 4;
  if (strayStitchCheckbox) strayStitchCheckbox.checked = false;
  if (histEqCheckbox) histEqCheckbox.checked = false;
  if (bilateralSlider) { bilateralSlider.value = 0; bilateralVal.value = 0; }
  if (morphCleanupSelect) morphCleanupSelect.value = 'none';
  if (rowColorLimitCheckbox) rowColorLimitCheckbox.checked = false;
  if (rowColorLimitInput) rowColorLimitInput.value = 2;

  
  let patternTitleInput = document.getElementById('pdf-pattern-title');
  if (patternTitleInput) {
    patternTitleInput.value = "My Knitting Project";
  }

  // Re-sync cache
  cacheCurrentSettings();
  
  toggleConditionalFields();
  updateStepCardsState(false);
}

function updateStepCardsState(hasImage) {
  let cardDimensions = document.getElementById('step-card-dimensions');
  let cardColors = document.getElementById('step-card-colors');
  let cardActions = document.getElementById('step-card-actions');
  let cardWritten = document.getElementById('step-card-written-instructions');
  let dropzoneEl = document.getElementById('dropzone');
  let uploadStatusBox = document.getElementById('upload-status-box');
  let btnChange = document.getElementById('btn-change-image-canvas');
  let btnRemove = document.getElementById('btn-remove-image-canvas');

  if (hasImage) {
    if (cardDimensions) cardDimensions.classList.remove('disabled');
    if (cardColors) cardColors.classList.remove('disabled');
    if (cardActions) cardActions.classList.remove('disabled');
    if (btnGenerate) btnGenerate.removeAttribute('disabled');
    
    // Smart collapse/expand: expand active workflow steps
    if (cardDimensions) cardDimensions.classList.remove('collapsed');
    if (cardColors) cardColors.classList.remove('collapsed');
    if (cardActions) cardActions.classList.remove('collapsed');
    
    if (cardWritten) {
      cardWritten.classList.remove('disabled');
      cardWritten.style.opacity = '1';
      cardWritten.style.pointerEvents = 'auto';
    }
    
    if (dropzoneEl) dropzoneEl.style.display = 'none';
    if (uploadStatusBox) uploadStatusBox.style.display = 'flex';

    // Hide viewport upload prompt since image is loaded
    let vpPrompt = document.getElementById('viewport-upload-prompt');
    if (vpPrompt) vpPrompt.classList.add('hidden');

    // Show change/remove buttons on preview toolbar
    if (btnChange) btnChange.style.display = 'inline-flex';
    if (btnRemove) btnRemove.style.display = 'inline-flex';
  } else {
    if (cardDimensions) cardDimensions.classList.add('disabled');
    if (cardColors) cardColors.classList.add('disabled');
    if (cardActions) cardActions.classList.add('disabled');
    if (btnGenerate) btnGenerate.setAttribute('disabled', 'true');
    btnDownload.setAttribute('disabled', 'true');
    btnExportPDF.setAttribute('disabled', 'true');
    btnExportXLS.setAttribute('disabled', 'true');
    
    // Reset collapse states: collapse disabled steps
    if (cardDimensions) cardDimensions.classList.add('collapsed');
    if (cardColors) cardColors.classList.add('collapsed');
    if (cardActions) cardActions.classList.add('collapsed');
    
    if (cardWritten) {
      cardWritten.classList.add('disabled');
      cardWritten.style.opacity = '0.5';
      cardWritten.style.pointerEvents = 'none';
      if (writtenInstructionsTextarea) writtenInstructionsTextarea.value = '';
      if (btnCopyInstructions) btnCopyInstructions.setAttribute('disabled', 'true');
    }
    
    if (dropzoneEl) dropzoneEl.style.display = 'block';
    if (uploadStatusBox) uploadStatusBox.style.display = 'none';
    if (fileInput) fileInput.value = '';

    // Show viewport upload prompt
    let vpPrompt = document.getElementById('viewport-upload-prompt');
    if (vpPrompt) vpPrompt.classList.remove('hidden');

    // Hide change/remove buttons on preview toolbar
    if (btnChange) btnChange.style.display = 'none';
    if (btnRemove) btnRemove.style.display = 'none';
    
    // Reset thumbnail and status text
    let thumbImg = document.getElementById('thumbnail-img');
    if (thumbImg) thumbImg.src = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
    let statusFilename = document.getElementById('status-filename');
    if (statusFilename) statusFilename.textContent = '';
    let statusFilesize = document.getElementById('status-filesize');
    if (statusFilesize) statusFilesize.textContent = '';
    
    document.getElementById('chart-info-tag').textContent = 'No active chart';
    updateLegend();
    loop();
  }
}

function toggleConditionalFields() {
  let mode = colorModeSelect.value;
  let levelsBox = document.getElementById('levels-container');
  let customPaletteBox = document.getElementById('custom-palette-container');
  let paletteSizeContainer = document.getElementById('palette-size-container');
  let colorDistanceMetricContainer = document.getElementById('color-distance-metric-container');
  let bayerMatrixBox = document.getElementById('bayer-matrix-container');

  if (bayerMatrixBox) {
    bayerMatrixBox.style.display = (mode === APP_STRINGS.MODE_BAYER) ? 'block' : 'none';
  }

  if (mode === APP_STRINGS.MODE_POSTERIZE || mode === APP_STRINGS.MODE_KMEANS || mode === APP_STRINGS.MODE_OCTREE) {
    levelsBox.style.display = 'block';
    customPaletteBox.style.display = 'none';
    if (colorDistanceMetricContainer) colorDistanceMetricContainer.style.display = 'none';
  } else if (
    mode === APP_STRINGS.MODE_FLOYD ||
    mode === APP_STRINGS.MODE_ATKINSON ||
    mode === APP_STRINGS.MODE_STUCKI ||
    mode === APP_STRINGS.MODE_BURKES ||
    mode === APP_STRINGS.MODE_SIERRA ||
    mode === APP_STRINGS.MODE_JJN ||
    mode === APP_STRINGS.MODE_PALETTE_MAPPING ||
    mode === APP_STRINGS.MODE_BAYER ||
    mode === APP_STRINGS.MODE_HALFTONE ||
    mode === APP_STRINGS.MODE_RIPPLE ||
    mode === APP_STRINGS.MODE_HATCH ||
    mode === APP_STRINGS.MODE_STENCIL ||
 
    mode === APP_STRINGS.MODE_SHADOW ||
    mode === APP_STRINGS.MODE_BARGELLO ||
    mode === APP_STRINGS.MODE_STAINED_GLASS ||
    mode === APP_STRINGS.MODE_COMIC ||

    mode === APP_STRINGS.MODE_WAVES ||
    mode === APP_STRINGS.MODE_MAZE ||
    mode === APP_STRINGS.MODE_STIPPLING ||
    mode === APP_STRINGS.MODE_CABLERIB ||
    mode === APP_STRINGS.MODE_HERRINGBONE ||
    mode === APP_STRINGS.MODE_VORONOI ||

    mode === APP_STRINGS.MODE_MOIRE ||
    mode === APP_STRINGS.MODE_SPIRAL ||
    mode === APP_STRINGS.MODE_HOUNDSTOOTH ||
    mode === APP_STRINGS.MODE_TURING ||
    mode === APP_STRINGS.MODE_AUTOMATA ||
    mode === APP_STRINGS.MODE_LAPLACIAN ||
    mode === APP_STRINGS.MODE_CANNY ||
    mode === APP_STRINGS.MODE_LOG ||
    mode === APP_STRINGS.MODE_MEDIAN_OTSU ||
    mode === APP_STRINGS.MODE_CONTOUR ||
    mode === APP_STRINGS.MODE_DOG ||
    mode === APP_STRINGS.MODE_SOBEL ||
    mode === APP_STRINGS.MODE_ADAPTIVE_THRESHOLD ||
    mode === APP_STRINGS.MODE_HPF ||
    mode === APP_STRINGS.MODE_PREWITT ||
    mode === APP_STRINGS.MODE_BLUE_NOISE ||
    mode === APP_STRINGS.MODE_SUPERPIXELS ||
    mode === APP_STRINGS.MODE_BILATERAL_MODE ||
    mode === APP_STRINGS.MODE_ANISOTROPIC ||
    mode === APP_STRINGS.MODE_DOM ||
    mode === APP_STRINGS.MODE_RIDGE ||
    mode === APP_STRINGS.MODE_VECTOR_QUANTIZATION
  ) {
    levelsBox.style.display = 'none';
    customPaletteBox.style.display = 'block';
    if (mode === APP_STRINGS.MODE_PALETTE_MAPPING ||
        mode === APP_STRINGS.MODE_SUPERPIXELS ||
        mode === APP_STRINGS.MODE_BILATERAL_MODE ||
        mode === APP_STRINGS.MODE_ANISOTROPIC ||
        mode === APP_STRINGS.MODE_VECTOR_QUANTIZATION) {
      paletteSizeContainer.style.display = 'flex';
      if (colorDistanceMetricContainer) colorDistanceMetricContainer.style.display = 'block';
      updateVisiblePalettePickers();
    } else {
      paletteSizeContainer.style.display = 'none';
      if (colorDistanceMetricContainer) colorDistanceMetricContainer.style.display = 'none';
      // Configure visible color pickers based on the specific mode
      let maxVisible = 2; // Default for 2-color modes
      if (mode === APP_STRINGS.MODE_STENCIL) {
        maxVisible = 3;
      } else if (mode === APP_STRINGS.MODE_BARGELLO) {
        maxVisible = 4;
      } else if (mode === APP_STRINGS.MODE_STAINED_GLASS) {
        maxVisible = 5;
      }
      
      for (let i = 0; i < 8; i++) {
        let box = document.getElementById(`picker-box-${i + 1}`);
        if (box) box.style.display = (i < maxVisible) ? 'flex' : 'none';
      }
    }
  } else {
    levelsBox.style.display = 'none';
    customPaletteBox.style.display = 'none';
    if (colorDistanceMetricContainer) colorDistanceMetricContainer.style.display = 'none';
  }
  
  // Handle dynamic algorithm parameters visibility & settings
  if (ALGO_PARAMS[mode]) {
    let params = ALGO_PARAMS[mode];
    if (params.param1) {
      if (algoParamContainer1) {
        algoParamContainer1.style.display = 'block';
        
        let label1 = params.param1.label;
        let help1 = params.param1.help;
        if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage].algoParams) {
          label1 = TRANSLATIONS[currentLanguage].algoParams[label1] || label1;
          help1 = TRANSLATIONS[currentLanguage].algoParams[help1] || help1;
        }
        algoParamLabel1.textContent = label1;
        
        algoParamVal1.min = params.param1.min;
        algoParamVal1.max = params.param1.max;
        algoParamVal1.step = params.param1.step;
        algoParamVal1.value = params.param1.value;

        algoParamSlider1.min = params.param1.min;
        algoParamSlider1.max = params.param1.max;
        algoParamSlider1.step = params.param1.step;
        algoParamSlider1.value = params.param1.value;

        if (algoParamHelp1) algoParamHelp1.textContent = help1;
      }
    } else {
      if (algoParamContainer1) algoParamContainer1.style.display = 'none';
    }

    if (params.param2) {
      if (algoParamContainer2) {
        algoParamContainer2.style.display = 'block';
        
        let label2 = params.param2.label;
        let help2 = params.param2.help;
        if (typeof TRANSLATIONS !== 'undefined' && TRANSLATIONS[currentLanguage] && TRANSLATIONS[currentLanguage].algoParams) {
          label2 = TRANSLATIONS[currentLanguage].algoParams[label2] || label2;
          help2 = TRANSLATIONS[currentLanguage].algoParams[help2] || help2;
        }
        algoParamLabel2.textContent = label2;
        
        algoParamVal2.min = params.param2.min;
        algoParamVal2.max = params.param2.max;
        algoParamVal2.step = params.param2.step;
        algoParamVal2.value = params.param2.value;

        algoParamSlider2.min = params.param2.min;
        algoParamSlider2.max = params.param2.max;
        algoParamSlider2.step = params.param2.step;
        algoParamSlider2.value = params.param2.value;

        if (algoParamHelp2) algoParamHelp2.textContent = help2;
      }
    } else {
      if (algoParamContainer2) algoParamContainer2.style.display = 'none';
    }
  } else {
    if (algoParamContainer1) algoParamContainer1.style.display = 'none';
    if (algoParamContainer2) algoParamContainer2.style.display = 'none';
  }

  let wrapper = document.getElementById('mode-settings-wrapper');
  if (wrapper) {
    let hasVisibleSetting = 
      (bayerMatrixBox && bayerMatrixBox.style.display !== 'none') ||
      (levelsBox && levelsBox.style.display !== 'none') ||
      (customPaletteBox && customPaletteBox.style.display !== 'none') ||
      (algoParamContainer1 && algoParamContainer1.style.display !== 'none') ||
      (algoParamContainer2 && algoParamContainer2.style.display !== 'none');
    wrapper.style.display = hasVisibleSetting ? 'flex' : 'none';
  }


}

function updateVisiblePalettePickers() {
  if (!paletteSizeInput) return;
  let size = parseInt(paletteSizeInput.value) || 4;
  for (let i = 0; i < 8; i++) {
    let box = document.getElementById(`picker-box-${i + 1}`);
    if (box) {
      if (i < size) {
        box.style.display = 'flex';
      } else {
        box.style.display = 'none';
      }
    }
  }
}

function getActiveCustomColors() {
  if (!paletteSizeInput) return [];
  let size = parseInt(paletteSizeInput.value) || 4;
  let colors = [];
  for (let i = 0; i < size; i++) {
    colors.push(yarnPickers[i].value);
  }
  return colors;
}

function updateLegend() {
  let container = document.getElementById('legend-container');
  
  if (!processedImg) {
    container.innerHTML = `
      <div class="empty-legend-message">
        <div class="empty-wool-icon">🧶</div>
        <p>${currentLanguage === 'pl' ? "Załaduj obraz, aby obliczyć kolory oczek." : "Upload an image to calculate stitch colors."}</p>
      </div>
    `;
    return;
  }

  processedImg.loadPixels();
  let totalStitches = processedImg.width * processedImg.height;
  let colorCounts = {};

  for (let i = 0; i < processedImg.pixels.length; i += 4) {
    let r = processedImg.pixels[i];
    let g = processedImg.pixels[i + 1];
    let b = processedImg.pixels[i + 2];
    let a = processedImg.pixels[i + 3];

    if (a < 10) continue; 

    let key = `${r},${g},${b}`;
    colorCounts[key] = (colorCounts[key] || 0) + 1;
  }

  let swatches = [];
  for (let rgb in colorCounts) {
    let [r, g, b] = rgb.split(',').map(Number);
    let hex = rgbToHex(r, g, b);
    swatches.push({
      hex: hex,
      count: colorCounts[rgb],
      percent: ((colorCounts[rgb] / totalStitches) * 100).toFixed(1)
    });
  }

  swatches.sort((a, b) => b.count - a.count);

  let stitchLength = (calcStitchLengthInput && parseFloat(calcStitchLengthInput.value)) || 3.0;
  let skeinLength = (calcSkeinLengthInput && parseFloat(calcSkeinLengthInput.value)) || 200;

  let html = `<div class="legend-grid">`;
  swatches.forEach(sw => {
    let mappedSymbol = symbolMap[sw.hex] || 'none';
    let sNone = mappedSymbol === 'none' ? 'selected' : '';
    let sPurl = mappedSymbol === 'purl' ? 'selected' : '';
    let sYo = mappedSymbol === 'yo' ? 'selected' : '';
    let sK2tog = mappedSymbol === 'k2tog' ? 'selected' : '';
    let sSsk = mappedSymbol === 'ssk' ? 'selected' : '';

    let totalMeters = (sw.count * stitchLength) / 100;
    let skeins = Math.ceil(totalMeters / skeinLength);

    html += `
      <div class="legend-item">
        <span class="legend-color-box" style="background-color: ${sw.hex}"></span>
        <div class="legend-info">
          <span class="legend-hex">${sw.hex}</span>
          <span class="legend-count">${sw.count.toLocaleString()} ${currentLanguage === 'pl' ? 'o.' : 'sts'} (${sw.percent}%)</span>
          <span class="legend-yards">~${totalMeters.toFixed(1)} m (${skeins} ${currentLanguage === 'pl' ? 'mot.' : (skeins === 1 ? 'skein' : 'skeins')})</span>
        </div>
        <div class="legend-symbol-wrapper" title="${currentLanguage === 'pl' ? 'Przypisz symbol ściegu do tego koloru' : 'Map stitch symbol to this color'}">
          <select class="legend-symbol-select" data-hex="${sw.hex}">
            <option value="none" ${sNone}>${currentLanguage === 'pl' ? 'Prawe (Puste)' : 'Knit (Blank)'}</option>
            <option value="purl" ${sPurl}>${currentLanguage === 'pl' ? 'Lewe (•)' : 'Purl (•)'}</option>
            <option value="yo" ${sYo}>${currentLanguage === 'pl' ? 'Narzut (○)' : 'YO (○)'}</option>
            <option value="k2tog" ${sK2tog}>${currentLanguage === 'pl' ? '2razP (/)' : 'K2Tog (/)'}</option>
            <option value="ssk" ${sSsk}>${currentLanguage === 'pl' ? '2razPl (\\)' : 'SSK (\\)'}</option>
          </select>
        </div>
      </div>
    `;
  });
  html += `</div>`;
  
  container.innerHTML = html;

  // Bind change listeners to symbol dropdowns
  let symbolSelects = container.querySelectorAll('.legend-symbol-select');
  symbolSelects.forEach(select => {
    select.addEventListener('change', (e) => {
      let hex = select.getAttribute('data-hex');
      let val = select.value;
      symbolMap[hex] = val;
      if (val !== 'none') {
        symbolsCheckbox.checked = true;
      }
      generateWrittenInstructions();
      loop(); // Redraw canvas to update symbol overlays
    });
  });
}

function generateWrittenInstructions() {
  if (!processedImg) {
    if (writtenInstructionsTextarea) {
      writtenInstructionsTextarea.value = '';
    }
    if (btnCopyInstructions) {
      btnCopyInstructions.setAttribute('disabled', 'true');
    }
    return;
  }

  let w = processedImg.width;
  let h = processedImg.height;
  
  let isFlat = knittingMethodSelect && knittingMethodSelect.value === 'flat';
  let activeColors = getActiveCustomColors();
  
  processedImg.loadPixels();
  let colorCounts = {};
  for (let idx = 0; idx < processedImg.pixels.length; idx += 4) {
    let r = processedImg.pixels[idx];
    let g = processedImg.pixels[idx + 1];
    let b = processedImg.pixels[idx + 2];
    let hex = rgbToHex(r, g, b).toUpperCase();
    colorCounts[hex] = (colorCounts[hex] || 0) + 1;
  }
  let uniqueHexes = Object.keys(colorCounts).sort((a, b) => colorCounts[b] - colorCounts[a]);
  
  let colorToLetter = {};
  uniqueHexes.forEach((hex, index) => {
    let matchedIndex = activeColors.findIndex(c => c.toUpperCase() === hex);
    if (matchedIndex !== -1) {
      colorToLetter[hex] = String.fromCharCode(65 + matchedIndex);
    } else {
      colorToLetter[hex] = String.fromCharCode(65 + index);
    }
  });

  let adjustedGrid = null;
  if (symbolsCheckbox.checked) {
    adjustedGrid = getAdjustedSymbols();
  }

  let textLines = [];
  textLines.push(currentLanguage === 'pl' ? "LEGENDA KOLORÓW WŁÓCZKI:" : "YARN COLOR KEYS:");
  for (let hex in colorToLetter) {
    textLines.push(currentLanguage === 'pl' ? `  Kolor ${colorToLetter[hex]}: ${hex}` : `  Color ${colorToLetter[hex]}: ${hex}`);
  }
  textLines.push("");
  textLines.push(currentLanguage === 'pl' 
    ? `METODA: ${isFlat ? 'Płasko (tam i z powrotem)' : 'Okrągło (w koło)'}` 
    : `METHOD: ${isFlat ? 'Flat (Back & Forth)' : 'Circular (In the Round)'}`);
  textLines.push("");

  for (let rowIdx = 0; rowIdx < h; rowIdx++) {
    let y = h - 1 - rowIdx;
    let rowNum = rowIdx + 1;
    let isRS = !isFlat || (rowNum % 2 !== 0);
    let rowLabel = "";
    if (isFlat) {
      rowLabel = isRS 
        ? (currentLanguage === 'pl' ? "PS" : "RS") 
        : (currentLanguage === 'pl' ? "LS" : "WS");
    } else {
      rowLabel = currentLanguage === 'pl' ? "Okrążenie" : "Round";
    }
    
    let stitches = [];
    let startX = isRS ? (w - 1) : 0;
    let endX = isRS ? -1 : w;
    let stepX = isRS ? -1 : 1;
    
    for (let x = startX; x !== endX; x += stepX) {
      let idx = (x + y * w) * 4;
      let r = processedImg.pixels[idx];
      let g = processedImg.pixels[idx + 1];
      let b = processedImg.pixels[idx + 2];
      let hex = rgbToHex(r, g, b).toUpperCase();
      let letter = colorToLetter[hex] || 'A';
      
      let symbol = (adjustedGrid && adjustedGrid[y]) ? (adjustedGrid[y][x] || 'none') : 'none';
      let stitchName = "K";
      
      if (isRS) {
        if (symbol === 'purl') stitchName = "P";
        else if (symbol === 'yo') stitchName = "YO";
        else if (symbol === 'k2tog') stitchName = "K2Tog";
        else if (symbol === 'ssk') stitchName = "SSK";
      } else {
        if (symbol === 'none') stitchName = "P";
        else if (symbol === 'purl') stitchName = "K";
        else if (symbol === 'yo') stitchName = "YO";
        else if (symbol === 'k2tog') stitchName = "SSK";
        else if (symbol === 'ssk') stitchName = "K2Tog";
      }
      
      stitches.push({ letter, stitchName });
    }
    
    let compressed = [];
    let current = stitches[0];
    let count = 1;
    
    for (let i = 1; i < stitches.length; i++) {
      if (stitches[i].letter === current.letter && stitches[i].stitchName === current.stitchName) {
        count++;
      } else {
        compressed.push({ letter: current.letter, stitchName: current.stitchName, count });
        current = stitches[i];
        count = 1;
      }
    }
    if (current) {
      compressed.push({ letter: current.letter, stitchName: current.stitchName, count });
    }
    
    let rowStrs = compressed.map(c => {
      let mappedStitch = c.stitchName;
      if (currentLanguage === 'pl') {
        if (c.stitchName === 'K') mappedStitch = 'P';
        else if (c.stitchName === 'P') mappedStitch = 'L';
        else if (c.stitchName === 'YO') mappedStitch = 'N';
        else if (c.stitchName === 'K2Tog') mappedStitch = '2razP';
        else if (c.stitchName === 'SSK') mappedStitch = '2razPl';
      }
      return currentLanguage === 'pl' 
        ? `${mappedStitch}${c.count} w ${c.letter}`
        : `${mappedStitch}${c.count} in ${c.letter}`;
    });
    
    let prefix = isFlat 
      ? (currentLanguage === 'pl' ? `Rząd ${rowNum} (${rowLabel}):` : `Row ${rowNum} (${rowLabel}):`) 
      : (currentLanguage === 'pl' ? `Okrążenie ${rowNum}:` : `Round ${rowNum}:`);
    textLines.push(`${prefix} ${rowStrs.join(', ')}`);
  }

  let instructionsText = textLines.join('\n');
  if (writtenInstructionsTextarea) {
    writtenInstructionsTextarea.value = instructionsText;
  }
  if (btnCopyInstructions) {
    btnCopyInstructions.removeAttribute('disabled');
  }
}


// [NOTE: Color utilities moved to color-utils.js]


function showLoader() {
  let loader = document.getElementById('loading-overlay');
  if (loader) loader.style.display = 'flex';
}

function hideLoader() {
  let loader = document.getElementById('loading-overlay');
  if (loader) loader.style.display = 'none';
}

function setLanguage(lang) {
  currentLanguage = lang;
  
  // Update APP_STRINGS dynamic alerts
  let dict = TRANSLATIONS[lang];
  if (dict) {
    if (dict.alerts) {
      for (let k in dict.alerts) {
        APP_STRINGS[k] = dict.alerts[k];
      }
    }
    
    // Translate standard DOM elements by ID
    for (let id in dict) {
      if (id === 'selects' || id === 'algoParams' || id === 'alerts' || id === 'placeholders') continue;
      let el = document.getElementById(id);
      if (el) {
        // If it's a button or contains HTML we use innerHTML, otherwise textContent
        if (id.startsWith('btn-') || id === 'btn-generate') {
          el.innerHTML = dict[id];
        } else {
          el.textContent = dict[id];
        }
      }
    }
    
    // Translate placeholders
    if (dict.placeholders) {
      for (let id in dict.placeholders) {
        let el = document.getElementById(id);
        if (el) {
          el.setAttribute('placeholder', dict.placeholders[id]);
        }
      }
    }
    
    // Translate Select elements (options and optgroups)
    if (dict.selects) {
      for (let selectId in dict.selects) {
        let selectEl = document.getElementById(selectId);
        if (selectEl) {
          let selectDict = dict.selects[selectId];
          
          // Translate options
          let options = selectEl.querySelectorAll('option');
          options.forEach(opt => {
            let val = opt.value;
            if (selectDict[val]) {
              opt.textContent = selectDict[val];
            }
          });
          
          // Translate optgroups if any
          let optgroups = selectEl.querySelectorAll('optgroup');
          optgroups.forEach(og => {
            let label = og.getAttribute('label');
            if (selectDict[label]) {
              og.setAttribute('label', selectDict[label]);
            }
          });
        }
      }
    }
  }
  
  // Re-trigger dynamic configurations, legends, written instructions if image is processed
  toggleConditionalFields();
  if (processedImg) {
    updateLegend();
    generateWrittenInstructions();
    
    // Also update the active chart info tag text
    let filename = document.getElementById('status-filename') ? document.getElementById('status-filename').textContent : '';
    let infoText = lang === 'pl' ? `${processedImg.width} × ${processedImg.height} oczek` : `${processedImg.width} × ${processedImg.height} stitches`;
    if (filename) {
      infoText = `${filename} (${infoText})`;
    }
    document.getElementById('chart-info-tag').textContent = infoText;
  } else {
    // Redraw empty legend message
    updateLegend();
    
    // Reset chart info tag to localized "No active chart"
    let infoTag = document.getElementById('chart-info-tag');
    if (infoTag) {
      infoTag.textContent = lang === 'pl' ? 'Brak aktywnego schematu' : 'No active chart';
    }
  }
  
  // Redraw canvas
  redraw();
}
