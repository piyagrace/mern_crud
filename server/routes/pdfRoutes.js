// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');

const storage = new GridFsStorage({
  // Tells multer-gridfs-storage to use the *already-connected* Mongoose instance
  db: mongoose.connection, 
  file: (req, file) => ({
    bucketName: 'pdfs',
    filename: `file_${Date.now()}`,
  }),
});

const upload = multer({ storage });

// POST /api/pdf/upload
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  if (!req.file) {
    // If `req.file` is missing, Multer never got the file => 400 error
    return res.status(400).json({ message: 'No file uploaded' });
  }

  // On success, multer-gridfs-storage provides `req.file.id` and `req.file.filename`
  res.status(201).json({
    message: 'File uploaded successfully',
    fileId: req.file.id,
    filename: req.file.filename,
  });
});

module.exports = router;
