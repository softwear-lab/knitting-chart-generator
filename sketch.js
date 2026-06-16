const APP_STRINGS = {
  // Modes menu.
  MODE_ORIGINAL: 'Original Colors',
  MODE_BW: 'Black & White (Threshold)',

  MODE_POSTERIZE: 'Color Reduction (Posterize)',
  MODE_KMEANS: 'K-Means Color Reduction',
  MODE_FLOYD: 'Floyd-Steinberg Dithering',
  MODE_ATKINSON: 'Atkinson Dithering',
  MODE_STUCKI: 'Stucki Dithering',
  MODE_BURKES: 'Burkes Dithering',
  MODE_SIERRA: 'Sierra Dithering',
  MODE_JJN: 'Jarvis-Judice-Ninke Dithering',
  MODE_PALETTE_MAPPING: 'Custom Palette Mapping',
  MODE_BAYER: 'Bayer Ordered Dithering',
  MODE_OCTREE: 'Octree Color Reduction',
  MODE_HALFTONE: 'Halftone Dot Pattern',
  MODE_GLITCH: 'Glitch Art Effect',
  MODE_RIPPLE: 'Ripple Halftone (2 Colors)',
  MODE_HATCH: 'Cross-Hatch Sketch (2 Colors)',
  MODE_STENCIL: 'Offset Stencil Pop Art (3 Colors)',

  MODE_SHADOW: 'Shadow Illusion (2 Colors)',
  MODE_BARGELLO: 'Bargello Wave (4 Colors)',
  MODE_STAINED_GLASS: 'Stained Glass Intarsia (5 Colors)',
  MODE_COMIC: 'Comic Halftone (2 Colors)',

  MODE_WAVES: 'Contour Waves (2 Colors)',
  MODE_MAZE: 'Truchet Maze (2 Colors)',
  MODE_STIPPLING: 'Ink Stippling (2 Colors)',
  MODE_CABLERIB: 'Cable-Rib Illusion (2 Colors)',
  MODE_HERRINGBONE: 'Herringbone Hatch (2 Colors)',
  MODE_VORONOI: 'Voronoi Mosaic (2 Colors)',

  MODE_MOIRE: 'Moiré Op-Art (2 Colors)',
  MODE_SPIRAL: 'Spiral Halftone (2 Colors)',
  MODE_HOUNDSTOOTH: 'Houndstooth Check (2 Colors)',
  MODE_TURING: 'Turing Pattern (2 Colors)',
  MODE_AUTOMATA: 'Cellular Automata (2 Colors)',


  // Alerts, placeholders.
  CANVAS_EMPTY: "Upload an image to begin.",
  ALERT_WRONG_TYPE: "Please upload an image file (e.g., JPG, PNG, or WEBP).",
  ALERT_NO_IMAGE: "Please upload an image first!",
  ALERT_BAD_WIDTH: "Please enter a valid width (a number greater than 9).",
  ALERT_NO_CHART: "There is no chart to save!",
  ALERT_INVALID_BASE64: "Invalid base64 image data.",
  ALERT_INVALID_FORMAT: "Invalid image file format.",
  ALERT_HEIC_NOT_LOADED: "HEIC conversion library is not loaded. Please ensure you have an active internet connection.",
  ALERT_HEIC_FAILED: "Failed to convert HEIC image. Please upload a standard image format (JPG, PNG, WEBP).",
  ALERT_LOAD_FAILED: "Failed to load image file.",

  FILENAME: 'knitting-chart'
};

