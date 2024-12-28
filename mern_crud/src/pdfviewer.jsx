import React, { useState } from 'react';

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

// Default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function openPDF() {
  const url = 'http://localhost:3001/api/pdf/view/676da305490b3d5c4b951c78'; // URL to the Node.js server endpoint
  window.open(url, '_blank'); // Opens in a new tab
}

function pdfviewer() {
  return (
      <div>
          <button onClick={openPDF}>View PDF</button>
      </div>
  );
}

export default pdfviewer;
