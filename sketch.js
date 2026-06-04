let img;              // Zmienna przechowująca wgrane przez użytkownika zdjęcie
let widthInput;       // Pole tekstowe do wpisywania szerokości
let generateBtn;      // Przycisk do generowania schematu
let saveBtn;          // Przycisk do zapisu obrazka
let processedImg;     // Zmienna na przeskalowany (spikselizowany) obrazek

function setup() {
  // Tworzymy płótno (canvas) o wymiarach 800x600 pikseli
  let canvas = createCanvas(800, 600);
  canvas.parent('canvas-container'); // Umieszczamy je w odpowiednim divie w HTML

  // 1. Pole do wgrywania plików
  let uploadBtn = createFileInput(handleFile);
  uploadBtn.parent('upload-container');

  // 2. Pole do wpisania szerokości (domyślnie 50 oczek)
  widthInput = createInput('50'); 
  widthInput.parent('input-container');

  // 3. Przyciski generowania i zapisu
  generateBtn = createButton('Generuj schemat');
  generateBtn.parent('buttons-container');
  generateBtn.mousePressed(generateChart); // Kiedy klikniemy, wywołaj funkcję generateChart

  saveBtn = createButton('Pobierz schemat');
  saveBtn.parent('buttons-container');
  saveBtn.mousePressed(saveChart);

  // Ustawienia tekstu na płótnie
  textAlign(CENTER, CENTER);
  textSize(18);
}

function draw() {
  background(245); // Jasnoszare tło

  if (processedImg) {
    // Jeśli mamy wygenerowany schemat, obliczamy rozmiar pojedynczej "kratki"
    // Chcemy, aby cały schemat zmieścił się na płótnie
    let cellW = width / processedImg.width;
    let cellH = height / processedImg.height;
    let cellSize = min(cellW, cellH) * 0.95; // Zostawiamy mały margines (95% wielkości)

    // Obliczamy przesunięcie, aby schemat był wyśrodkowany
    let offsetX = (width - processedImg.width * cellSize) / 2;
    let offsetY = (height - processedImg.height * cellSize) / 2;

    // Rysujemy siatkę piksel po pikselu
    for (let x = 0; x < processedImg.width; x++) {
      for (let y = 0; y < processedImg.height; y++) {
        let c = processedImg.get(x, y); // Pobieramy kolor konkretnego piksela
        
        fill(c);             // Wypełniamy tym kolorem
        stroke(150);         // Kolor obramowania (siatka schematu)
        strokeWeight(1);     // Grubość obramowania
        
        // Rysujemy kwadrat reprezentujący jedno oczko na maszynie
        rect(offsetX + x * cellSize, offsetY + y * cellSize, cellSize, cellSize);
      }
    }
  } else {
    // Komunikat startowy, gdy nie ma jeszcze zdjęcia
    fill(100);
    noStroke();
    text("Wgraj zdjęcie i kliknij 'Generuj schemat', aby zobaczyć wynik.", width / 2, height / 2);
  }
  
  // Zatrzymujemy ciągłe odświeżanie, aby oszczędzać zasoby komputera. 
  // Rysujemy tylko raz po aktualizacji.
  noLoop(); 
}

// Funkcja wywoływana, gdy użytkownik wgra plik
function handleFile(file) {
  if (file.type === 'image') {
    img = loadImage(file.data, () => {
      processedImg = null; // Czyścimy stary schemat, gdy wgrywamy nowe zdjęcie
      loop();              // Odświeżamy płótno
    });
  } else {
    alert("Proszę wgrać plik graficzny (np. JPG lub PNG).");
  }
}

// Funkcja generująca właściwy schemat
function generateChart() {
  if (!img) {
    alert("Najpierw wgraj zdjęcie!");
    return;
  }

  // Pobieramy wpisaną szerokość
  let targetW = parseInt(widthInput.value());
  
  if (isNaN(targetW) || targetW <= 0) {
    alert("Podaj poprawną szerokość (liczbę większą od 0).");
    return;
  }

  // Obliczamy odpowiednią wysokość, aby zachować proporcje zdjęcia
  let ratio = img.height / img.width;
  let targetH = Math.floor(targetW * ratio);

  // Tworzymy miniaturowy obrazek (nasz "pikselowy" wzór)
  processedImg = createImage(targetW, targetH);
  // Kopiujemy oryginalne zdjęcie do miniatury (co automatycznie je zmniejsza)
  processedImg.copy(img, 0, 0, img.width, img.height, 0, 0, targetW, targetH);

  // Wymuszamy ponowne narysowanie płótna z nowym schematem
  loop(); 
}

// Funkcja do zapisu obrazka
function saveChart() {
  if (processedImg) {
    saveCanvas('moj-schemat-dziewiarski', 'png');
  } else {
    alert("Nie ma schematu do zapisania!");
  }
}
