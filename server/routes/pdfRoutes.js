// routes/pdfRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');

// 1) Create or get a reference to the Mongoose connection
const conn = mongoose.connection;

// 2) Initialize GridFS stream once the connection is open
let gfs;
conn.once('open', () => {
  // Initialize stream
  gfs = Grid(conn.db, mongoose.mongo);
  // Collection name to store the files
  gfs.collection('uploads');
});

// 3) Create a storage object with the given configuration
const storage = new GridFsStorage({
  url: 'mongodb://127.0.0.1:27017/crud',
  file: (req, file) => {
    // You can customize the filename or metadata
    // bucketName must match the name passed to gfs.collection()
    return {
      filename: `file_${Date.now()}`, // or file.originalname
      bucketName: 'uploads',          
      metadata: {
        contentType: file.mimetype,
        customField: 'Optional extra metadata',
      },
    };
  },
});
const upload = multer({ storage });

//-----------------------------------------------
// 1) Upload a PDF
//-----------------------------------------------
router.post('/upload', upload.single('pdfFile'), (req, res) => {
  // req.file is the stored file info
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  return res.status(201).json({
    message: 'File uploaded successfully to GridFS!',
    fileId: req.file.id,          // ObjectId of the file in GridFS
    filename: req.file.filename,  // The filename in 'uploads.files'
  });
});

//-----------------------------------------------
// 2) Download or View a PDF by file ID
//-----------------------------------------------
router.get('/view/:id', async (req, res) => {
  try {
    if (!gfs) {
      return res.status(500).send('GridFS is not initialized');
    }

    const fileId = req.params.id;
    const _id = new mongoose.Types.ObjectId(fileId);

    // Lookup file metadata in 'uploads.files'
    const fileDoc = await gfs.files.findOne({ _id });
    if (!fileDoc) {
      return res.status(404).send('File not found');
    }

    // Set the appropriate content-type and disposition
    res.set('Content-Type', fileDoc.metadata?.contentType || 'application/pdf');
    // For inline display:
    // res.set('Content-Disposition', `inline; filename="${fileDoc.filename}"`);
    // For forced download:
    // res.set('Content-Disposition', `attachment; filename="${fileDoc.filename}"`);

    // Stream the file from GridFS to the client
    const readStream = gfs.createReadStream({ _id });
    readStream.pipe(res);
  } catch (error) {
    console.error('Error fetching PDF:', error);
    return res.status(500).json({ error: error.message });
  }
});

//-----------------------------------------------
// 3) Delete a PDF by file ID (optional)
//-----------------------------------------------
router.delete('/:id', async (req, res) => {
  try {
    if (!gfs) {
      return res.status(500).send('GridFS is not initialized');
    }
    const _id = new mongoose.Types.ObjectId(req.params.id);
    // Remove file and its chunks from GridFS
    gfs.remove({ _id, root: 'uploads' }, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      return res.status(200).json({ message: 'File deleted successfully' });
    });
  } catch (err) {
    console.error('Error deleting file:', err);
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;
