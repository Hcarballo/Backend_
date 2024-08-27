import multer from "multer";
import { __dirname } from "./utils.js";

const storage = multer.diskStorage({
    
    destination: function (req, file, cb) {
        
        cb(null, __dirname + `/public/uploads/${req.body.tipo}`)
    },
    filename: function (req, file, cb) {    
        const uid = req.params.uid;    
        cb(null, `${Date.now()}-${uid}-${file.originalname}`)
    }
})

export const uploader = multer({storage});