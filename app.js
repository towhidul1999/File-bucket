// app.js
const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer to handle file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb(null, 'uploads/'); // Specify the destination folder
    cb(null, '../FTP-testfolder'); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a timestamp as the filename
  }
});

const upload = multer({ storage: storage });

// Set up a route for uploading an image
app.post('/upload', upload.single('image'), (req, res) => {
  // Multer middleware has added the `file` property to the request object
  const imagePath = req.file.path;

  res.json({ message: 'Image uploaded successfully', imagePath });
});

// Set up a route to access uploaded images
app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, '../FTP-testfolder', filename);
  
    // Serve the image
    res.sendFile(imagePath);
  });

// Serve uploaded images statically
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
