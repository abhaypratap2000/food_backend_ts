import multer from 'multer';
import path from 'path';
console.log("start");

const ImagesStorage = multer.diskStorage({
    
    destination: function(req, file, cb){
        cb(null , 'images')
    },
    filename: (req, file, cb) => {
       cb(null,`${file.originalname.split(".")[0]}_${Date.now()}${path.extname(file.originalname)}` );
    },
  });

export const multerMiddleware = multer({
    storage:ImagesStorage,
    limits: {
      fileSize: 1024*1024*1000,
    },
  });
 