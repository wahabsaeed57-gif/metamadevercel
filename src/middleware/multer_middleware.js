import multer from "multer";

// storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

// 🔥 strict file filter
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/jfif",
    "image/heic",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("REJECTED MIME:", file.mimetype);
    cb(new Error(`Unsupported file type: ${file.mimetype}`), false);
  }
};

// upload config
export const upload = multer({
  storage,

  limits: {
    fileSize: 2 * 1024 * 1024, // 2MB
  },

  fileFilter,
});
