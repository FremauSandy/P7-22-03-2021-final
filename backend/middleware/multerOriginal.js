/*IMPORT*/
const multer = require("multer");

/*CONFIGURATION*/
const MIME_TYPES = {
	"image/jpg": "jpg",
	"image/jpeg": "jpg",
	"image/png": "png"
};

/*ROUTE IMAGES*/
const storage = multer.diskStorage({
	destination: (req, file, callback) => {
		callback(null, "./images");
	},
	filename: (req, file, callback) => {
		const name = file.originalname.split(" ").join("_");
		const namee = name.split(".")[0];
		const extension = MIME_TYPES[file.mimetype];
		callback(null, namee + Date.now() + "." + extension);
	}
});

module.exports = multer({ storage: storage }).single("image");
