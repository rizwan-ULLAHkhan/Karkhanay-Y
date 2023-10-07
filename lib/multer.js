import multer from 'multer';

const storage = multer.memoryStorage(); // using memory storage to handle the files as buffers

const upload = multer({ storage: storage }).fields([
  { name: 'name' },
  { name: 'description' },
  { name: 'price' },
  { name: 'quantity' },
  { name: 'images', maxCount: 10 },  // Assuming you're uploading up to 10 images.
]);

export default upload;
