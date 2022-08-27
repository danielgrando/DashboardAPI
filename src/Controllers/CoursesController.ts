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
                "EDUCAÇÃO PRESENCIAL": 0,
                "EDUCAÇÃO A DISTÂNCIA": 0,
                presencial: [],
                ead: []
            }

            const getByModalitiesResponse = await coursesRepository.getByModalities()

            for (const modality of ['EDUCAÇÃO PRESENCIAL', 'EDUCAÇÃO A DISTÂNCIA']) {
                const courses = getByModalitiesResponse.filter((course: { attribute: { modality: string; }; }) => course.attribute.modality === modality)

                if (modality === 'EDUCAÇÃO PRESENCIAL') {
                    const faceToFaceCourses = [...new Set(courses.map((course: { name: string; }) => course.name))]
                    responseByModality.presencial = faceToFaceCourses
                } else {
                    let eadCourses = [...new Set(courses.map((course: { name: string; }) => course.name))]
                    responseByModality.ead = eadCourses
                }

                responseByModality[modality] = courses.length
            }

            return res.json(responseByModality)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}


export default new CoursesController()