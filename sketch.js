let img;
let widthInput;
let generateBtn;
let saveBtn;
let processedImg;

// Nowe zmienne dla opcji kolorów
let colorModeSelect;
let colorLevelsInput;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  // 1. Wgrywanie plików
  let uploadBtn = createFileInput(handleFile);
  uploadBtn.parent('upload-container');

  // 2. Szerokość w oczkach
  widthInput = createInput('50'); 
  widthInput.parent('input-container');

  // 3. Tryb kolorów (Menu rozwijane)
  colorModeSelect = createSelect();
  colorModeSelect.parent('color-mode-container');
  colorModeSelect.option('Oryginalne kolory');
  colorModeSelect.option('Czarno-biały');
  colorModeSelect.option('Redukcja kolorów');
  
  // Pole ilości kolorów (używane tylko w trybie "Redukcja kolorów")
  colorLevelsInput = createInput('4');
  colorLevelsInput.parent('color-count-container');
  // Dodajemy małą etykietę (placeholder) ułatwiającą zrozumienie
  colorLevelsInput.attribute('placeholder', 'Ilość poziomów (2-255)');

  // 4. Przyciski
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
        stroke(150);         
        strokeWeight(1);     
        
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

  // Tworzymy miniaturę na podstawie oryginalnego zdjęcia
  processedImg = createImage(targetW, targetH);
  processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);

  // Sprawdzamy, jaki tryb kolorów wybrał użytkownik
  let mode = colorModeSelect.value();

  if (mode === 'Czarno-biały') {
    // Filtr THRESHOLD zmienia każdy piksel na czarny lub biały 
    // Wartość 0.5 to próg jasności odcięcia
    processedImg.filter(THRESHOLD, 0.5); 
  } 
  else if (mode === 'Redukcja kolorów') {
    let levels = parseInt(colorLevelsInput.value());
    // Zabezpieczenie przed wpisaniem nieprawidłowych wartości dla filtra
    if (isNaN(levels) || levels < 2) {
      levels = 2; 
    } else if (levels > 255) {
      levels = 255;
    }
    // Filtr POSTERIZE ogranicza liczbę barw
    processedImg.filter(POSTERIZE, levels);
  }

  loop(); 
}

function saveChart() {
  if (processedImg) {
    saveCanvas('moj-schemat-dziewiarski', 'png');
  } else {
    alert("Nie ma schematu do zapisania!");
  }
}