const TRANSLATIONS = {
  en: {
    'mobile-app-title': 'Knitting Chart Generator',
    'app-title': 'Knitting Chart Generator',
    'app-subtitle': 'Convert any photo into a stitch-by-stitch knitting pattern with dynamic yarn calculators',
    'sidebar-mobile-title': 'Settings',
    'step-stitch-title': 'Stitch Settings',
    'chart-width-label': 'Width (stitches)',
    'chart-width-help': 'Fewer stitches create a more grid-like, abstract design. Height will scale proportionally.',
    'chart-brightness-label': 'Brightness',
    'chart-contrast-label': 'Contrast',
    'hist-eq-label': 'Auto Enhance Contrast',
    'hist-eq-help': 'Applies histogram equalization to improve tonal range of washed-out images before processing.',
    'chart-smoothing-label': 'Anti-Confetti (Smoothing)',
    'chart-smoothing-help': 'Removes stray single stitches. 0 is off, 1-3 increases edge-preserving smoothing.',
    'bilateral-label': 'Edge-Preserving Smooth',
    'bilateral-help': 'Smooths noise while keeping sharp color boundaries intact (0 = off, 1-5 = intensity).',
    'kuwahara-label': 'Block Painting (Kuwahara)',
    'kuwahara-help': 'Simplifies shapes into flat painterly blocks while keeping edges sharp (0 = off, 1-5 = intensity).',
    'morph-cleanup-label': 'Morphological Cleanup',
    'morph-cleanup-help': 'Refines shape boundaries using mathematical morphology. Open removes noise; Close fills holes.',
    'stitch-aspect-label': 'Stitch Aspect Ratio',
    'stitch-aspect-help': 'Real knit stitches are wider than tall. Adjusts display, PDF, and XLS to match physical proportions.',
    'knitting-method-label': 'Knitting Method',
    'knitting-method-help': 'Determines row reading direction and stitch conversion for wrong-side rows in written instructions.',
    'step-colors-title': 'Filter & Color Modes',
    'color-mode-label': 'Color Algorithm',
    'bayer-matrix-label': 'Bayer Texture Scale',
    'bayer-matrix-help': 'Controls the grid size of the dithering texture pattern relative to the stitches.',
    'color-levels-label': 'Color Count (Levels)',
    'color-levels-help': 'Reduces the image to a specific number of color tones.',
    'yarn-palette-label': 'Yarn Color Palette',
    'yarn-palette-size-label': 'Colors:',
    'yarn-color-1-label': 'Color 1',
    'yarn-color-2-label': 'Color 2',
    'yarn-color-3-label': 'Color 3',
    'yarn-color-4-label': 'Color 4',
    'yarn-color-5-label': 'Color 5',
    'yarn-color-6-label': 'Color 6',
    'yarn-color-7-label': 'Color 7',
    'yarn-color-8-label': 'Color 8',
    'color-distance-label': 'Color Matching Metric',
    'stray-stitch-label': 'Clean Stray Stitches',
    'stray-stitch-help': 'Automatically merges isolated single-pixel stitches into their most prominent surrounding color block to make knitting easier.',
    'row-color-limit-label': 'Limit Colors Per Row',
    'row-color-limit-max-label': 'Max:',
    'row-color-limit-help': 'Constrains each row to a maximum number of active yarn colors for stranded/Fair Isle knitting compatibility.',
    'step-actions-title': 'Generate & Export',
    'pdf-pattern-title-label': 'Pattern PDF Title',
    'btn-generate': '<span class="btn-icon">⚡</span> Generate Chart',
    'btn-download': '<span class="btn-icon">💾</span> Export Chart (PNG)',
    'btn-export-pdf': '<span class="btn-icon">📄</span> Export Pattern (PDF)',
    'btn-export-xls': '<span class="btn-icon">📊</span> Export Spreadsheet (XLS)',
    'btn-reset': '<span class="btn-icon">🔄</span> Reset App',
    'preview-grid-title': 'Stitch Preview Grid',
    'btn-change-image-canvas': '<span class="btn-icon">🔄</span> Change Image',
    'btn-remove-image-canvas': '<span class="btn-icon">🗑️</span> Remove Image',
    'show-outlines-label': 'Show Outlines',
    'show-symbols-label': 'Show Symbols',
    'viewport-upload-primary': 'Drag & drop image here',
    'viewport-upload-secondary': 'or click to browse files',
    'viewport-upload-limits': 'Supports JPG, PNG, WEBP, HEIC',
    'loading-text': 'Processing Image...',
    'yarn-calculator-title': 'Yarn Consumption Calculator',
    'yarn-calculator-desc': 'This list displays the estimated stitches and yarn color blocks needed.',
    'yarn-stitch-length-label': 'Yarn/Stitch (cm)',
    'yarn-skein-length-label': 'Meters/Skein',
    'written-instructions-title': 'Written Instructions',
    'written-instructions-desc': 'Follow these sequential row-by-row instructions to knit this pattern.',
    'btn-copy-instructions': 'Copy Text',
    
    selects: {
      'morph-cleanup-select': {
        'none': 'None',
        'erode': 'Erode (Shrink Regions)',
        'dilate': 'Dilate (Grow Regions)',
        'open': 'Open (Remove Small Spots)',
        'close': 'Close (Fill Small Gaps)'
      },
      'stitch-aspect-select': {
        '1.0': 'Square (1:1)',
        '1.333': 'Standard Knit (4:3)',
        '1.25': 'Sock Knit (5:4)',
        '1.2': 'Fine Knit (6:5)'
      },
      'knitting-method-select': {
        'flat': 'Flat (Back & Forth)',
        'circular': 'Circular (In the Round)'
      },
      'color-mode-select': {
        'Standard & Multi-Color Modes': 'Standard & Multi-Color Modes',
        'Dithering & Texturing': 'Dithering & Texturing',
        'Artistic & Halftones': 'Artistic & Halftones',
        'Geometric & Algorithmic Patterns': 'Geometric & Algorithmic Patterns',
        'Original Colors': 'Original Colors',
        'Custom Palette Mapping': 'Custom Palette Mapping',
        'K-Means Color Reduction': 'K-Means Color Reduction',
        'Octree Color Reduction': 'Octree Color Reduction',
        'Color Reduction (Posterize)': 'Color Reduction (Posterize)',
        'Bayer Ordered Dithering': 'Bayer Ordered Dithering',
        'Floyd-Steinberg Dithering': 'Floyd-Steinberg Dithering',
        'Atkinson Dithering': 'Atkinson Dithering',
        'Stucki Dithering': 'Stucki Dithering',
        'Burkes Dithering': 'Burkes Dithering',
        'Sierra Dithering': 'Sierra Dithering',
        'Jarvis-Judice-Ninke Dithering': 'Jarvis-Judice-Ninke Dithering',
        'Black & White (Threshold)': 'Black & White (Threshold)',
        'Halftone Dot Pattern': 'Halftone Dot Pattern',
        'Comic Halftone (2 Colors)': 'Comic Halftone (2 Colors)',
        'Ripple Halftone (2 Colors)': 'Ripple Halftone (2 Colors)',
        'Spiral Halftone (2 Colors)': 'Spiral Halftone (2 Colors)',
        'Cross-Hatch Sketch (2 Colors)': 'Cross-Hatch Sketch (2 Colors)',
        'Ink Stippling (2 Colors)': 'Ink Stippling (2 Colors)',
        'Offset Stencil Pop Art (3 Colors)': 'Offset Stencil Pop Art (3 Colors)',
        'Glitch Art Effect': 'Glitch Art Effect',
        'Shadow Illusion (2 Colors)': 'Shadow Illusion (2 Colors)',
        'Bargello Wave (4 Colors)': 'Bargello Wave (4 Colors)',
        'Stained Glass Intarsia (5 Colors)': 'Stained Glass Intarsia (5 Colors)',
        'Contour Waves (2 Colors)': 'Contour Waves (2 Colors)',
        'Truchet Maze (2 Colors)': 'Truchet Maze (2 Colors)',
        'Cable-Rib Illusion (2 Colors)': 'Cable-Rib Illusion (2 Colors)',
        'Herringbone Hatch (2 Colors)': 'Herringbone Hatch (2 Colors)',
        'Voronoi Mosaic (2 Colors)': 'Voronoi Mosaic (2 Colors)',
        'Moiré Op-Art (2 Colors)': 'Moiré Op-Art (2 Colors)',
        'Houndstooth Check (2 Colors)': 'Houndstooth Check (2 Colors)',
        'Turing Pattern (2 Colors)': 'Turing Pattern (2 Colors)',
        'Cellular Automata (2 Colors)': 'Cellular Automata (2 Colors)'
      },
      'bayer-matrix-select': {
        '2': '2x2 (Coarse / Large Pattern)',
        '4': '4x4 (Medium / Standard Pattern)',
        '8': '8x8 (Fine / Small Pattern)'
      },
      'color-distance-select': {
        'CIEDE2000': 'CIEDE2000 (Perceptual LAB)',
        'RGB': 'Euclidean RGB (Fast)'
      }
    },
    
    algoParams: {
      "Dot Spacing": "Dot Spacing",
      "Controls the grid spacing between halftone dots.": "Controls the grid spacing between halftone dots.",
      "Glitch Intensity": "Glitch Intensity",
      "Controls the frequency and displacement of glitches.": "Controls the frequency and displacement of glitches.",
      "Color Aberration": "Color Aberration",
      "Controls the red and blue channel shifting offset.": "Controls the red and blue channel shifting offset.",
      "Ripple Spacing": "Ripple Spacing",
      "Controls the distance between ripple concentric circles.": "Controls the distance between ripple concentric circles.",
      "Hatch Spacing": "Hatch Spacing",
      "Controls the spacing of the cross-hatch shading lines.": "Controls the spacing of the cross-hatch shading lines.",
      "Offset Distance": "Offset Distance",
      "Controls the displacement distance of the shadow stencil.": "Controls the displacement distance of the shadow stencil.",
      "Wave Amplitude": "Wave Amplitude",
      "Controls the vertical height of the Bargello flame wave.": "Controls the vertical height of the Bargello flame wave.",
      "Wave Scale": "Wave Scale",
      "Controls the frequency/wavelength of the stepped wave.": "Controls the frequency/wavelength of the stepped wave.",
      "Controls the size and grid period of the comic halftone dots.": "Controls the size and grid period of the comic halftone dots.",
      "Wave Spacing": "Wave Spacing",
      "Controls the vertical distance between the waves.": "Controls the vertical distance between the waves.",
      "Wave Meander": "Wave Meander",
      "Controls the waviness/displacement of the contour lines.": "Controls the waviness/displacement of the contour lines.",
      "Maze Block Size": "Maze Block Size",
      "Controls the thickness and grid spacing of the Truchet maze paths.": "Controls the thickness and grid spacing of the Truchet maze paths.",
      "Stipple Noise": "Stipple Noise",
      "Controls the graininess/noise spread of the stippling pattern.": "Controls the graininess/noise spread of the stippling pattern.",
      "Rib Width": "Rib Width",
      "Controls the width of the vertical columns in the cable-rib texture.": "Controls the width of the vertical columns in the cable-rib texture.",
      "Controls the spacing of herringbone diagonal lines.": "Controls the spacing of herringbone diagonal lines.",
      "Column Width": "Column Width",
      "Controls the width of the herringbone columns.": "Controls the width of the herringbone columns.",
      "Cell Size": "Cell Size",
      "Controls the size/scale of the Voronoi mosaic cells.": "Controls the size/scale of the Voronoi mosaic cells.",
      "Pattern Density": "Pattern Density",
      "Controls the thickness and density of Moiré interference stripes.": "Controls the thickness and density of Moiré interference stripes.",
      "Spiral Spacing": "Spiral Spacing",
      "Controls the spacing of spiral turns.": "Controls the spacing of spiral turns.",
      "Stripe Thickness": "Stripe Thickness",
      "Controls the row height thickness of the shadow illusion stripes.": "Controls the row height thickness of the shadow illusion stripes.",
      "Iterations": "Iterations",
      "Controls how many simulation steps the Turing reaction-diffusion runs.": "Controls how many simulation steps the Turing reaction-diffusion runs.",
      "Generations": "Generations",
      "Controls the number of cycles run in Conway's Game of Life.": "Controls the number of cycles run in Conway's Game of Life."
    },
    
    alerts: {
      CANVAS_EMPTY: "Upload an image to begin.",
      ALERT_WRONG_TYPE: "Please upload an image file (e.g., JPG, PNG, or WEBP).",
      ALERT_NO_IMAGE: "Please upload an image first!",
      ALERT_BAD_WIDTH: "Please enter a valid width (a number greater than 9).",
      ALERT_NO_CHART: "There is no chart to save!",
      ALERT_INVALID_BASE64: "Invalid base64 image data.",
      ALERT_INVALID_FORMAT: "Invalid image file format.",
      ALERT_HEIC_NOT_LOADED: "HEIC conversion library is not loaded. Please ensure you have an active internet connection.",
      ALERT_HEIC_FAILED: "Failed to convert HEIC image. Please upload a standard image format (JPG, PNG, WEBP).",
      ALERT_LOAD_FAILED: "Failed to load image file."
    },
    
    placeholders: {
      'pdf-pattern-title': 'Enter title for PDF...',
      'written-instructions-textarea': 'Upload an image to view written instructions...'
    }
  },
  pl: {
    'mobile-app-title': 'Generator Wzorów Dziewiarskich',
    'app-title': 'Generator Wzorów Dziewiarskich',
    'app-subtitle': 'Zamień dowolne zdjęcie w dziany wzór oczko po oczku z dynamicznym kalkulatorem włóczki',
    'sidebar-mobile-title': 'Ustawienia',
    'step-stitch-title': 'Ustawienia oczek',
    'chart-width-label': 'Szerokość (oczka)',
    'chart-width-help': 'Mniejsza liczba oczek tworzy bardziej uproszczony, geometryczny wzór. Wysokość zostanie dopasowana proporcjonalnie.',
    'chart-brightness-label': 'Jasność',
    'chart-contrast-label': 'Kontrast',
    'hist-eq-label': 'Automatyczny kontrast',
    'hist-eq-help': 'Stosuje wyrównanie histogramu w celu poprawy zakresu tonalnego wyblakłych obrazów przed przetworzeniem.',
    'chart-smoothing-label': 'Wygładzanie (Anti-Confetti)',
    'chart-smoothing-help': 'Usuwa pojedyncze, rozproszone oczka. 0 oznacza wyłączone, 1-3 zwiększa intensywność wygładzania z zachowaniem krawędzi.',
    'bilateral-label': 'Wygładzanie z zachowaniem krawędzi',
    'bilateral-help': 'Wygładza szum, zachowując ostre granice kolorów (0 = wyłączone, 1-5 = intensywność).',
    'kuwahara-label': 'Efekt malarski (Kuwahara)',
    'kuwahara-help': 'Upraszcza kształty do płaskich plam malarskich, zachowując ostre krawędzie (0 = wyłączone, 1-5 = intensywność).',
    'morph-cleanup-label': 'Oczyszczanie morfologiczne',
    'morph-cleanup-help': 'Wygładza granice kształtów za pomocą morfologii matematycznej. Otwarcie usuwa szum; Zamknięcie wypełnia luki.',
    'stitch-aspect-label': 'Proporcje oczka',
    'stitch-aspect-help': 'Prawdziwe oczka są szersze niż wyższe. Dostosowuje wyświetlanie, PDF i XLS do fizycznych proporcji.',
    'knitting-method-label': 'Metoda dziania',
    'knitting-method-help': 'Określa kierunek odczytu rzędów i konwersję oczek dla lewej strony robótki w pisemnej instrukcji.',
    'step-colors-title': 'Filtry i tryby kolorów',
    'color-mode-label': 'Algorytm koloru',
    'bayer-matrix-label': 'Skala tekstury Bayera',
    'bayer-matrix-help': 'Kontroluje rozmiar siatki wzoru ditheringu w stosunku do oczek.',
    'color-levels-label': 'Liczba kolorów (Poziomy)',
    'color-levels-help': 'Redukuje obraz do określonej liczby tonów barwnych.',
    'yarn-palette-label': 'Paleta kolorów włóczki',
    'yarn-palette-size-label': 'Kolory:',
    'yarn-color-1-label': 'Kolor 1',
    'yarn-color-2-label': 'Kolor 2',
    'yarn-color-3-label': 'Kolor 3',
    'yarn-color-4-label': 'Kolor 4',
    'yarn-color-5-label': 'Kolor 5',
    'yarn-color-6-label': 'Kolor 6',
    'yarn-color-7-label': 'Kolor 7',
    'yarn-color-8-label': 'Kolor 8',
    'color-distance-label': 'Dopasowanie kolorów',
    'stray-stitch-label': 'Usuwaj pojedyncze oczka',
    'stray-stitch-help': 'Automatycznie łączy pojedyncze, odosobnione oczka z dominującym sąsiednim kolorem w celu ułatwienia pracy.',
    'row-color-limit-label': 'Ogranicz kolory w rzędzie',
    'row-color-limit-max-label': 'Maks:',
    'row-color-limit-help': 'Ogranicza każdy rząd do maksymalnej liczby aktywnych kolorów włóczek w celu ułatwienia żakardu.',
    'step-actions-title': 'Generowanie i eksport',
    'pdf-pattern-title-label': 'Tytuł wzoru w PDF',
    'btn-generate': '<span class="btn-icon">⚡</span> Generuj schemat',
    'btn-download': '<span class="btn-icon">💾</span> Eksportuj schemat (PNG)',
    'btn-export-pdf': '<span class="btn-icon">📄</span> Eksportuj wzór (PDF)',
    'btn-export-xls': '<span class="btn-icon">📊</span> Eksportuj arkusz (XLS)',
    'btn-reset': '<span class="btn-icon">🔄</span> Resetuj aplikację',
    'preview-grid-title': 'Podgląd siatki oczek',
    'btn-change-image-canvas': '<span class="btn-icon">🔄</span> Zmień obraz',
    'btn-remove-image-canvas': '<span class="btn-icon">🗑️</span> Usuń obraz',
    'show-outlines-label': 'Pokaż linie siatki',
    'show-symbols-label': 'Pokaż symbole',
    'viewport-upload-primary': 'Przeciągnij i upuść obraz tutaj',
    'viewport-upload-secondary': 'lub kliknij, aby przeglądać pliki',
    'viewport-upload-limits': 'Obsługuje JPG, PNG, WEBP, HEIC',
    'loading-text': 'Przetwarzanie obrazu...',
    'yarn-calculator-title': 'Kalkulator zużycia włóczki',
    'yarn-calculator-desc': 'Poniższa lista wyświetla szacowaną liczbę oczek i potrzebne motki włóczki.',
    'yarn-stitch-length-label': 'Włóczka/Oczko (cm)',
    'yarn-skein-length-label': 'Metry/Motek',
    'written-instructions-title': 'Pisemna instrukcja',
    'written-instructions-desc': 'Postępuj zgodnie z poniższymi instrukcjami rząd po rzędzie, aby wydziergać ten wzór.',
    'btn-copy-instructions': 'Kopiuj tekst',
    
    selects: {
      'morph-cleanup-select': {
        'none': 'Brak',
        'erode': 'Erozja (Zwężanie)',
        'dilate': 'Dylatacja (Rozszerzanie)',
        'open': 'Otwarcie (Usuwanie małych punktów)',
        'close': 'Zamknięcie (Wypełnianie szczelin)'
      },
      'stitch-aspect-select': {
        '1.0': 'Kwadratowe (1:1)',
        '1.333': 'Ścieg standardowy (4:3)',
        '1.25': 'Ścieg skarpetkowy (5:4)',
        '1.2': 'Ścieg drobny (6:5)'
      },
      'knitting-method-select': {
        'flat': 'Płasko (tam i z powrotem)',
        'circular': 'Okrągło (w koło)'
      },
      'color-mode-select': {
        'Standard & Multi-Color Modes': 'Tryby standardowe i wielokolorowe',
        'Dithering & Texturing': 'Dithering i teksturowanie',
        'Artistic & Halftones': 'Artystyczne i półtony',
        'Geometric & Algorithmic Patterns': 'Wzory geometryczne i algorytmiczne',
        'Original Colors': 'Oryginalne kolory',
        'Custom Palette Mapping': 'Mapowanie własnej palety',
        'K-Means Color Reduction': 'Redukcja kolorów K-Means',
        'Octree Color Reduction': 'Redukcja kolorów Octree',
        'Color Reduction (Posterize)': 'Redukcja kolorów (Posterize)',
        'Bayer Ordered Dithering': 'Dithering uporządkowany Bayera',
        'Floyd-Steinberg Dithering': 'Dithering Floyda-Steinberga',
        'Atkinson Dithering': 'Dithering Atkinsona',
        'Stucki Dithering': 'Dithering Stuckiego',
        'Burkes Dithering': 'Dithering Burkesa',
        'Sierra Dithering': 'Dithering Sierra',
        'Jarvis-Judice-Ninke Dithering': 'Dithering Jarvisa-Judice\'a-Ninke',
        'Black & White (Threshold)': 'Czarno-biały (Próg)',
        'Halftone Dot Pattern': 'Halftone - wzór kropek',
        'Comic Halftone (2 Colors)': 'Halftone komiksowy (2 kolory)',
        'Ripple Halftone (2 Colors)': 'Halftone falisty (2 kolory)',
        'Spiral Halftone (2 Colors)': 'Halftone spiralny (2 kolory)',
        'Cross-Hatch Sketch (2 Colors)': 'Szkic krzyżowy (2 kolory)',
        'Ink Stippling (2 Colors)': 'Kropkowanie atramentem (2 kolory)',
        'Offset Stencil Pop Art (3 Colors)': 'Pop-art szablon z przesunięciem (3 kolory)',
        'Glitch Art Effect': 'Efekt Glitch Art',
        'Shadow Illusion (2 Colors)': 'Iluzja cienia (2 kolory)',
        'Bargello Wave (4 Colors)': 'Fala Bargello (4 kolory)',
        'Stained Glass Intarsia (5 Colors)': 'Intarsja witrażowa (5 kolorów)',
        'Contour Waves (2 Colors)': 'Fale konturowe (2 kolory)',
        'Truchet Maze (2 Colors)': 'Labirynt Trucheta (2 kolory)',
        'Cable-Rib Illusion (2 Colors)': 'Iluzja warkocza/ściągacza (2 kolory)',
        'Herringbone Hatch (2 Colors)': 'Jodełka (2 kolory)',
        'Voronoi Mosaic (2 Colors)': 'Mozaika Voronoia (2 kolory)',
        'Moiré Op-Art (2 Colors)': 'Op-art Moiré (2 kolory)',
        'Houndstooth Check (2 Colors)': 'Pepitka (2 kolory)',
        'Turing Pattern (2 Colors)': 'Wzór Turinga (2 kolory)',
        'Cellular Automata (2 Colors)': 'Automat komórkowy (2 kolory)'
      },
      'bayer-matrix-select': {
        '2': '2x2 (Gruby / Duży wzór)',
        '4': '4x4 (Średni / Standardowy wzór)',
        '8': '8x8 (Drobny / Mały wzór)'
      },
      'color-distance-select': {
        'CIEDE2000': 'CIEDE2000 (Percepcyjny LAB)',
        'RGB': 'Euklidesowy RGB (Szybki)'
      }
    },
    
    algoParams: {
      "Dot Spacing": "Odstępy kropek",
      "Controls the grid spacing between halftone dots.": "Kontroluje odstępy siatki między kropkami halftone.",
      "Glitch Intensity": "Intensywność glitchu",
      "Controls the frequency and displacement of glitches.": "Kontroluje częstotliwość i przesunięcie zakłóceń.",
      "Color Aberration": "Aberracja kolorów",
      "Controls the red and blue channel shifting offset.": "Kontroluje przesunięcie kanałów czerwonego i niebieskiego.",
      "Ripple Spacing": "Odstępy fal",
      "Controls the distance between ripple concentric circles.": "Kontroluje odległość między współśrodkowymi kręgami fal.",
      "Hatch Spacing": "Gęstość kreskowania",
      "Controls the spacing of the cross-hatch shading lines.": "Kontroluje odległość między liniami cieniowania kreskowego.",
      "Offset Distance": "Odległość przesunięcia",
      "Controls the displacement distance of the shadow stencil.": "Kontroluje odległość przesunięcia szablonu cienia.",
      "Wave Amplitude": "Amplituda fali",
      "Controls the vertical height of the Bargello flame wave.": "Kontroluje pionową wysokość płomienistej fali Bargello.",
      "Wave Scale": "Skala fali",
      "Controls the frequency/wavelength of the stepped wave.": "Kontroluje częstotliwość/długość fali schodkowej.",
      "Controls the size and grid period of the comic halftone dots.": "Kontroluje rozmiar i okres siatki kropek komiksowych.",
      "Wave Spacing": "Odstępy fal",
      "Controls the vertical distance between the waves.": "Kontroluje odległość pionową między falami.",
      "Wave Meander": "Falistość",
      "Controls the waviness/displacement of the contour lines.": "Kontroluje falistość/przesunięcie linii konturowych.",
      "Maze Block Size": "Rozmiar bloku labiryntu",
      "Controls the thickness and grid spacing of the Truchet maze paths.": "Kontroluje grubość i rozstaw siatki ścieżek labiryntu Trucheta.",
      "Stipple Noise": "Szum kropkowania",
      "Controls the graininess/noise spread of the stippling pattern.": "Kontroluje ziarnistość/rozproszenie szumu we wzorze kropkowania.",
      "Rib Width": "Szerokość ściągacza",
      "Controls the width of the vertical columns in the cable-rib texture.": "Kontroluje szerokość pionowych kolumn w teksturze warkoczowo-ściągaczowej.",
      "Controls the spacing of herringbone diagonal lines.": "Kontroluje odstępy między liniami ukośnymi jodełki.",
      "Column Width": "Szerokość kolumny",
      "Controls the width of the herringbone columns.": "Kontroluje szerokość kolumn jodełki.",
      "Cell Size": "Rozmiar komórki",
      "Controls the size/scale of the Voronoi mosaic cells.": "Kontroluje rozmiar/skalę komórek mozaiki Voronoia.",
      "Pattern Density": "Gęstość wzoru",
      "Controls the thickness and density of Moiré interference stripes.": "Kontroluje grubość i gęstość pasków interferencyjnych Moiré.",
      "Spiral Spacing": "Odstępy spirali",
      "Controls the spacing of spiral turns.": "Kontroluje odległość między zwojami spirali.",
      "Stripe Thickness": "Grubość paska",
      "Controls the row height thickness of the shadow illusion stripes.": "Kontroluje wysokość rzędu pasków iluzji cienia.",
      "Iterations": "Iteracje",
      "Controls how many simulation steps the Turing reaction-diffusion runs.": "Kontroluje liczbę kroków symulacji reakcji-dyfuzji Turinga.",
      "Generations": "Pokolenia",
      "Controls the number of cycles run in Conway's Game of Life.": "Kontroluje liczbę cykli uruchamianych w Grze w Życie Conwaya."
    },
    
    alerts: {
      CANVAS_EMPTY: "Załaduj obraz, aby rozpocząć.",
      ALERT_WRONG_TYPE: "Proszę załadować plik graficzny (np. JPG, PNG lub WEBP).",
      ALERT_NO_IMAGE: "Proszę najpierw załadować obraz!",
      ALERT_BAD_WIDTH: "Proszę podać poprawną szerokość (liczba większa niż 9).",
      ALERT_NO_CHART: "Brak schematu do zapisania!",
      ALERT_INVALID_BASE64: "Nieprawidłowe dane obrazu base64.",
      ALERT_INVALID_FORMAT: "Nieprawidłowy format pliku obrazu.",
      ALERT_HEIC_NOT_LOADED: "Biblioteka konwersji HEIC nie została załadowana. Upewnij się, że masz aktywne połączenie z Internetem.",
      ALERT_HEIC_FAILED: "Konwersja obrazu HEIC nie powiodła się. Proszę załadować obraz w standardowym formacie (JPG, PNG, WEBP).",
      ALERT_LOAD_FAILED: "Nie udało się załadować pliku obrazu."
    },
    
    placeholders: {
      'pdf-pattern-title': 'Wpisz tytuł dla PDF...',
      'written-instructions-textarea': 'Załaduj obraz, aby wyświetlić instrukcję...'
    }
  }
};


