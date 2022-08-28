import { Request, Response } from 'express'
import CampusRepository from '../Repositories/Implementations/CampusRepository';
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

            const responseByStatus: any = {
                em_curso: 0,
                transf_ext: 0,
                desligado: 0,
                concluída: 0,
                reprovada: 0,
                abandono: 0
            }
            for (const status of ['em_curso', 'transf_ext', 'desligado', 'concluída', 'reprovada', 'abandono']) {
                const getStudentsByStatus = await studentsRepository.getByStatus(status.toUpperCase())
                responseByStatus[status] = getStudentsByStatus
            }

            return res.json(responseByStatus)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getByCampus(req: Request, res: Response): Promise<any[number]> {
        try {
            const studentsRepository = new StudentsRepository()
            const campusRepository = new CampusRepository()


            const allCampusResponse = await campusRepository.getAll()
            const studentsByCampusResponse = await studentsRepository.getByCampus()

            const studentsByCampus: any = {}

            for (const campus of allCampusResponse) {
                const { id } = campus

                const students = studentsByCampusResponse.filter((student: { courses: { campus: { id: any; }; }; }) =>
                    student.courses.campus.id === id)

                studentsByCampus[campus.name] = students.length
            }

            return res.json(studentsByCampus)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }
}


export default new StudentsController()