import aws from "aws-sdk"
import multer from "multer"

const storage = multer.diskStorage({
    destination: "/tmp",
    fieldname: (req, file, cb) => {
        cb(null, file.name || file.originalname)
    }
})

const localUploadDocument = multer({storage}).single("document")

const upload2S3