const ALGO_PARAMS = {
  [APP_STRINGS.MODE_HALFTONE]: {
    param1: { label: "Dot Spacing", min: 2, max: 16, value: 4, step: 1, help: "Controls the grid spacing between halftone dots." }
  },
  [APP_STRINGS.MODE_GLITCH]: {
    param1: { label: "Glitch Intensity", min: 1, max: 10, value: 5, step: 1, help: "Controls the frequency and displacement of glitches." },
    param2: { label: "Color Aberration", min: 0, max: 5, value: 2, step: 1, help: "Controls the red and blue channel shifting offset." }
  },
  [APP_STRINGS.MODE_RIPPLE]: {
    param1: { label: "Ripple Spacing", min: 3, max: 25, value: 6, step: 1, help: "Controls the distance between ripple concentric circles." }
  },
  [APP_STRINGS.MODE_HATCH]: {
    param1: { label: "Hatch Spacing", min: 3, max: 15, value: 5, step: 1, help: "Controls the spacing of the cross-hatch shading lines." }
  },
  [APP_STRINGS.MODE_STENCIL]: {
    param1: { label: "Offset Distance", min: 1, max: 15, value: 3, step: 1, help: "Controls the displacement distance of the shadow stencil." }
  },
  [APP_STRINGS.MODE_BARGELLO]: {
    param1: { label: "Wave Amplitude", min: 1, max: 15, value: 4, step: 1, help: "Controls the vertical height of the Bargello flame wave." },
    param2: { label: "Wave Scale", min: 5, max: 30, value: 10, step: 1, help: "Controls the frequency/wavelength of the stepped wave." }
  },
  [APP_STRINGS.MODE_COMIC]: {
    param1: { label: "Dot Spacing", min: 4, max: 24, value: 8, step: 1, help: "Controls the size and grid period of the comic halftone dots." }
  },
  [APP_STRINGS.MODE_WAVES]: {
    param1: { label: "Wave Spacing", min: 2, max: 16, value: 4, step: 1, help: "Controls the vertical distance between the waves." },
    param2: { label: "Wave Meander", min: 0, max: 10, value: 3, step: 1, help: "Controls the waviness/displacement of the contour lines." }
  },
  [APP_STRINGS.MODE_MAZE]: {
    param1: { label: "Maze Block Size", min: 3, max: 12, value: 4, step: 1, help: "Controls the thickness and grid spacing of the Truchet maze paths." }
  },
  [APP_STRINGS.MODE_STIPPLING]: {
    param1: { label: "Stipple Noise", min: 50, max: 350, value: 180, step: 1, help: "Controls the graininess/noise spread of the stippling pattern." }
  },
  [APP_STRINGS.MODE_CABLERIB]: {
    param1: { label: "Rib Width", min: 2, max: 12, value: 4, step: 1, help: "Controls the width of the vertical columns in the cable-rib texture." }
  },
  [APP_STRINGS.MODE_HERRINGBONE]: {
    param1: { label: "Hatch Spacing", min: 3, max: 12, value: 5, step: 1, help: "Controls the spacing of herringbone diagonal lines." },
    param2: { label: "Column Width", min: 4, max: 16, value: 6, step: 1, help: "Controls the width of the herringbone columns." }
  },
  [APP_STRINGS.MODE_VORONOI]: {
    param1: { label: "Cell Size", min: 4, max: 24, value: 8, step: 1, help: "Controls the size/scale of the Voronoi mosaic cells." }
  },
  [APP_STRINGS.MODE_MOIRE]: {
    param1: { label: "Pattern Density", min: 20, max: 150, value: 60, step: 1, help: "Controls the thickness and density of Moiré interference stripes." }
  },
  [APP_STRINGS.MODE_SPIRAL]: {
    param1: { label: "Spiral Spacing", min: 3, max: 25, value: 6, step: 1, help: "Controls the spacing of spiral turns." }
  },
  [APP_STRINGS.MODE_SHADOW]: {
    param1: { label: "Stripe Thickness", min: 1, max: 6, value: 2, step: 1, help: "Controls the row height thickness of the shadow illusion stripes." }
  },
  [APP_STRINGS.MODE_TURING]: {
    param1: { label: "Iterations", min: 2, max: 20, value: 8, step: 1, help: "Controls how many simulation steps the Turing reaction-diffusion runs." }
  },
  [APP_STRINGS.MODE_AUTOMATA]: {
    param1: { label: "Generations", min: 1, max: 15, value: 4, step: 1, help: "Controls the number of cycles run in Conway's Game of Life." }
  }
};

