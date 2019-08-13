var express = require('express');
var app = express();
var multer = require('multer')
var cors = require('cors');

app.use(cors())

//to save under public folder, with the original file name
var storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})


var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               console.log('error 1')
               return res.status(500).json(err)
           } else if (err) {
            console.log('error 2')
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});

app.listen(8000, function() {

    console.log('App running on port 8000');

});