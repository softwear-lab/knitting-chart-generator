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
  MODE_LAPLACIAN: 'Laplacian Edge (2 Colors)',
  MODE_CANNY: 'Canny Edge Detector (2 Colors)',
  MODE_LOG: 'Laplacian of Gaussian (LoG) (2 Colors)',
  MODE_MEDIAN_OTSU: 'Median Blur + Otsu (2 Colors)',
  MODE_CONTOUR: 'Contour Tracing / Topography (2 Colors)',
  MODE_DOG: 'Difference of Gaussians - DoG (2 Colors)',
  MODE_SOBEL: 'Sobel Operator (2 Colors)',
  MODE_ADAPTIVE_THRESHOLD: 'Adaptive Thresholding (2 Colors)',
  MODE_HPF: 'High-Pass Filter (2 Colors)',
  MODE_PREWITT: 'Prewitt Filter (2 Colors)',
  MODE_BLUE_NOISE: 'Blue Noise Dithering (2 Colors)',
  MODE_SUPERPIXELS: 'Superpixels',
  MODE_BILATERAL_MODE: 'Bilateral Filter',
  MODE_ANISOTROPIC: 'Anisotropic Diffusion',
  MODE_DOM: 'Difference of Medians (2 Colors)',
  MODE_RIDGE: 'Binarization Ridge Detection (2 Colors)',
  MODE_VECTOR_QUANTIZATION: 'Vector Quantization',


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
    'btn-toggle-drawer': '☰ Settings',
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
    'btn-rotate-colors': '⟳ Rotate',
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
    'step-actions-title': 'Export',
    'pdf-pattern-title-label': 'Pattern PDF Title',
    'btn-generate': '<span class="btn-icon">⚡</span> Generate Chart',
    'btn-download': '<span class="btn-icon">💾</span> Export Chart (PNG)',
    'btn-export-pdf': '<span class="btn-icon">📄</span> Export Pattern (PDF)',
    'btn-export-xls': '<span class="btn-icon">📊</span> Export Spreadsheet (XLS)',
    'btn-reset': '<span class="btn-icon">🔄</span> Reset App',
    'opt-export-placeholder': '📥 Export...',
    'opt-export-png': '💾 Export PNG',
    'opt-export-pdf': '📄 Export PDF',
    'opt-export-xls': '📊 Export XLS',
    'pdf-options-label': 'PDF Export Options',
    'pdf-include-yarn-label': 'Include Yarn Usage',
    'pdf-include-instructions-label': 'Include Written Instructions',
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
        'Bilateral Filter': 'Bilateral Filter',
        'Bayer Ordered Dithering': 'Bayer Ordered Dithering',
        'Floyd-Steinberg Dithering': 'Floyd-Steinberg Dithering',
        'Atkinson Dithering': 'Atkinson Dithering',
        'Stucki Dithering': 'Stucki Dithering',
        'Burkes Dithering': 'Burkes Dithering',
        'Sierra Dithering': 'Sierra Dithering',
        'Jarvis-Judice-Ninke Dithering': 'Jarvis-Judice-Ninke Dithering',
        'Black & White (Threshold)': 'Black & White (Threshold)',
        'Blue Noise Dithering (2 Colors)': 'Blue Noise Dithering (2 Colors)',
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
        'Cellular Automata (2 Colors)': 'Cellular Automata (2 Colors)',
        'Laplacian Edge (2 Colors)': 'Laplacian Edge (2 Colors)',
        'Canny Edge Detector (2 Colors)': 'Canny Edge Detector (2 Colors)',
        'Laplacian of Gaussian (LoG) (2 Colors)': 'Laplacian of Gaussian (LoG) (2 Colors)',
        'Median Blur + Otsu (2 Colors)': 'Median Blur + Otsu (2 Colors)',
        'Contour Tracing / Topography (2 Colors)': 'Contour Tracing / Topography (2 Colors)',
        'Difference of Gaussians - DoG (2 Colors)': 'Difference of Gaussians - DoG (2 Colors)',
        'Sobel Operator (2 Colors)': 'Sobel Operator (2 Colors)',
        'Adaptive Thresholding (2 Colors)': 'Adaptive Thresholding (2 Colors)',
        'High-Pass Filter (2 Colors)': 'High-Pass Filter (2 Colors)',
        'Prewitt Filter (2 Colors)': 'Prewitt Filter (2 Colors)',
        'Superpixels': 'Superpixels',
        'Anisotropic Diffusion': 'Anisotropic Diffusion',
        'Difference of Medians (2 Colors)': 'Difference of Medians (2 Colors)',
        'Binarization Ridge Detection (2 Colors)': 'Binarization Ridge Detection (2 Colors)',
        'Vector Quantization': 'Vector Quantization'
      },
      'bayer-matrix-select': {
        '2': '2x2 (Coarse / Large Pattern)',
        '4': '4x4 (Medium / Standard Pattern)',
        '8': '8x8 (Fine / Small Pattern)',
        '12': '12x12 (Ultra Fine / Very Small Pattern)'
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
      "Controls the number of cycles run in Conway's Game of Life.": "Controls the number of cycles run in Conway's Game of Life.",
      "High Threshold": "High Threshold",
      "High hysteresis threshold for strong edge seeds.": "High hysteresis threshold for strong edge seeds.",
      "Low Threshold": "Low Threshold",
      "Low hysteresis threshold for tracing weak edges.": "Low hysteresis threshold for tracing weak edges.",
      "LoG Sigma": "LoG Sigma",
      "Standard deviation of prior Gaussian smoothing blur.": "Standard deviation of prior Gaussian smoothing blur.",
      "LoG Threshold": "LoG Threshold",
      "Brightness threshold for Laplacian response edges.": "Brightness threshold for Laplacian response edges.",
      "Width/height of spatial blocks grouped into vectors.": "Width/height of spatial blocks grouped into vectors.",
      "Codebook Size": "Codebook Size",
      "Number of representative block patterns in the codebook.": "Number of representative block patterns in the codebook."
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
    'btn-toggle-drawer': '☰ Ustawienia',
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
    'btn-rotate-colors': '⟳ Obróć',
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
    'step-actions-title': 'Eksport',
    'pdf-pattern-title-label': 'Tytuł wzoru w PDF',
    'btn-generate': '<span class="btn-icon">⚡</span> Generuj schemat',
    'btn-download': '<span class="btn-icon">💾</span> Eksportuj schemat (PNG)',
    'btn-export-pdf': '<span class="btn-icon">📄</span> Eksportuj wzór (PDF)',
    'btn-export-xls': '<span class="btn-icon">📊</span> Eksportuj arkusz (XLS)',
    'btn-reset': '<span class="btn-icon">🔄</span> Resetuj aplikację',
    'opt-export-placeholder': '📥 Eksportuj...',
    'opt-export-png': '💾 Eksportuj PNG',
    'opt-export-pdf': '📄 Eksportuj PDF',
    'opt-export-xls': '📊 Eksportuj XLS',
    'pdf-options-label': 'Opcje eksportu PDF',
    'pdf-include-yarn-label': 'Uwzględnij zużycie włóczki',
    'pdf-include-instructions-label': 'Uwzględnij instrukcje opisowe',
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
        'Bilateral Filter': 'Filtr bilateralny',
        'Bayer Ordered Dithering': 'Dithering uporządkowany Bayera',
        'Floyd-Steinberg Dithering': 'Dithering Floyda-Steinberga',
        'Atkinson Dithering': 'Dithering Atkinsona',
        'Stucki Dithering': 'Dithering Stuckiego',
        'Burkes Dithering': 'Dithering Burkesa',
        'Sierra Dithering': 'Dithering Sierra',
        'Jarvis-Judice-Ninke Dithering': 'Dithering Jarvisa-Judice\'a-Ninke',
        'Black & White (Threshold)': 'Czarno-biały (Próg)',
        'Blue Noise Dithering (2 Colors)': 'Dithering niebieskim szumem (2 kolory)',
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
        'Cellular Automata (2 Colors)': 'Automat komórkowy (2 kolory)',
        'Laplacian Edge (2 Colors)': 'Krawędzie Laplace\'a (2 kolory)',
        'Canny Edge Detector (2 Colors)': 'Detektor krawędzi Canny\'ego (2 kolory)',
        'Laplacian of Gaussian (LoG) (2 Colors)': 'Laplacian z rozmyciem Gaussa (LoG) (2 kolory)',
        'Median Blur + Otsu (2 Colors)': 'Rozmycie medianowe + Otsu (2 kolory)',
        'Contour Tracing / Topography (2 Colors)': 'Rysowanie konturów / Topografia (2 kolory)',
        'Difference of Gaussians - DoG (2 Colors)': 'Różnica Gaussianów - DoG (2 kolory)',
        'Sobel Operator (2 Colors)': 'Operator Sobela (2 kolory)',
        'Adaptive Thresholding (2 Colors)': 'Progowanie adaptacyjne (2 kolory)',
        'High-Pass Filter (2 Colors)': 'Filtr górnoprzepustowy (2 kolory)',
        'Prewitt Filter (2 Colors)': 'Filtr Prewitta (2 kolory)',
        'Superpixels': 'Superpiksele',
        'Anisotropic Diffusion': 'Dyfuzja anizotropowa',
        'Difference of Medians (2 Colors)': 'Różnica median (2 kolory)',
        'Binarization Ridge Detection (2 Colors)': 'Detekcja grzbietów z binaryzacją (2 kolory)',
        'Vector Quantization': 'Kwantyzacja wektorowa'
      },
      'bayer-matrix-select': {
        '2': '2x2 (Gruby / Duży wzór)',
        '4': '4x4 (Średni / Standardowy wzór)',
        '8': '8x8 (Drobny / Mały wzór)',
        '12': '12x12 (Bardzo drobny / Bardzo mały wzór)'
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
      "Controls the number of cycles run in Conway's Game of Life.": "Kontroluje liczbę cykli uruchamianych w Grze w Życie Conwaya.",
      "Edge Strength": "Siła krawędzi",
      "Multiplier to amplify the edge gradients.": "Mnożnik wzmacniający gradienty krawędzi.",
      "Edge Threshold": "Próg krawędzi",
      "Brightness threshold to register a pixel as an edge.": "Próg jasności, powyżej którego piksel jest uznawany za krawędź.",
      "Median Radius": "Promień mediany",
      "Controls the radius of the median filter window.": "Kontroluje promień okna filtra medianowego.",
      "Otsu Multiplier": "Mnożnik Otsu",
      "Scale multiplier for the calculated Otsu threshold.": "Mnożnik skali dla obliczonego progu Otsu.",
      "Contour Count": "Liczba konturów",
      "Number of topographical elevation levels.": "Liczba topograficznych poziomów wysokości.",
      "Line Width": "Szerokość linii",
      "Thickness of contour outline lines.": "Grubość linii konturowych.",
      "Inner Sigma": "Wewnętrzna sigma",
      "Standard deviation of the narrow Gaussian blur.": "Odchylenie standardowe wąskiego rozmycia Gaussa.",
      "Outer Sigma": "Zewnętrzna sigma",
      "Standard deviation of the wide Gaussian blur.": "Odchylenie standardowe szerokiego rozmycia Gaussa.",
      "Sobel Threshold": "Próg Sobela",
      "Brightness gradient threshold for Sobel edge detection.": "Próg gradientu jasności dla detekcji krawędzi Sobela.",
      "Block Size": "Rozmiar bloku",
      "Size of local neighborhood for adaptive thresholding.": "Rozmiar lokalnego otoczenia dla progowania adaptacyjnego.",
      "Offset Constant": "Stała przesunięcia",
      "Constant value subtracted from the local mean.": "Stała wartość odejmowana od średniej lokalnej.",
      "Cutoff Radius": "Promień odcięcia",
      "Blur radius determining high-pass frequency cutoff.": "Promień rozmycia określający odcięcie częstotliwości.",
      "HPF Threshold": "Próg HPF",
      "Binarization threshold for high-pass edge response.": "Próg binaryzacji dla odpowiedzi krawędziowej filtra.",
      "Prewitt Threshold": "Próg Prewitta",
      "Brightness gradient threshold for Prewitt edge detection.": "Próg gradientu jasności dla detekcji krawędzi Prewitta.",
      "Dither Intensity": "Intensywność ditheringu",
      "Density/intensity of the blue noise dither noise.": "Gęstość/intensywność niebieskiego szumu ditheringu.",
      "Noise Scale": "Skala szumu",
      "Pixel grid scale of the dither texture.": "Skala siatki pikseli tekstury ditheringu.",
      "Superpixel Size": "Rozmiar superpiksela",
      "Average block size of clustered superpixels.": "Średni rozmiar bloku zgrupowanych superpikseli.",
      "Compactness": "Kompaktowość",
      "Balance between shape regularity and color similarity.": "Równowaga między regularnością kształtu a podobieństwem kolorów.",
      "Spatial Sigma": "Sigma przestrzenna",
      "Standard deviation of spatial blur domain (radius).": "Odchylenie standardowe domeny przestrzennej (promień).",
      "Range Sigma": "Sigma przedziału",
      "Standard deviation of range color domain (sensitivity).": "Odchylenie standardowe domeny kolorów (czułość krawędzi).",
      "Diffusion Steps": "Kroki dyfuzji",
      "Number of iterations for anisotropic diffusion smoothing.": "Liczba iteracji wygładzania dyfuzją anizotropową.",
      "Kappa Threshold": "Próg Kappa",
      "Conduction edge threshold for anisotropic diffusion.": "Próg przewodnictwa krawędzi dla dyfuzji anizotropowej.",
      "Small Radius": "Mały promień",
      "Radius of the small median filter window.": "Promień małego okna filtra medianowego.",
      "Large Radius": "Duży promień",
      "Radius of the large median filter window.": "Promień dużego okna filtra medianowego.",
      "Ridge Strength": "Siła grzbietów",
      "Gradient multiplier for ridge curvature detection.": "Mnożnik gradientu do detekcji krzywizny grzbietów.",
      "Ridge Threshold": "Próg grzbietów",
      "Binarization threshold for ridge outputs.": "Próg binaryzacji dla wyjścia detekcji grzbietów.",
      "High Threshold": "Próg wysoki",
      "High hysteresis threshold for strong edge seeds.": "Wysoki próg histerezy dla silnych punktów krawędzi.",
      "Low Threshold": "Próg niski",
      "Low hysteresis threshold for tracing weak edges.": "Niski próg histerezy do śledzenia słabych krawędzi.",
      "LoG Sigma": "Sigma LoG",
      "Standard deviation of prior Gaussian smoothing blur.": "Odchylenie standardowe wstępnego rozmycia Gaussa.",
      "LoG Threshold": "Próg LoG",
      "Brightness threshold for Laplacian response edges.": "Próg jasności dla odpowiedzi krawędziowej Laplacian.",
      "Width/height of spatial blocks grouped into vectors.": "Szerokość/wysokość bloków przestrzennych grupowanych w wektory.",
      "Codebook Size": "Rozmiar słownika",
      "Number of representative block patterns in the codebook.": "Liczba reprezentatywnych wzorów bloków w słowniku kodowym."
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
  },
  [APP_STRINGS.MODE_LAPLACIAN]: {
    param1: { label: "Edge Strength", min: 1, max: 15, value: 4, step: 1, help: "Multiplier to amplify the edge gradients." },
    param2: { label: "Edge Threshold", min: 5, max: 150, value: 45, step: 5, help: "Brightness threshold to register a pixel as an edge." }
  },
  [APP_STRINGS.MODE_MEDIAN_OTSU]: {
    param1: { label: "Median Radius", min: 1, max: 5, value: 2, step: 1, help: "Controls the radius of the median filter window." },
    param2: { label: "Otsu Multiplier", min: 0.5, max: 1.5, value: 1.0, step: 0.1, help: "Scale multiplier for the calculated Otsu threshold." }
  },
  [APP_STRINGS.MODE_CONTOUR]: {
    param1: { label: "Contour Count", min: 3, max: 20, value: 8, step: 1, help: "Number of topographical elevation levels." },
    param2: { label: "Line Width", min: 1, max: 3, value: 1, step: 1, help: "Thickness of contour outline lines." }
  },
  [APP_STRINGS.MODE_DOG]: {
    param1: { label: "Inner Sigma", min: 0.5, max: 4.0, value: 1.0, step: 0.1, help: "Standard deviation of the narrow Gaussian blur." },
    param2: { label: "Outer Sigma", min: 1.0, max: 8.0, value: 2.0, step: 0.1, help: "Standard deviation of the wide Gaussian blur." }
  },
  [APP_STRINGS.MODE_SOBEL]: {
    param1: { label: "Edge Strength", min: 1, max: 10, value: 3, step: 1, help: "Multiplier to amplify the edge gradients." },
    param2: { label: "Sobel Threshold", min: 5, max: 200, value: 50, step: 5, help: "Brightness gradient threshold for Sobel edge detection." }
  },
  [APP_STRINGS.MODE_ADAPTIVE_THRESHOLD]: {
    param1: { label: "Block Size", min: 3, max: 31, value: 15, step: 2, help: "Size of local neighborhood for adaptive thresholding." },
    param2: { label: "Offset Constant", min: -20, max: 20, value: 5, step: 1, help: "Constant value subtracted from the local mean." }
  },
  [APP_STRINGS.MODE_HPF]: {
    param1: { label: "Cutoff Radius", min: 1, max: 15, value: 5, step: 1, help: "Blur radius determining high-pass frequency cutoff." },
    param2: { label: "HPF Threshold", min: 100, max: 150, value: 128, step: 1, help: "Binarization threshold for high-pass edge response." }
  },
  [APP_STRINGS.MODE_PREWITT]: {
    param1: { label: "Edge Strength", min: 1, max: 10, value: 4, step: 1, help: "Multiplier to amplify the edge gradients." },
    param2: { label: "Prewitt Threshold", min: 5, max: 200, value: 45, step: 5, help: "Brightness gradient threshold for Prewitt edge detection." }
  },
  [APP_STRINGS.MODE_BLUE_NOISE]: {
    param1: { label: "Dither Intensity", min: 0, max: 100, value: 50, step: 5, help: "Density/intensity of the blue noise dither noise." },
    param2: { label: "Noise Scale", min: 1, max: 4, value: 1, step: 1, help: "Pixel grid scale of the dither texture." }
  },
  [APP_STRINGS.MODE_SUPERPIXELS]: {
    param1: { label: "Superpixel Size", min: 4, max: 24, value: 8, step: 1, help: "Average block size of clustered superpixels." },
    param2: { label: "Compactness", min: 1, max: 40, value: 10, step: 1, help: "Balance between shape regularity and color similarity." }
  },
  [APP_STRINGS.MODE_BILATERAL_MODE]: {
    param1: { label: "Spatial Sigma", min: 1, max: 8, value: 3, step: 1, help: "Standard deviation of spatial blur domain (radius)." },
    param2: { label: "Range Sigma", min: 5, max: 100, value: 25, step: 5, help: "Standard deviation of range color domain (sensitivity)." }
  },
  [APP_STRINGS.MODE_ANISOTROPIC]: {
    param1: { label: "Diffusion Steps", min: 1, max: 15, value: 5, step: 1, help: "Number of iterations for anisotropic diffusion smoothing." },
    param2: { label: "Kappa Threshold", min: 5, max: 80, value: 20, step: 1, help: "Conduction edge threshold for anisotropic diffusion." }
  },
  [APP_STRINGS.MODE_DOM]: {
    param1: { label: "Small Radius", min: 1, max: 3, value: 1, step: 1, help: "Radius of the small median filter window." },
    param2: { label: "Large Radius", min: 2, max: 6, value: 3, step: 1, help: "Radius of the large median filter window." }
  },
  [APP_STRINGS.MODE_RIDGE]: {
    param1: { label: "Ridge Strength", min: 1, max: 10, value: 4, step: 1, help: "Gradient multiplier for ridge curvature detection." },
    param2: { label: "Ridge Threshold", min: 5, max: 100, value: 20, step: 1, help: "Binarization threshold for ridge outputs." }
  },
  [APP_STRINGS.MODE_CANNY]: {
    param1: { label: "High Threshold", min: 10, max: 200, value: 50, step: 5, help: "High hysteresis threshold for strong edge seeds." },
    param2: { label: "Low Threshold", min: 5, max: 100, value: 20, step: 5, help: "Low hysteresis threshold for tracing weak edges." }
  },
  [APP_STRINGS.MODE_LOG]: {
    param1: { label: "LoG Sigma", min: 0.5, max: 4.0, value: 1.5, step: 0.1, help: "Standard deviation of prior Gaussian smoothing blur." },
    param2: { label: "LoG Threshold", min: 5, max: 150, value: 30, step: 5, help: "Brightness threshold for Laplacian response edges." }
  },
  [APP_STRINGS.MODE_VECTOR_QUANTIZATION]: {
    param1: { label: "Block Size", min: 2, max: 4, value: 2, step: 1, help: "Width/height of spatial blocks grouped into vectors." },
    param2: { label: "Codebook Size", min: 4, max: 32, value: 16, step: 4, help: "Number of representative block patterns in the codebook." }
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

