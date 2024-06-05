// // const multer = require("multer");
// import multer from 'multer'
// const storage = multer.diskStorage({
//   filename: function (req, file, cb) {
//     cb(null, file.orginalname);
//   },
// });
// const upload = multer({ storage: storage });

// module.exports = upload;


import multer from 'multer';

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname); 
  },
});

const upload = multer({ storage: storage });

export default upload;
