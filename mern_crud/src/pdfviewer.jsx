import React, { useState } from 'react'; 
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// Importing multiple PDFs from local assets
import pdf1 from "./assets/Proper_Solid_Waste_Management.pdf"; 
import pdf2 from "./assets/OM_NO._OIC-004-2024.pdf";
import pdf3 from "./assets/OM_NO._PHDR-104-2024.pdf";
import pdf4 from "./assets/OM-NO.2s_2024.pdf";

function PdfViewer() {
  const [currentPdf, setCurrentPdf] = useState(pdf1); // Default PDF
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div className="container">
      <h3>View PDF from Local Assets</h3>

      {/* Buttons to select different PDFs */}
      <div>
        <button onClick={() => setCurrentPdf(pdf1)}>View PDF 1</button>
        <button onClick={() => setCurrentPdf(pdf2)}>View PDF 2</button>
        <button onClick={() => setCurrentPdf(pdf3)}>View PDF 3</button>
        <button onClick={() => setCurrentPdf(pdf4)}>View PDF 4</button>
      </div>

      <div className="viewer" style={{ border: '1px solid #000', height: '600px' }}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
          <Viewer fileUrl={currentPdf} plugins={[defaultLayoutPluginInstance]} />
        </Worker>
      </div>
    </div>
  );
}

export default PdfViewer;
