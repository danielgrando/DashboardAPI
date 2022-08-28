import { Request, Response } from 'express'
import CoursesRepository from '../Repositories/Implementations/CoursesRepository';
import { errorInRouter } from "../utils/utilsRequest";


class CoursesController {
    async getAndCountStudents(req: Request, res: Response): Promise<any[number]> {
        try {
            const coursesRepository = new CoursesRepository()
            const getCoursesCountCoursesResponse = await coursesRepository.getAndCountStudents()

            return res.json(getCoursesCountCoursesResponse)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getByModalities(req: Request, res: Response): Promise<any[number]> {
        try {
            const coursesRepository = new CoursesRepository()

            const responseByModality: any = {
                "EDUCAÇÃO PRESENCIAL": {
                    count: 0,
                    courses: []
                },
                "EDUCAÇÃO A DISTÂNCIA": {
                    count: 0,
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

                responseByModality[modality].count = courses.length
            }

            return res.json(responseByModality)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}


export default new CoursesController()