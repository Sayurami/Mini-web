const express = require('express');
const multer  = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Upload folder setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload API
app.post('/upload', upload.single('photo'), (req, res) => {
  if(!req.file) return res.send('No file uploaded.');
  res.send({ message: 'File uploaded!', url: `/uploads/${req.file.filename}` });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
