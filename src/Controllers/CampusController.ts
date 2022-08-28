import { Request, Response } from 'express'
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import { errorInRouter } from "../utils/utilsRequest";

interface CampusWithMoreCourses {
    name?: string
}
interface Courses {
    courses: number
}
interface ResponseCampusCourse {
    name: string
    _count: Courses
}

class CampusController {
    async getCampusCountCourses(req: Request, res: Response): Promise<any[number]> {
        try {
            const campusRepository = new CampusRepository()
            const getCampusCountCoursesResponse: ResponseCampusCourse[] = await campusRepository.getCoursesFromCampus()

            const campusWithMoreCourses: CampusWithMoreCourses = {}

            const maxCourses = getCampusCountCoursesResponse.reduce(function (prev: any, current: any) {
                return prev._count.courses > current._count.courses ? prev : current;
            });
            campusWithMoreCourses.name = maxCourses.name

            return res.json({ campusWithCourses: getCampusCountCoursesResponse, campusWithMoreCourses })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}

export default new CampusController()