import { Request, Response, NextFunction } from 'express'

function validateDate(req: Request, res: Response, next: NextFunction) {
    try {
        if (!req.query.start || !req.query.end) {
            return res.status(400).json({ error: true, message: "You must send start and end!" })
        }

        next()
    } catch (error: any) {
        throw new Error(error)
    }
}

export default { validateDate }