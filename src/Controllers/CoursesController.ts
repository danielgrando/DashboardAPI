import { Request, Response } from 'express'
import CoursesRepository from '../Repositories/Implementations/CoursesRepository';
import { errorInRouter } from "../utils/utilsRequest";

interface CourseWithMoreStudents {
    name?: string
}

interface Students {
    Students: number
}
interface ResponseCourseStudents {
    name: string
    _count: Students
}
class CoursesController {
    async getAndCountStudents(req: Request, res: Response): Promise<any[number]> {
        try {
            const coursesRepository = new CoursesRepository()
            const getCoursesCountStudentsResponse: ResponseCourseStudents[] = await coursesRepository.getAndCountStudents()

            const courseWithMoreStudents: CourseWithMoreStudents = {}

            const maxStudents = getCoursesCountStudentsResponse.reduce(function (prev: any, current: any) {
                return prev._count.Students > current._count.Students ? prev : current;
            });
            courseWithMoreStudents.name = maxStudents.name

            return res.json({ coursesWithStudents: getCoursesCountStudentsResponse, courseWithMoreStudents })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getByModalities(req: Request, res: Response): Promise<any[number]> {
        try {
            const coursesRepository = new CoursesRepository()

            const responseByModality: any = {
                "EDUCAÇÃO PRESENCIAL": {
                    quantity: 0,
                    courses: []
                },
                "EDUCAÇÃO A DISTÂNCIA": {
                    quantity: 0,
                    courses: []
                }
            }

            const getByModalitiesResponse = await coursesRepository.getByModalities()

            for (const modality of ['EDUCAÇÃO PRESENCIAL', 'EDUCAÇÃO A DISTÂNCIA']) {
                let courses = getByModalitiesResponse.filter((course: { attribute: { modality: string; }; }) => course.attribute.modality === modality)
                // courses = [...new Set(courses.map((course: { name: string; }) => course.name))]
                courses = courses.map((course: { name: string; }) => course.name)

                if (modality === 'EDUCAÇÃO PRESENCIAL') {
                    responseByModality['EDUCAÇÃO PRESENCIAL'].courses = courses
                } else {
                    responseByModality['EDUCAÇÃO A DISTÂNCIA'].courses = courses
                }

                responseByModality[modality].quantity = courses.length
            }

            return res.json(responseByModality)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}

export default new CoursesController()