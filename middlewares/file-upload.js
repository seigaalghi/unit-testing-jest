const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

module.exports = {
  uploadLocal: (fieldName) => {
    try {
      const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./public/images");
        },
        filename: function (req, file, cb) {
          const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + " - " + file.originalname);
        },
      });

      const upload = multer({ storage: storage }).single(fieldName);

      return (req, res, next) => {
        upload(req, res, (err) => {
          if (err) {
            return res.status(400).json({
              status: "failed",
              message: err.message,
              result: {},
            });
          }
          next();
        });
      };
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: "error",
        message: "internal server error",
        result: {},
      });
    }
  },
  uploadCloud: (fieldName) => {
    try {
      const storage = new CloudinaryStorage({
        cloudinary,
        params: {
          folder: "photos",
          resource_type: "raw",
          public_id: (req, file) => {
            const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
            return uniqueSuffix + " - " + file.originalname;
          },
        },
      });
      const limits = { fileSize: 1024 * 1024 * 2 };
      const fileFilter = (req, file, cb) => {
        if (!file.mimetype.includes("image")) {
          cb(new Error("File must be an image"), false);
        }

        cb(null, true);
      };
      const upload = multer({ storage, limits, fileFilter }).single(fieldName);

      return (req, res, next) => {
        upload(req, res, (err) => {
          if (err) {
            return res.status(400).json({
              status: "failed",
              message: err.message,
              result: {},
            });
          }
          next();
        });
      };
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "internal server error",
        result: {},
      });
    }
  },
};
