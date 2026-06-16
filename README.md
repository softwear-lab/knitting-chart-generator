# Knitting Chart Generator

The **Knitting Chart Generator** is a comprehensive, client-side web application designed to convert standard images into actionable, stitch-by-stitch knitting charts. It goes beyond simple pixelation by offering an extensive suite of image processing filters—including Error Diffusion Dithering (Floyd-Steinberg, Atkinson), K-Means color reduction, Kuwahara block painting, and stylistic effects like Voronoi Mosaics and Halftones.

Designed with real-world crafting in mind, the application provides practical utilities to help knitters plan and execute their projects efficiently.

### Key Features

* **Pattern Generation & Text Output:** Automatically translates visual charts into row-by-row written instructions, supporting both flat (back and forth) and circular (in the round) knitting methods.
* **Dynamic Yarn Calculator:** Estimates yarn consumption (in meters and skeins) based on customizable user inputs for stitch length and skein size.
* **Machine Knitting Support:** Includes a dedicated AYAB Machine Lace Mode that expands patterns into separate L-carriage transfer passes and K-carriage knitting passes for electronic knitting machines.
* **Multiple Export Formats:** Users can export their final designs as PNG images, formatted Excel (XLS) spreadsheets, or multi-page PDF documents complete with a cover page, stitch glossary, and yarn consumption legend.

### Technical Implementation & Repository Structure

The repository is built entirely as a static, front-end application utilizing HTML, CSS, and vanilla JavaScript, ensuring that all processing happens locally in the user's browser.

The technical stack heavily relies on:

* **p5.js:** Powers the core canvas rendering engine and handles the heavy pixel array manipulation required for the image processing algorithms.
* **jsPDF:** Facilitates the dynamic construction and local downloading of the comprehensive PDF pattern documents.
* **heic-to:** An integrated library that provides native support for uploading HEIC image formats, making it seamless for iOS users.