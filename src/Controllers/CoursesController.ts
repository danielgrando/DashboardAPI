import { Request, Response } from 'express'
import CoursesRepository from '../Repositories/Implementations/CoursesRepository';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";


class CoursesController {
    async getCoursesAndCountStudents(req: Request, res: Response) {
        try {
            const coursesRepository = new CoursesRepository()
            const getCoursesCountCoursesResponse = await coursesRepository.getAndCountStudents()

            return res.json(getCoursesCountCoursesResponse)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

}


export default new CoursesController()