const DEFAULTS = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 600,
  GRID_ENABLED: false,
  OUTPUT_WIDTH: 200,
  COLOR1_PICKER: '#ffffff',
  COLOR2_PICKER: '#000000',
  YARN_COLORS: [
    '#ffffff',
    '#000000',
    '#dca1a1',
    '#a2a1dc',
    '#f3dfb6',
    '#bcf2f5',
    '#e3bcf5',
    '#d4d4d4'
  ],
  PALETTE_SIZE: 4
};

// Error diffusion matrices
const STUCKI_MATRIX = [
  { dx: 1, dy: 0, weight: 8 / 42 }, { dx: 2, dy: 0, weight: 4 / 42 },
  { dx: -2, dy: 1, weight: 2 / 42 }, { dx: -1, dy: 1, weight: 4 / 42 }, { dx: 0, dy: 1, weight: 8 / 42 }, { dx: 1, dy: 1, weight: 4 / 42 }, { dx: 2, dy: 1, weight: 2 / 42 },
  { dx: -2, dy: 2, weight: 1 / 42 }, { dx: -1, dy: 2, weight: 2 / 42 }, { dx: 0, dy: 2, weight: 4 / 42 }, { dx: 1, dy: 2, weight: 2 / 42 }, { dx: 2, dy: 2, weight: 1 / 42 }
];

