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

function pdfviewer() {
  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // We'll store the object URL for our PDF blob here
  const [pdfFileUrl, setPdfFileUrl] = useState(null);
  const [error, setError] = useState(null);

  // Example: Suppose we have a PDF in DB with ID = '64b63ad5c1a86f8d2f1cabc3'
  // In a real-world app, you'd dynamically get this ID or let the user select it.
  const pdfId = '676da305490b3d5c4b951c78';

  // A button to fetch the PDF from your backend on demand
  const handleFetchPdf = async () => {
    try {
      setError(null); // reset any previous error
      // Replace with your actual API endpoint (e.g., /api/pdf/view/:id)
      const response = await fetch(`/api/pdf/view/${pdfId}`);
      if (!response.ok) {
        throw new Error('Could not fetch PDF file');
      }
      // Get the data as a Blob
      const pdfBlob = await response.blob();
      // Convert Blob to an object URL
      const pdfUrl = URL.createObjectURL(pdfBlob);
      // Store for display
      setPdfFileUrl(pdfUrl);
    } catch (err) {
      setError(err.message);
    }
  };


  return (
    <div className="container">
      <h3>View PDF from MongoDB</h3>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Button to fetch the PDF on demand */}
      <button onClick={handleFetchPdf}>Fetch PDF</button>


      <div className="viewer" style={{ border: '1px solid #000', height: '600px', marginTop: '20px' }}>
        {pdfFileUrl ? (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
            <Viewer fileUrl={pdfFileUrl} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
        ) : (
          <p>Press "Fetch PDF" button to load the PDF</p>
        )}
      </div>
    </div>
  );
}

export default pdfviewer;
