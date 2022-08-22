import multer from 'multer'

let multerFile: Express.Multer.File;

const csvFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.includes('csv')) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadFile = multer({ storage: multer.memoryStorage(), fileFilter: csvFilter })

export default uploadFile