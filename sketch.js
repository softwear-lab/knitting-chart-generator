let img;
let widthInput;
let generateBtn;
let saveBtn;
let processedImg;
let colorModeSelect;
let colorLevelsInput;
let gridCheckbox;

// Nowe zmienne dla próbników kolorów
let color1Picker;
let color2Picker;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  gridCheckbox = createCheckbox(' Pokaż siatkę (kontury oczek)', true);
  gridCheckbox.parent('grid-container');
  gridCheckbox.changed(loop);

  let uploadBtn = createFileInput(handleFile);
  uploadBtn.parent('upload-container');

  widthInput = createInput('190'); 
  widthInput.parent('input-container');

  colorModeSelect = createSelect();
  colorModeSelect.parent('color-mode-container');
  colorModeSelect.option('Oryginalne kolory');
  colorModeSelect.option('Czarno-biały (Threshold)');
  colorModeSelect.option('Redukcja kolorów (Posterize)');
  colorModeSelect.option('Dithering Floyd-Steinberg');
  // Zmieniona nazwa, aby lepiej oddawała nową funkcjonalność:
  colorModeSelect.option('Dithering + Własna Paleta');
  
  colorLevelsInput = createInput('4');
  colorLevelsInput.parent('color-count-container');
  colorLevelsInput.attribute('placeholder', 'Ilość poziomów (2-255)');

  // NOWE: Tworzymy dwa próbniki kolorów (domyślnie Twoje zielenie ze skryptu)
  // Próbnik dla jasnych oczek (domyślnie 'light_green')
  color1Picker = createColorPicker('#c1d8bc'); 
  color1Picker.parent('custom-colors-container');
  // Próbnik dla ciemnych oczek (domyślnie 'darker_green')
  color2Picker = createColorPicker('#536a47'); 
  color2Picker.parent('custom-colors-container');

  // Gdy użytkownik użyje próbnika, automatycznie odświeżamy obraz (jeśli już jest załadowany)
  color1Picker.input(autoUpdateChart);
  color2Picker.input(autoUpdateChart);
  colorModeSelect.changed(autoUpdateChart); // Dodatkowo: zmiana trybu też sama odświeży obraz!

  generateBtn = createButton('Generuj schemat');
  generateBtn.parent('buttons-container');
  generateBtn.mousePressed(generateChart);

  saveBtn = createButton('Pobierz schemat');
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
    text("Wgraj zdjęcie, wybierz tryb i kliknij 'Generuj schemat'.", width / 2, height / 2);
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
    alert("Proszę wgrać plik graficzny (np. JPG lub PNG).");
  }
}

// Funkcja pomocnicza: jeśli obraz jest wgrany, automatycznie aktualizuj schemat
function autoUpdateChart() {
  if (img) {
    generateChart();
  }
}

function generateChart() {
  if (!img) {
    alert("Najpierw wgraj zdjęcie!");
    return;
  }

  let targetW = parseInt(widthInput.value());
  
  if (isNaN(targetW) || targetW <= 0) {
    alert("Podaj poprawną szerokość (liczbę większą od 0).");
    return;
  }

  let ratio = img.height / img.width;
  let targetH = Math.floor(targetW * ratio);

  processedImg = createImage(targetW, targetH);
  processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);

  let mode = colorModeSelect.value();

  if (mode === 'Czarno-biały (Threshold)') {
    processedImg.filter(THRESHOLD, 0.5); 
  } 
  else if (mode === 'Redukcja kolorów (Posterize)') {
    let levels = parseInt(colorLevelsInput.value());
    if (isNaN(levels) || levels < 2) levels = 2; 
    if (levels > 255) levels = 255;
    processedImg.filter(POSTERIZE, levels);
  }
  else if (mode === 'Dithering Floyd-Steinberg') {
    applyFloydSteinberg(processedImg, false);
  }
  else if (mode === 'Dithering + Własna Paleta') {
    applyFloydSteinberg(processedImg, true);
  }

  loop(); 
}

function saveChart() {
  if (processedImg) {
    processedImg.save('schemat-dziewiarski', 'png');
  } else {
    alert("Nie ma schematu do zapisania!");
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

  // ZMODYFIKOWANE: Użycie kolorów wybranych przez użytkownika
  if (usePalette) {
    // Pobieramy kolory z próbników (zwracają obiekty kolorów p5)
    let c1 = color1Picker.color(); // Jasny
    let c2 = color2Picker.color(); // Ciemny

    // Wyciągamy składowe R, G, B dla obu kolorów
    let rgb1 = [red(c1), green(c1), blue(c1)];
    let rgb2 = [red(c2), green(c2), blue(c2)];

    for (let i = 0; i < imageObj.pixels.length; i += 4) {
      let val = imageObj.pixels[i]; 
      
      // Jeśli piksel jest jasny (255), użyj pierwszego koloru, w przeciwnym razie drugiego
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