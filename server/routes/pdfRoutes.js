// pdfRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

// 1) Multer-GridFS config
const storage = new GridFsStorage({
  db: mongoose.connection,
  file: (req, file) => ({
    bucketName: 'pdfs',
    filename: `file_${Date.now()}`,
  }),
});
const upload = multer({ storage });

// 2) We'll create the GridFSBucket in each route or once per file
//    Alternatively, you can create it once outside and reuse it
function getBucket() {
  return new GridFSBucket(mongoose.connection.db, {
    bucketName: 'pdfs',
  });
}

// POST /api/pdf/upload
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  res.status(201).json({
    message: 'File uploaded successfully',
    fileId: req.file.id,
    filename: req.file.filename,
  });
});

// GET /api/pdf/view/:id
router.get('/view/:id', async (req, res) => {
  try {
    const fileId = new mongoose.Types.ObjectId(req.params.id);

    // With the native driver, we can't do "findOne" on .files out of the box
    // Instead we do .find() on the bucket
    const bucket = getBucket();
    const files = await bucket.find({ _id: fileId }).toArray();
    if (!files.length) {
      return res.status(404).send('File not found');
    }
    const fileDoc = files[0];

    res.set('Content-Type', 'application/pdf');
    res.set(
      'Content-Disposition',
      `inline; filename="${fileDoc.filename || 'untitled'}.pdf"`
    );
    

    // Then openDownloadStream by ID
    const downloadStream = bucket.openDownloadStream(fileId);
    downloadStream.pipe(res);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching file');
  }
});

module.exports = router;
