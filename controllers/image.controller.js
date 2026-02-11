import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // folder
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

export const upload = multer({ storage: storage });

export const uploadImage = async (req, res) => {
    try {
        // check if file is missing 
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "File is required! Please upload a file"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Image uploaded successfully",
            data: {
                originalName: req.file.originalname,
                mimeType: req.file.mimetype,
                fileName: req.file.filename,
                filePath: req.file.path,
                sizeInKb: (req.file.size / 1024).toFixed(2)
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again"
        });
    }
};
