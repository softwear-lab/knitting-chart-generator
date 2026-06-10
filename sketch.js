let img;
let widthInput;
let generateBtn;
let saveBtn;
let processedImg;
let colorModeSelect;
let colorLevelsInput;
let gridCheckbox;

function setup() {
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container');

  // Włącznik siatki
  gridCheckbox = createCheckbox(' Pokaż siatkę (kontury oczek)', true);
  gridCheckbox.parent('grid-container');
  gridCheckbox.changed(loop);

  // 1. Wgrywanie plików
  let uploadBtn = createFileInput(handleFile);
  uploadBtn.parent('upload-container');

  // 2. Szerokość w oczkach
  widthInput = createInput('190'); // Zmieniłem domyślną na 190 zgodnie z Twoim kodem w Pythonie
  widthInput.parent('input-container');

  // 3. Tryb kolorów
  colorModeSelect = createSelect();
  colorModeSelect.parent('color-mode-container');
  colorModeSelect.option('Oryginalne kolory');
  colorModeSelect.option('Czarno-biały (Threshold)');
  colorModeSelect.option('Redukcja kolorów (Posterize)');
  // NOWE OPCJE Z PYTHONA:
  colorModeSelect.option('Dithering Floyd-Steinberg');
  colorModeSelect.option('Dithering + Zielona Paleta');
  
  colorLevelsInput = createInput('4');
  colorLevelsInput.parent('color-count-container');
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

  // Tworzymy miniaturę (odpowiednik funkcji resize z Pythona)
  processedImg = createImage(targetW, targetH);
  processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);

  let mode = colorModeSelect.value();

  // Wybór odpowiedniego algorytmu na podstawie menu
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
  else if (mode === 'Dithering + Zielona Paleta') {
    applyFloydSteinberg(processedImg, true);
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

// -------------------------------------------------------------
// NOWE FUNKCJE: Implementacja Pythona w JavaScript
// -------------------------------------------------------------

function applyFloydSteinberg(imageObj, usePalette) {
  // Funkcja ładuje tablicę wszystkich pikseli do manipulacji
  imageObj.loadPixels();
  
  let w = imageObj.width;
  let h = imageObj.height;

  // KROK 1: Konwersja obrazu na odcienie szarości
  for (let i = 0; i < imageObj.pixels.length; i += 4) {
    let r = imageObj.pixels[i];
    let g = imageObj.pixels[i + 1];
    let b = imageObj.pixels[i + 2];
    
    // Obliczanie luminancji (wartości szarości)
    let gray = 0.299 * r + 0.587 * g + 0.114 * b; 
    
    imageObj.pixels[i] = gray;
    imageObj.pixels[i + 1] = gray;
    imageObj.pixels[i + 2] = gray;
  }

  // KROK 2: Algorytm Floyd-Steinberg
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let index = (x + y * w) * 4;

      let oldVal = imageObj.pixels[index];
      // Jeśli jasność > 128, ustaw na 255 (biały), w przeciwnym razie 0 (czarny)
      let newVal = oldVal < 128 ? 0 : 255; 
      let err = oldVal - newVal; // Obliczamy "błąd" kwantyzacji

      // Przypisanie nowego koloru czarno-białego
      imageObj.pixels[index] = newVal;
      imageObj.pixels[index + 1] = newVal;
      imageObj.pixels[index + 2] = newVal;

      // Rozpraszanie błędu na sąsiadujące piksele wg ułamków z algorytmu
      addError(imageObj, x + 1, y, w, h, err, 7 / 16);
      addError(imageObj, x - 1, y + 1, w, h, err, 3 / 16);
      addError(imageObj, x, y + 1, w, h, err, 5 / 16);
      addError(imageObj, x + 1, y + 1, w, h, err, 1 / 16);
    }
  }

  // KROK 3: Opcjonalne nakładanie Twojej palety (zmiana koloru jak w Pythonie)
  if (usePalette) {
    let lightGreen = [193, 216, 188]; // Wartości RGB dla 'light_green'
    let darkerGreen = [83, 106, 71];  // Wartości RGB dla 'darker_green'

    for (let i = 0; i < imageObj.pixels.length; i += 4) {
      let val = imageObj.pixels[i]; // Wartość to teraz 0 (czarny) albo 255 (biały)
      let c = val === 255 ? lightGreen : darkerGreen; // Podmiana koloru
      
      imageObj.pixels[i] = c[0];
      imageObj.pixels[i + 1] = c[1];
      imageObj.pixels[i + 2] = c[2];
    }
  }

  // Zapisujemy zmiany w pikselach, aby można było narysować obraz
  imageObj.updatePixels();
}

// Funkcja pomocnicza do przekazywania błędu dla sąsiednich pikseli
function addError(imageObj, x, y, w, h, err, factor) {
  // Sprawdzamy, czy nie wyszliśmy poza krawędzie obrazka
  if (x >= 0 && x < w && y >= 0 && y < h) {
    let index = (x + y * w) * 4;
    // Dodajemy błąd do aktualnej jasności
    let c = imageObj.pixels[index] + err * factor;
    // p5.js radzi sobie z wartościami poza 0-255 automatycznie przy rysowaniu, 
    // ale my modyfikujemy surową tablicę, więc dbamy o ograniczenia
    imageObj.pixels[index] = c;
    imageObj.pixels[index + 1] = c;
    imageObj.pixels[index + 2] = c;
  }
}