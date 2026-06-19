let cachedFonts = {
  regular: null,
  bold: null,
  italic: null
};

async function fetchFontAsBase64(url) {
  let response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font from ${url}`);
  }
  let blob = await response.blob();
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      let base64 = reader.result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

function p5ImageToDataURL(p5Img) {
  let tempCanvas = document.createElement('canvas');
  tempCanvas.width = p5Img.width;
  tempCanvas.height = p5Img.height;
  let ctx = tempCanvas.getContext('2d');
  
  p5Img.loadPixels();
  let imgData = ctx.createImageData(p5Img.width, p5Img.height);
  imgData.data.set(p5Img.pixels);
  ctx.putImageData(imgData, 0, 0);
  
  return tempCanvas.toDataURL('image/jpeg', 0.9);
}

async function exportPDF() {
  if (!processedImg) {
    alert(APP_STRINGS.ALERT_NO_CHART);
    return;
  }
  
  // Try to load and cache Roboto fonts for Polish characters support
  let activeFont = "helvetica";
  let showLoaderFn = typeof showLoader === 'function' ? showLoader : null;
  let hideLoaderFn = typeof hideLoader === 'function' ? hideLoader : null;
  
  if (!cachedFonts.regular || !cachedFonts.bold || !cachedFonts.italic) {
    if (showLoaderFn) showLoaderFn();
    try {
      if (!cachedFonts.regular) {
        cachedFonts.regular = await fetchFontAsBase64('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Regular.ttf');
      }
      if (!cachedFonts.bold) {
        cachedFonts.bold = await fetchFontAsBase64('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Medium.ttf');
      }
      if (!cachedFonts.italic) {
        cachedFonts.italic = await fetchFontAsBase64('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.66/fonts/Roboto/Roboto-Italic.ttf');
      }
    } catch (err) {
      console.error("Failed to load custom fonts, falling back to standard Helvetica", err);
    } finally {
      if (hideLoaderFn) hideLoaderFn();
    }
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  if (cachedFonts.regular && cachedFonts.bold && cachedFonts.italic) {
    try {
      doc.addFileToVFS("Roboto-Regular.ttf", cachedFonts.regular);
      doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
      
      doc.addFileToVFS("Roboto-Medium.ttf", cachedFonts.bold);
      doc.addFont("Roboto-Medium.ttf", "Roboto", "bold");
      
      doc.addFileToVFS("Roboto-Italic.ttf", cachedFonts.italic);
      doc.addFont("Roboto-Italic.ttf", "Roboto", "italic");
      
      activeFont = "Roboto";
    } catch (e) {
      console.error("Error registering custom fonts", e);
      activeFont = "helvetica";
    }
  }
  
  // PAGE 1: OVERVIEW COVER PAGE
  
  // 1. Draw header title
  let patternTitle = document.getElementById('pdf-pattern-title').value || "My Knitting Project";
  doc.setFont(activeFont, "bold");
  doc.setFontSize(24);
  doc.setTextColor(44, 53, 49); // forest slate
  doc.text(patternTitle.toUpperCase(), 105, 40, { align: "center" });
  
  // 2. Draw Subtitle
  let dateStr = new Date().toLocaleDateString();
  let subtitle = currentLanguage === 'pl'
    ? `Utworzono: ${dateStr}  |  Rozmiar siatki: ${processedImg.width} x ${processedImg.height} oczek`
    : `Generated on ${dateStr}  |  Grid size: ${processedImg.width} x ${processedImg.height} stitches`;
  doc.setFont(activeFont, "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 117, 109); // slate-muted
  doc.text(subtitle, 105, 48, { align: "center" });
  
  // Divider line
  doc.setDrawColor(232, 226, 214); // sand border
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);
  
  // Get swatches data first to adjust layout
  let swatches = getSwatchesData();
  let numSwatches = swatches.length;
  
  let maxBoxW = 90;
  let maxBoxH = 65;
  if (numSwatches > 16) {
    maxBoxH = 35;
  } else if (numSwatches > 8) {
    maxBoxH = 50;
  }
  
  // 3. Draw Thumbnail image and calculate layout height
  let hasImage = false;
  let imgY = 65;
  let imgH = 0;
  
  if (typeof img !== 'undefined' && img && img.width > 0 && img.height > 0) {
    let imgRatio = img.height / img.width;
    let imgW;
    if (imgRatio > (maxBoxH / maxBoxW)) {
      imgH = maxBoxH;
      imgW = imgH / imgRatio;
    } else {
      imgW = maxBoxW;
      imgH = imgW * imgRatio;
    }
    
    let imgX = (210 - imgW) / 2;
    
    try {
      let imgDataUrl = p5ImageToDataURL(img);
      doc.addImage(imgDataUrl, 'JPEG', imgX, imgY, imgW, imgH);
      
      // Border around thumbnail
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.rect(imgX, imgY, imgW, imgH, "S");
      hasImage = true;
    } catch (err) {
      console.error("Failed to add thumbnail to PDF", err);
    }
  }
  
  // 4. Yarn Consumption Legend Card (positioned dynamically)
  let startY = hasImage ? (imgY + imgH + 10) : 65;
  
  let includeYarnEl = document.getElementById('pdf-include-yarn');
  let isYarnIncluded = includeYarnEl ? includeYarnEl.checked : true;
  
  let cardH = 0;
  if (isYarnIncluded) {
    let numCols = 3;
    let rowsOfSwatches = Math.ceil(numSwatches / numCols);
    if (rowsOfSwatches < 3) rowsOfSwatches = 3; // safe minimum
    cardH = 20 + rowsOfSwatches * 10;
    
    doc.setFillColor(249, 247, 243); // warm light sand bg
    doc.setDrawColor(232, 226, 214); // sand border
    doc.rect(20, startY, 170, cardH, "FD"); // draw card wrapper dynamically
    
    doc.setFont(activeFont, "bold");
    doc.setFontSize(12);
    doc.setTextColor(44, 53, 49);
    doc.text(currentLanguage === 'pl' ? "KALKULATOR ZUŻYCIA WŁÓCZKI" : "YARN CONSUMPTION CALCULATOR", 30, startY + 12);
    
    let stitchLengthEl = document.getElementById('calc-stitch-length');
    let skeinLengthEl = document.getElementById('calc-skein-length');
    let stitchLength = (stitchLengthEl && parseFloat(stitchLengthEl.value)) || 3.0;
    let skeinLength = (skeinLengthEl && parseFloat(skeinLengthEl.value)) || 200;
    
    swatches.forEach((sw, idx) => {
      if (idx >= 32) return; // support up to 32 colors (3 columns of 11)
      
      let colIdx = Math.floor(idx / rowsOfSwatches);
      let rowIdx = idx % rowsOfSwatches;
      
      let colX = 24 + colIdx * 55;
      let colY = startY + 24 + rowIdx * 10;
      
      let rgb = hexToRgb(sw.hex);
      doc.setFillColor(rgb[0], rgb[1], rgb[2]);
      doc.rect(colX, colY - 5, 8, 8, "F");
      
      // Swatch outline
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.15);
      doc.rect(colX, colY - 5, 8, 8, "S");
      
      doc.setFont(activeFont, "normal");
      doc.setFontSize(8);
      doc.setTextColor(44, 53, 49);
      doc.text(`${sw.hex}`, colX + 10, colY + 1);
      
      doc.setFontSize(7);
      doc.setTextColor(100, 117, 109);
      let totalMeters = (sw.count * stitchLength) / 100;
      let skeins = Math.ceil(totalMeters / skeinLength);
      let stsLabel = currentLanguage === 'pl' ? "o." : "sts";
      let skLabel = currentLanguage === 'pl' ? "mot." : (skeins === 1 ? "skein" : "skeins");
      doc.text(`${sw.count.toLocaleString()} ${stsLabel} (~${totalMeters.toFixed(1)} m, ${skeins} ${skLabel})`, colX + 21, colY + 1);
    });
  } else {
    // If yarn consumption calculation is excluded, set cardH so subsequent key cards shift up
    cardH = -6;
  }

  // 5. Draw Stitch Glossary Key Card (if symbols are mapped and enabled)
  let activeSymbols = [];
  if (typeof symbolMap !== 'undefined') {
    activeSymbols = Array.from(new Set(Object.values(symbolMap))).filter(s => s !== 'none');
  }
  let symbolsCheckboxEl = document.getElementById('symbols-checkbox');
  let isSymbolsChecked = symbolsCheckboxEl && symbolsCheckboxEl.checked;
  if (activeSymbols.length > 0 && isSymbolsChecked) {
    let glossY = startY + cardH + 6;
    let glossH = 14 + Math.ceil(activeSymbols.length / 2) * 8;
    
    doc.setFillColor(249, 247, 243); // warm light sand bg
    doc.setDrawColor(232, 226, 214); // sand border
    doc.rect(20, glossY, 170, glossH, "FD"); // draw card wrapper
    
    doc.setFont(activeFont, "bold");
    doc.setFontSize(10);
    doc.setTextColor(44, 53, 49);
    doc.text(currentLanguage === 'pl' ? "SŁOWNICZEK SYMBOLI ŚCIEGÓW" : "STITCH SYMBOLS GLOSSARY", 30, glossY + 9);
    
    doc.setFont(activeFont, "normal");
    doc.setFontSize(8);
    doc.setTextColor(100, 117, 109);
    
    const GLOSSARY_LABELS = currentLanguage === 'pl' ? {
      'purl': '•  Oczko lewe (L)',
      'yo': '○  Narzut (N) - dodanie oczka',
      'k2tog': '/  2 razem na prawo (2razP) - pochylone w prawo',
      'ssk': '\\  2 razem na prawo przez przeciągnięcie (2razPl) - pochylone w lewo'
    } : {
      'purl': '•  Purl stitch',
      'yo': '○  Yarn Over (YO) - increase',
      'k2tog': '/  Knit 2 Together (K2Tog) - right decrease',
      'ssk': '\\  Slip Slip Knit (SSK) - left decrease'
    };
    
    activeSymbols.forEach((sym, idx) => {
      let label = GLOSSARY_LABELS[sym] || sym;
      let isCol2 = idx % 2 === 1;
      let colX = isCol2 ? 110 : 30;
      let colRow = Math.floor(idx / 2);
      let colY = glossY + 17 + colRow * 8;
      doc.text(label, colX, colY);
    });
  }
  
  // Footer on cover
  doc.setFont(activeFont, "italic");
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text(currentLanguage === 'pl' ? "Utworzono za pomocą Generatora Wzorów Dziewiarskich" : "Created with Knitting Chart Generator", 105, 280, { align: "center" });
  
  // PAGE 2: STITCH PREVIEW GRID
  doc.addPage();
  
  processedImg.loadPixels();
  let cols = processedImg.width;
  let rows = processedImg.height;
  
  // Layout spacing
  let gridMargin = 30; 
  let stitchAspectSelectEl = document.getElementById('stitch-aspect-select');
  let aspect = (stitchAspectSelectEl && parseFloat(stitchAspectSelectEl.value)) || 1.0;
  let maxW = 210 - gridMargin * 2; // 150 mm
  let maxH = 297 - gridMargin * 2; // 237 mm
  
  let cellSize = Math.min(maxW / (cols * aspect), maxH / rows);
  let cellSizeX = cellSize * aspect;
  let cellSizeY = cellSize;
  let gridW = cols * cellSizeX;
  let gridH = rows * cellSizeY;
  
  let gridX = (210 - gridW) / 2;
  let gridY = (297 - gridH) / 2 + 10;
  
  // Header on Page 2
  doc.setFont(activeFont, "bold");
  doc.setFontSize(14);
  doc.setTextColor(44, 53, 49);
  doc.text(currentLanguage === 'pl' ? "SCHEMAT WZORU DZIEWIARSKIEGO" : "STITCH PATTERN CHART", 105, gridY - 18, { align: "center" });
  
  doc.setFont(activeFont, "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 117, 109);
  doc.text(currentLanguage === 'pl' ? "Czytaj schemat od dołu do góry. Kolumny liczy się od prawej do lewej." : "Read chart from bottom-to-top. Columns count right-to-left.", 105, gridY - 13, { align: "center" });
  
  let adjustedGrid = [];
  if (isSymbolsChecked) {
    adjustedGrid = getAdjustedSymbols();
  }

  // 1. Draw colored grid squares
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let idx = (x + y * cols) * 4;
      let r = processedImg.pixels[idx];
      let g = processedImg.pixels[idx+1];
      let b = processedImg.pixels[idx+2];
      
      doc.setFillColor(r, g, b);
      doc.rect(gridX + x * cellSizeX, gridY + y * cellSizeY, cellSizeX, cellSizeY, "F");
      
      // 1b. Draw stitch symbol overlay if enabled
      if (isSymbolsChecked && adjustedGrid && adjustedGrid[y]) {
        let symbol = adjustedGrid[y][x] || 'none';
        if (symbol !== 'none') {
          // Calculate contrast color
          let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
          let rStroke = luminance < 128 ? 255 : 44;
          let gStroke = luminance < 128 ? 255 : 53;
          let bStroke = luminance < 128 ? 255 : 49;
          
          let cx = gridX + x * cellSizeX + cellSizeX / 2;
          let cy = gridY + y * cellSizeY + cellSizeY / 2;
          let sz = Math.min(cellSizeX, cellSizeY);
          
          doc.setDrawColor(rStroke, gStroke, bStroke);
          doc.setFillColor(rStroke, gStroke, bStroke);
          
          if (symbol === 'purl') {
            doc.circle(cx, cy, sz * 0.11, "F");
          } 
          else if (symbol === 'yo') {
            doc.setLineWidth(Math.max(0.05, sz * 0.08));
            doc.circle(cx, cy, sz * 0.22, "S");
          } 
          else if (symbol === 'k2tog') {
            doc.setLineWidth(Math.max(0.05, sz * 0.08));
            let padX = cellSizeX * 0.22;
            let padY = cellSizeY * 0.22;
            doc.line(
              gridX + x * cellSizeX + padX,
              gridY + y * cellSizeY + cellSizeY - padY,
              gridX + x * cellSizeX + cellSizeX - padX,
              gridY + y * cellSizeY + padY
            );
          } 
          else if (symbol === 'ssk') {
            doc.setLineWidth(Math.max(0.05, sz * 0.08));
            let padX = cellSizeX * 0.22;
            let padY = cellSizeY * 0.22;
            doc.line(
              gridX + x * cellSizeX + padX,
              gridY + y * cellSizeY + padY,
              gridX + x * cellSizeX + cellSizeX - padX,
              gridY + y * cellSizeY + cellSizeY - padY
            );
          }
        }
      }
    }
  }
  
  // 2. Draw outline grid lines (with weights for 5/10)
  for (let x = 0; x <= cols; x++) {
    let stitchNum = cols - x; // right-to-left index
    
    if (x === 0 || x === cols) {
      doc.setLineWidth(0.4);
      doc.setDrawColor(44, 53, 49); // outer border
    } else if (stitchNum % 10 === 0) {
      doc.setLineWidth(0.25);
      doc.setDrawColor(100, 100, 100); // 10-stitch thicker line
    } else if (stitchNum % 5 === 0) {
      doc.setLineWidth(0.15);
      doc.setDrawColor(150, 150, 150); // 5-stitch medium line
    } else {
      doc.setLineWidth(0.04);
      doc.setDrawColor(210, 205, 195); // thin grid line
    }
    
    let lx = gridX + x * cellSizeX;
    doc.line(lx, gridY, lx, gridY + gridH);
  }
  
  for (let y = 0; y <= rows; y++) {
    let rowNum = rows - y; // bottom-to-top index
    
    if (y === 0 || y === rows) {
      doc.setLineWidth(0.4);
      doc.setDrawColor(44, 53, 49); // outer border
    } else if (rowNum % 10 === 0) {
      doc.setLineWidth(0.25);
      doc.setDrawColor(100, 100, 100);
    } else if (rowNum % 5 === 0) {
      doc.setLineWidth(0.15);
      doc.setDrawColor(150, 150, 150);
    } else {
      doc.setLineWidth(0.04);
      doc.setDrawColor(210, 205, 195);
    }
    
    let ly = gridY + y * cellSizeY;
    doc.line(gridX, ly, gridX + gridW, ly);
  }
  
  // 3. Draw coordinate labels (Row numbering bottom-to-top, Stitch numbering right-to-left)
  doc.setFont(activeFont, "normal");
  doc.setFontSize(Math.max(5, Math.min(8, cellSizeY * 1.5))); // dynamically size font based on cell size
  doc.setTextColor(80, 80, 80);
  
  // Rows
  for (let y = 0; y < rows; y++) {
    let label = "";
    let shouldLabel = false;
    
    let rowNum = rows - y;
    label = `${rowNum}`;
    shouldLabel = (rowNum === 1 || rowNum === rows || rowNum % 5 === 0);
    
    if (shouldLabel) {
      let ly = gridY + y * cellSizeY + cellSizeY / 2 + 1;
      // Left border label
      doc.text(label, gridX - 3, ly, { align: "right" });
      // Right border label
      doc.text(label, gridX + gridW + 3, ly, { align: "left" });
    }
  }
  
  // Stitches
  for (let x = 0; x < cols; x++) {
    let stitchNum = cols - x;
    
    // Label Stitch 1, Stitch Max, and every 5 stitches
    if (stitchNum === 1 || stitchNum === cols || stitchNum % 5 === 0) {
      let lx = gridX + x * cellSizeX + cellSizeX / 2;
      // Top label
      doc.text(`${stitchNum}`, lx, gridY - 2.5, { align: "center" });
      // Bottom label
      doc.text(`${stitchNum}`, lx, gridY + gridH + 4.5, { align: "center" });
    }
  }
  
  // PAGE 3+: WRITTEN INSTRUCTIONS
  let includeInstructionsEl = document.getElementById('pdf-include-instructions');
  let isInstructionsIncluded = includeInstructionsEl ? includeInstructionsEl.checked : false;
  if (isInstructionsIncluded) {
    doc.addPage();
    
    doc.setFont(activeFont, "bold");
    doc.setFontSize(14);
    doc.setTextColor(44, 53, 49);
    doc.text(currentLanguage === 'pl' ? "PISEMNA INSTRUKCJA" : "WRITTEN INSTRUCTIONS", 105, 25, { align: "center" });
    
    doc.setFont(activeFont, "normal");
    doc.setFontSize(9);
    doc.setTextColor(50, 50, 50);
    
    let writtenInstructionsTextareaEl = document.getElementById('written-instructions-textarea');
    let instructionsText = writtenInstructionsTextareaEl ? writtenInstructionsTextareaEl.value : "";
    if (instructionsText) {
      let lines = doc.splitTextToSize(instructionsText, 170); // 170 mm print width
      let startY = 35;
      let pageHeight = 297;
      let margin = 20;
      
      lines.forEach(line => {
        if (startY > pageHeight - margin) {
          doc.addPage();
          doc.setFont(activeFont, "normal");
          doc.setFontSize(9);
          doc.setTextColor(50, 50, 50);
          startY = 25; // Reset Y on new page
        }
        doc.text(line, 20, startY);
        startY += 5.5; // Line height 5.5 mm
      });
    } else {
      doc.text(currentLanguage === 'pl' ? "Brak wygenerowanej instrukcji." : "No instructions generated.", 20, 35);
    }
  }
  
  // Save PDF pattern document
  let safeFileName = patternTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  doc.save(`pattern-${safeFileName}.pdf`);
}

function getSwatchesData() {
  if (!processedImg) return [];
  


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
  return swatches;
}

function exportXLS() {
  if (!processedImg) {
    alert(APP_STRINGS.ALERT_NO_CHART);
    return;
  }

  let patternTitle = document.getElementById('pdf-pattern-title').value || "My Knitting Project";
  processedImg.loadPixels();
  let cols = processedImg.width;
  let rows = processedImg.height;

  let stitchAspectSelectEl = document.getElementById('stitch-aspect-select');
  let aspect = (stitchAspectSelectEl && parseFloat(stitchAspectSelectEl.value)) || 1.0;
  let cellHeightPt = 25;
  let cellWidthPt = cellHeightPt * aspect;

  // Build the Masquerading HTML Spreadsheet
  let html = `
<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
<head>
  <meta charset="utf-8">
  <!--[if gte mso 9]>
  <xml>
    <x:ExcelWorkbook>
      <x:ExcelWorksheets>
        <x:ExcelWorksheet>
          <x:Name>${currentLanguage === 'pl' ? "Wzór dziewiarski" : "Knitting Pattern"}</x:Name>
          <x:WorksheetOptions>
            <x:DisplayGridlines/>
          </x:WorksheetOptions>
        </x:ExcelWorksheet>
      </x:ExcelWorksheets>
    </x:ExcelWorkbook>
  </xml>
  <![endif]-->
  <style>
    table { border-collapse: collapse; }
    td {
      width: ${cellWidthPt}pt;
      height: ${cellHeightPt}pt;
      text-align: center;
      vertical-align: middle;
      font-family: Arial, sans-serif;
      font-size: 10pt;
      font-weight: bold;
      border: 1px solid #CCCCCC;
    }
    .header-cell {
      background-color: #FAF6F0;
      color: #64756D;
      font-weight: bold;
      border: 1px solid #C8C2B5;
    }
  </style>
</head>
<body>
  <table>
    <!-- Header Row: columns labeled right-to-left -->
    <tr>
      <td class="header-cell">${currentLanguage === 'pl' ? "Rząd \\\\ Kol" : "Row \\\\ Col"}</td>
  `;

  // Print column numbers right-to-left (cols down to 1)
  for (let x = 0; x < cols; x++) {
    let stitchNum = cols - x;
    html += `<td class="header-cell">${stitchNum}</td>`;
  }
  html += `</tr>`;

  let adjustedGrid = getAdjustedSymbols();

  // Data Rows: rows numbered bottom-to-top (rows down to 1)
  for (let y = 0; y < rows; y++) {
    let label = "";
    label = `${rows - y}`;
    html += `<tr>`;
    // Leftmost row number cell
    html += `<td class="header-cell">${label}</td>`;

    for (let x = 0; x < cols; x++) {
      let idx = (x + y * cols) * 4;
      let r = processedImg.pixels[idx];
      let g = processedImg.pixels[idx + 1];
      let b = processedImg.pixels[idx + 2];
      
      let hex = rgbToHex(r, g, b);
      
      // Calculate contrast font color
      let luminance = 0.299 * r + 0.587 * g + 0.114 * b;
      let fontColor = luminance < 128 ? "#FFFFFF" : "#2C3531";
      
      // Map symbol
      let symbol = (adjustedGrid && adjustedGrid[y]) ? (adjustedGrid[y][x] || 'none') : 'none';
      let char = "";
      if (symbol === 'purl') char = ".";
      else if (symbol === 'yo') char = "O";
      else if (symbol === 'k2tog') char = "/";
      else if (symbol === 'ssk') char = "\\";

      html += `<td style="background-color: ${hex}; color: ${fontColor};">${char}</td>`;
    }
    html += `</tr>`;
  }

  html += `
  </table>
</body>
</html>
  `;

  // Download logic
  let blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
  let url = URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  
  let safeFileName = patternTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  a.download = `chart-${safeFileName}.xls`;
  
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
