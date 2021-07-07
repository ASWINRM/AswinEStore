import multer from 'multer'
import express from 'express'
import path from 'path'
const router = express.Router()

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images')


    },
    filename: function (req, file, cb) {
        console.log(file)
        cb(null, `${file.originalname.slice(0, file.originalname.length - 4)} ${Date.now()}${path.extname(
            file.originalname
        )}`)
    }
})



const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(null, true)
        }
    }
})

router.post('/image', upload.single('image'), (req, res) => {
    console.log(req.file)
    res.status(200).send(`${req.file.destination}/${req.file.filename}`)
})

export default router