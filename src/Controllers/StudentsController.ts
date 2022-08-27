import { Request, Response } from 'express'
import StudentsRepository from '../Repositories/Implementations/StudentsRepository';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";


class StudentsController {
    async getStudentsByDateStartAndEnd(req: Request, res: Response) {
        try {
            const studentsRepository = new StudentsRepository()

            const { start, end }: any = req.query
            // .replace(/[/]/g, "-")

            const startPayload = new Date(start)
            const formatterStartPayload = startPayload?.toISOString()

            const endPayload = new Date(end)
            const formatterEndPayload = endPayload?.toISOString()

            const getStudentsByDateResponse = await studentsRepository.getStudentsByDateStartAndEnd(formatterStartPayload, formatterEndPayload)


            return res.json(getStudentsByDateResponse)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}


export default new StudentsController()