import { Request, Response } from 'express'
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import StudentsRepository from '../Repositories/Implementations/StudentsRepository';
import { errorInRouter } from "../utils/utilsRequest";

interface IResponseByStatus {
    [key: string]: number,
}
interface IEntranceAndExit {
    [key: string]: number,
}
interface IStudentsByCampus {
    [key: string]: number,
}
interface ICampusWithMoreStudents {
    name?: string
}

class StudentsController {
    async getByDateStartAndEnd(req: Request, res: Response): Promise<any> {
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

    async getByStatus(req: Request, res: Response): Promise<any> {
        try {
            const studentsRepository = new StudentsRepository()

            const responseByStatus: IResponseByStatus = {
                em_curso: 0,
                transf_ext: 0,
                desligado: 0,
                concluída: 0,
                reprovada: 0,
                abandono: 0
            }

            const entranceAndExit: IEntranceAndExit = {
                entrance: 0,
                exit: 0,
            }
            for (const status of ['em_curso', 'transf_ext', 'desligado', 'concluída', 'reprovada', 'abandono']) {
                const getStudentsByStatus = await studentsRepository.getByStatus(status.toUpperCase())
                responseByStatus[status] = getStudentsByStatus

                if (status !== 'em_curso') {
                    entranceAndExit.exit += getStudentsByStatus
                } else {
                    entranceAndExit.entrance += getStudentsByStatus
                }
            }

            return res.json({ enrollmentsByStatus: responseByStatus, entranceAndExit })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getByCampus(req: Request, res: Response): Promise<any> {
        try {
            const studentsRepository = new StudentsRepository()
            const campusRepository = new CampusRepository()

            const allCampusResponse = await campusRepository.getAll()
            const studentsByCampusResponse = await studentsRepository.getByCampus()

            const studentsByCampus: IStudentsByCampus = {}

            for (const campus of allCampusResponse) {
                const { id } = campus

                const students = studentsByCampusResponse.filter((student: { courses: { campus: { id: string; }; }; }) =>
                    student.courses.campus.id === id)

                studentsByCampus[campus.name] = students.length
            }

            const studentsByCampusSorted: IStudentsByCampus = Object.fromEntries(
                Object.entries(studentsByCampus).sort(([, prev], [, current]) => prev - current)
            );

            const campusWithMoreStudents: ICampusWithMoreStudents = {}
            let quantity: number = 0
            for (const [campus, quantityStudents] of Object.entries(studentsByCampus)) {
                if (<any>quantityStudents > quantity) {
                    quantity = quantityStudents
                    campusWithMoreStudents.name = campus
                }
            }

            return res.json({ studentsByCampusSorted, campusWithMoreStudents })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getEnrollmentsByDate(req: Request, res: Response): Promise<any> {
        try {
            const studentsRepository = new StudentsRepository()

            const getEnrollmentsByDateResponse = await studentsRepository.getAllEnrollmentsByDate()

            const getDatesDistinct = getEnrollmentsByDateResponse.map((date: { start: Date; }) => date.start)

            const arrayDate: string[] = []

            for (const date of getDatesDistinct) {
                const newDate = this.formatDate(date)
                const dateSplit = newDate.split("-")

                const existDate = arrayDate.find(date => {
                    const newDate = this.formatDate(date)
                    const split = newDate.split('-')
                    if (split[1] === dateSplit[1]) {
                        return true
                    }
                })
                if (!existDate) {
                    arrayDate.push(dateSplit.join('-'))
                }
            }

            const arrayOrdened = arrayDate.sort(function (prev, current) {
                return ('' + prev).localeCompare(current);
            })

            const responseEnrollmentsByDate: any = {}
            for (let date of arrayOrdened) {
                const dateFormatted = this.formatDate(date)
                const lessDate = await studentsRepository.getEnrollmentsByDate(dateFormatted)

                const dateSplit = date.split('-')
                date = dateSplit[1] + "-" + dateSplit[0]

                responseEnrollmentsByDate[date] = lessDate
            }

            return res.json({ responseEnrollmentsByDate })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    private formatDate(date: any) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }
}

export default new StudentsController()
