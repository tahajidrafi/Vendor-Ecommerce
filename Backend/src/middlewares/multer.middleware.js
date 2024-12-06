import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./Backend/public/temp");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + "_");
  },
});

export const upload = multer({
  storage: storage,
});
