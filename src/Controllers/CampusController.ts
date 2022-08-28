import { Request, Response } from 'express'
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import { errorInRouter } from "../utils/utilsRequest";

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

            const campusWithMoreCoursesSorted = getCampusCountCoursesResponse.sort((prev, current) => {
                return prev._count.courses - current._count.courses;
            });

            const campusWithMoreCourses = campusWithMoreCoursesSorted[campusWithMoreCoursesSorted.length - 1].name

            return res.json({ campusWithCourses: campusWithMoreCoursesSorted, campusWithMoreCourses })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}

export default new CampusController()