import { Request, Response } from 'express'
import StudentsRepository from '../Repositories/Implementations/StudentsRepository';
import { errorInRouter } from "../utils/utilsRequest";

class StudentsController {
    async getByDateStartAndEnd(req: Request, res: Response): Promise<any[number]> {
        try {
            const studentsRepository = new StudentsRepository()

            const { start, end }: any = req.query
            // .replace(/[/]/g, "-")

            const startPayload = new Date(start)
            const formatterStartPayload = startPayload?.toISOString()

            const endPayload = new Date(end)
            const formatterEndPayload = endPayload?.toISOString()

            const getStudentsByDateResponse = await studentsRepository.getByDateStartAndEnd(formatterStartPayload, formatterEndPayload)


            return res.json(getStudentsByDateResponse)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getByStatus(req: Request, res: Response): Promise<any[number]> {
        try {
            const studentsRepository = new StudentsRepository()

            const { status }: any = req.query

            if (status) {
                const getStudentsByStatus = await studentsRepository.getByStatus(status.toUpperCase())

                return res.json(getStudentsByStatus)
            }

        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}


export default new StudentsController()