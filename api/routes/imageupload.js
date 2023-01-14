const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authorizeAdmin } = require('../controllers/auth/authorize');
const fs = require('fs-extra');
var dir = './uploads/';
const path = require('path');
const Images = require('../models/images.model');

const storage = multer.diskStorage({
  destination: function (req, file, callback) {
      callback(null, './uploads/');
  },
  fileFilter: function (req, file, cb) {
      const extension = path.extname(file.originalname).toLowerCase();
      const mimetyp = file.mimetype;
      if (
          extension !== '.jpg' ||
          extension !== '.jpeg' ||
          extension !== '.png' ||
          mimetyp !== 'image/png' ||
          mimetyp !== 'image/jpg' ||
          mimetyp !== 'image/jpeg'
      ) {
          cb('error message', true);
      }
  },
  filename: function (req, file, callback) {
      callback(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname).toLowerCase());
  },
});

const upload = multer({ storage: storage })

router.post('/upload-image', authorizeAdmin,  upload.single('img'), async  (req, res) => {

  try {

    // create upload folder if not exist
    if (!fs.existsSync(dir)){
      fs.mkdirSync(dir);
    }

    //check file
    if(!req.file){
      return res.status(400).send({
        message: 'Please upload an image'
      });
    }

    const fullUrl = `${req.protocol}://${req.get("host")}`;

    const { originalname, filename, mimetype, size } = req.file;

    //check image exist or not
    const checkImage = await Images.findOne({ name:originalname });
    if (checkImage) {
      
      return res.status(200).json({url: fullUrl + '/images/' + checkImage.filename});
    }

    const addImage = await Images.create({
      name: originalname,
      size: size,
      filename: filename,
      type: mimetype
    });

    //send success response
    res.status(200).json({url: fullUrl + '/images/' + filename});

  } catch (error) {
    console.log(error)
    res.status(500).json({message: "Something wrong",error});
  }

});

module.exports = router;