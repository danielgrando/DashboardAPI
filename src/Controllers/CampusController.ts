import { Request, Response } from 'express'
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";


class CampusController {
    async getCampusCountCourses(req: Request, res: Response): Promise<any[number]> {
        try {
            const campusRepository = new CampusRepository()
            const getCampusCountCoursesResponse = await campusRepository.getCoursesFromCampus()

            return res.json(getCampusCountCoursesResponse)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

}


export default new CampusController()