const BURKES_MATRIX = [
  { dx: 1, dy: 0, weight: 8 / 32 }, { dx: 2, dy: 0, weight: 4 / 32 },
  { dx: -2, dy: 1, weight: 2 / 32 }, { dx: -1, dy: 1, weight: 4 / 32 }, { dx: 0, dy: 1, weight: 8 / 32 }, { dx: 1, dy: 1, weight: 4 / 32 }, { dx: 2, dy: 1, weight: 2 / 32 }
];

const SIERRA_MATRIX = [
  { dx: 1, dy: 0, weight: 5 / 32 }, { dx: 2, dy: 0, weight: 3 / 32 },
  { dx: -2, dy: 1, weight: 2 / 32 }, { dx: -1, dy: 1, weight: 4 / 32 }, { dx: 0, dy: 1, weight: 5 / 32 }, { dx: 1, dy: 1, weight: 4 / 32 }, { dx: 2, dy: 2, weight: 2 / 32 },
  { dx: -1, dy: 2, weight: 2 / 32 }, { dx: 0, dy: 2, weight: 3 / 32 }, { dx: 1, dy: 2, weight: 2 / 32 }
];

const JJN_MATRIX = [
  { dx: 1, dy: 0, weight: 7 / 48 }, { dx: 2, dy: 0, weight: 5 / 48 },
  { dx: -2, dy: 1, weight: 3 / 48 }, { dx: -1, dy: 1, weight: 5 / 48 }, { dx: 0, dy: 1, weight: 7 / 48 }, { dx: 1, dy: 1, weight: 5 / 48 }, { dx: 2, dy: 1, weight: 3 / 48 },
  { dx: -2, dy: 2, weight: 1 / 48 }, { dx: -1, dy: 2, weight: 3 / 48 }, { dx: 0, dy: 2, weight: 5 / 48 }, { dx: 1, dy: 2, weight: 3 / 48 }, { dx: 2, dy: 2, weight: 1 / 48 }
];

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

  let matrixSize = bayerMatrixSelect ? parseInt(bayerMatrixSelect.value) : 4;
  let matrix = bayer4x4;
  let maxDiv = 16.0;
  if (matrixSize === 2) {
    matrix = bayer2x2;
    maxDiv = 4.0;
  } else if (matrixSize === 8) {
    matrix = bayer8x8;
    maxDiv = 64.0;
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
    else if (mode === APP_STRINGS.MODE_PALETTE_MAPPING) {
      applyCustomPaletteMapping(processedImg, getActiveCustomColors());
    } 
    else if (mode === APP_STRINGS.MODE_OCTREE) {
      let levels = parseInt(colorLevelsInput.value);
      if (isNaN(levels) || levels < 2) levels = 2;
      if (levels > 255) levels = 255;
      applyOctreeQuantization(processedImg, levels);
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

function exportPDF() {
  if (!processedImg) {
    alert(APP_STRINGS.ALERT_NO_CHART);
    return;
  }
  
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });
  
  // PAGE 1: OVERVIEW COVER PAGE
  
  // 1. Draw header title
  let patternTitle = document.getElementById('pdf-pattern-title').value || "My Knitting Project";
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.setTextColor(44, 53, 49); // forest slate
  doc.text(patternTitle.toUpperCase(), 105, 40, { align: "center" });
  
  // 2. Draw Subtitle
  let dateStr = new Date().toLocaleDateString();
  let subtitle = currentLanguage === 'pl'
    ? `Utworzono: ${dateStr}  |  Rozmiar siatki: ${processedImg.width} x ${processedImg.height} oczek`
    : `Generated on ${dateStr}  |  Grid size: ${processedImg.width} x ${processedImg.height} stitches`;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(100, 117, 109); // slate-muted
  doc.text(subtitle, 105, 48, { align: "center" });
  
  // Divider line
  doc.setDrawColor(232, 226, 214); // sand border
  doc.setLineWidth(0.5);
  doc.line(20, 55, 190, 55);
  
  // 3. Draw Thumbnail image
  let thumbSrc = document.getElementById('thumbnail-img').src;
  if (thumbSrc && !thumbSrc.startsWith('data:image/gif')) {
    let imgW = 80;
    let imgH = 60;
    let imgX = (210 - imgW) / 2;
    let format = 'JPEG';
    if (thumbSrc.startsWith('data:image/png')) {
      format = 'PNG';
    } else if (thumbSrc.startsWith('data:image/webp')) {
      format = 'WEBP';
    }
    try {
      doc.addImage(thumbSrc, format, imgX, 65, imgW, imgH);
      
      // Border around thumbnail
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.2);
      doc.rect(imgX, 65, imgW, imgH, "S");
    } catch (err) {
      console.error("Failed to add thumbnail to PDF", err);
    }
  }
  
  // 4. Yarn Consumption Legend Card
  let startY = 140;
  let swatches = getSwatchesData();
  let numSwatches = swatches.length;
  let rowsOfSwatches = Math.ceil(Math.min(16, numSwatches) / 2);
  let cardH = 20 + rowsOfSwatches * 10;
  if (cardH < 45) cardH = 45; // safe minimum
  
  doc.setFillColor(249, 247, 243); // warm light sand bg
  doc.setDrawColor(232, 226, 214); // sand border
  doc.rect(20, startY, 170, cardH, "FD"); // draw card wrapper dynamically
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(44, 53, 49);
  doc.text(currentLanguage === 'pl' ? "KALKULATOR ZUŻYCIA WŁÓCZKI" : "YARN CONSUMPTION CALCULATOR", 30, startY + 12);
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  
  let stitchLength = (calcStitchLengthInput && parseFloat(calcStitchLengthInput.value)) || 3.0;
  let skeinLength = (calcSkeinLengthInput && parseFloat(calcSkeinLengthInput.value)) || 200;

  swatches.forEach((sw, idx) => {
    let isCol2 = idx >= 8;
    let colX = isCol2 ? 110 : 30;
    let colY = isCol2 ? (startY + 24 + (idx - 8) * 10) : (startY + 24 + idx * 10);
    
    if (idx < 16) { // support up to 16 colors (2 columns of 8)
      let rgb = hexToRgb(sw.hex);
      doc.setFillColor(rgb[0], rgb[1], rgb[2]);
      doc.rect(colX, colY - 5, 8, 8, "F");
      
      // Swatch outline
      doc.setDrawColor(200, 200, 200);
      doc.setLineWidth(0.15);
      doc.rect(colX, colY - 5, 8, 8, "S");
      
      doc.setTextColor(44, 53, 49);
      doc.text(`${sw.hex}`, colX + 12, colY + 1);
      
      doc.setTextColor(100, 117, 109);
      let totalMeters = (sw.count * stitchLength) / 100;
      let skeins = Math.ceil(totalMeters / skeinLength);
      let stsLabel = currentLanguage === 'pl' ? "o." : "sts";
      let skLabel = currentLanguage === 'pl' ? "mot." : "sk";
      doc.text(`${sw.count.toLocaleString()} ${stsLabel} (~${totalMeters.toFixed(1)} m, ${skeins} ${skLabel})`, colX + 34, colY + 1);
    }
  });

  // 5. Draw Stitch Glossary Key Card (if symbols are mapped and enabled)
  let activeSymbols = Array.from(new Set(Object.values(symbolMap))).filter(s => s !== 'none');
  if (activeSymbols.length > 0 && symbolsCheckbox.checked) {
    let glossY = startY + cardH + 6;
    let glossH = 14 + Math.ceil(activeSymbols.length / 2) * 8;
    
    doc.setFillColor(249, 247, 243); // warm light sand bg
    doc.setDrawColor(232, 226, 214); // sand border
    doc.rect(20, glossY, 170, glossH, "FD"); // draw card wrapper
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(44, 53, 49);
    doc.text(currentLanguage === 'pl' ? "SŁOWNICZEK SYMBOLI ŚCIEGÓW" : "STITCH SYMBOLS GLOSSARY", 30, glossY + 9);
    
    doc.setFont("helvetica", "normal");
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
  doc.setFont("helvetica", "italic");
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
  let aspect = (stitchAspectSelect && parseFloat(stitchAspectSelect.value)) || 1.0;
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
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(44, 53, 49);
  doc.text(currentLanguage === 'pl' ? "SCHEMAT WZORU DZIEWIARSKIEGO" : "STITCH PATTERN CHART", 105, gridY - 18, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 117, 109);
  doc.text(currentLanguage === 'pl' ? "Czytaj schemat od dołu do góry. Kolumny liczy się od prawej do lewej." : "Read chart from bottom-to-top. Columns count right-to-left.", 105, gridY - 13, { align: "center" });
  
  let adjustedGrid = [];
  if (symbolsCheckbox.checked) {
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
      if (symbolsCheckbox.checked && adjustedGrid && adjustedGrid[y]) {
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
  doc.setFont("helvetica", "normal");
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
  doc.addPage();
  
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(44, 53, 49);
  doc.text(currentLanguage === 'pl' ? "PISEMNA INSTRUKCJA" : "WRITTEN INSTRUCTIONS", 105, 25, { align: "center" });
  
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(50, 50, 50);
  
  let instructionsText = writtenInstructionsTextarea ? writtenInstructionsTextarea.value : "";
  if (instructionsText) {
    let lines = doc.splitTextToSize(instructionsText, 170); // 170 mm print width
    let startY = 35;
    let pageHeight = 297;
    let margin = 20;
    
    lines.forEach(line => {
      if (startY > pageHeight - margin) {
        doc.addPage();
        doc.setFont("helvetica", "normal");
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

  let aspect = (stitchAspectSelect && parseFloat(stitchAspectSelect.value)) || 1.0;
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
    mode === APP_STRINGS.MODE_AUTOMATA
  ) {
    levelsBox.style.display = 'none';
    customPaletteBox.style.display = 'block';
    if (mode === APP_STRINGS.MODE_PALETTE_MAPPING) {
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
