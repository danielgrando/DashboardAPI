import { Request, Response } from 'express'
import AttributesRepository from '../Repositories/Implementations/AttributesRepository';
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import CoursesRepository from '../Repositories/Implementations/CoursesRepository';
import DashboardRepository from '../Repositories/Implementations/DashboardRepository';
import StudentsRepository from '../Repositories/Implementations/StudentsRepository';
import { formatCSVToObject } from '../utils/utilsCSV';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";

class DashboardController {
    async save(req: Request, res: Response) {
        try {

            const data = await formatCSVToObject(<any>req.file)

            const dataAtt = this.formatterPayload(data) as any

            const campusRepository = new CampusRepository()
            const attributesRepository = new AttributesRepository()
            const coursesRepository = new CoursesRepository()
            const studentsRepository = new StudentsRepository()

            await this.saveCampus(dataAtt, campusRepository)
            await this.saveAttributesAndCourse(dataAtt, attributesRepository)
            await this.saveCourses(dataAtt, coursesRepository, attributesRepository, campusRepository)
            await this.saveStudents(dataAtt, studentsRepository, coursesRepository)

            return resourceCreatedSuccess(res)
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    async getBasicData(req: Request, res: Response) {
        try {
            const campusRepository = new CampusRepository()
            const coursesRepository = new CoursesRepository()
            const studentsRepository = new StudentsRepository()

            const getCampusResponse = await campusRepository.getCountAll()
            const getCoursesResponse = await coursesRepository.getCountAll()
            const getStudentsResponse = await studentsRepository.getCountAll()

            return res.json({ allCampus: getCampusResponse, allCourses: getCoursesResponse, allStudents: getStudentsResponse })
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

    private formatterPayload(data: any) {
        try {
            const resultAtt: any[] = []

            for (const item of data) {
                const year = item.dataInicio.split('/')
                if (year[2] >= '2021') {
                    resultAtt.push(item)
                }
            }

            return resultAtt
        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async saveCampus(data: any, campusRepository: any): Promise<any> {
        try {
            const dataCampus = data.map((item: { campus: string; }) => item.campus)
            const campus = this.removeDuplicates(dataCampus)

            const allCampus = await campusRepository.index(campus)
            for (const itemCampus of campus) {
                const campusExists = allCampus?.find((item: { name: any; campus: any; }) => item.name === itemCampus)
                if (!campusExists) {
                    await campusRepository.save(itemCampus)
                }
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async saveAttributesAndCourse(data: any, attributesRepository: any): Promise<any> {
        try {
            const attributes: any[] = []

            data.map((item: { subtipoCurso: string; modalidade: string; tipoOferta: string; nomeCurso: string; }) => {
                const objectAttribute = {
                    sub_type: item.subtipoCurso,
                    modality: item.modalidade,
                    type_offer: item.tipoOferta
                }

                const attributesExists = attributes.find(itemSaved => itemSaved.sub_type === item.subtipoCurso
                    && itemSaved.modality === item.modalidade && itemSaved.type_offer === item.tipoOferta)

                if (!attributes || !attributesExists) {
                    attributes.push(objectAttribute)
                }
            })

            for (const attribute of attributes) {
                const attributeExists = await attributesRepository.index(attribute)

                if (!attributeExists) {
                    await attributesRepository.save(attribute)
                }
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async saveCourses(data: any, coursesRepository: any, attributesRepository: any, campusRepository: any): Promise<any> {
        try {

            const courses: any[] = []
            data.map((item: { nomeCurso: string; campus: string; subtipoCurso: string; modalidade: string; tipoOferta: string; }) => {

                const findCourse = courses.find(course => course.nomeCurso === item.nomeCurso && course.campus === item.campus
                    && course.subtipoCurso === item.subtipoCurso && course.modalidade === item.modalidade
                    && course.tipoOferta === item.tipoOferta)

                if (!courses.length || !findCourse) {
                    courses.push(item)
                }
            })

            for (const course of courses) {
                const { campus, nomeCurso, subtipoCurso, modalidade, tipoOferta } = course

                const getAttribute = await attributesRepository.index({
                    sub_type: subtipoCurso, modality: modalidade,
                    type_offer: tipoOferta
                })
                if (getAttribute) course.attributeId = getAttribute.id

                const getCourse = await coursesRepository.index({ name: nomeCurso, attributeId: course.attributeId })
                if (!getCourse) {
                    const getCampus = await campusRepository.findOne(campus)
                    if (getCampus) course.campusId = getCampus.id

                    await coursesRepository.save(course)
                }
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private async saveStudents(data: any, studentsRepository: any, coursesRepository: any) {
        try {

            //TODO Avaliar se necessário adicionar alguma validação

            // const students: any[] = []
            // data.map((item: { aluno: string }) => {
            //     const findStudent = students.find(student => student.aluno === item.aluno)
            //     if (!students.length || !findStudent) {
            //         students.push(item)
            //     }
            // })

            const students = data.map((item: { aluno: string; }) => item.aluno)
            const allStudents = await studentsRepository.indexByNames(students)

            for (const student of data) {
                const findStudent = allStudents.find((studentSaved: { name: any; }) => studentSaved.name === student.aluno)
                if (!findStudent) {
                    const getCourse = await coursesRepository.index({ name: student.nomeCurso, attributeId: student.attributeId })

                    if (getCourse) {
                        student.courseId = getCourse.id
                        this.formatDate(student, student.dataInicio, student.dataFimPrevisto)

                        await studentsRepository.save(student)
                    }
                }
            }

        } catch (error: any) {
            throw new Error(error)
        }
    }

    private removeDuplicates(data: any) {
        try {
            data = [...new Set(data)];

            return data
        } catch (error: any) {
            throw new Error(error)
        }
    }

    private formatDate(student: any, dataInicio: any, dataFimPrevisto: any) {
        try {
            const dataInicioSplit = dataInicio.split('/')
            const dataFimSplit = dataFimPrevisto.split('/')

            student.dataInicio = new Date(dataInicioSplit[2], dataInicioSplit[1], dataInicioSplit[0])
            student.dataFimPrevisto = new Date(dataFimSplit[2], dataFimSplit[1], dataFimSplit[0])

        } catch (error: any) {
            throw new Error(error)
        }
    }

}


export default new DashboardController()