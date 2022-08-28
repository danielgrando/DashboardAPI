import { prisma } from "../../database/prismaClient";
import { IStudentsRepository } from "../IStudentsRepository";

export default class StudentsRepository implements IStudentsRepository {
    async indexByNames(names: string[]): Promise<any> {
        return await prisma.students.findMany({ where: { name: { in: names } } })
    }

    async save(student: any): Promise<any> {
        const { aluno, dataInicio, dataFimPrevisto, statusMatricula, courseId } = student
        await prisma.students.create({ data: { name: aluno, start: dataInicio, end: dataFimPrevisto, status: statusMatricula, courseId } })
    }

    async getCountAll(): Promise<any> {
        return await prisma.students.count()
    }

    async getByDateStartAndEnd(start: any, end: any): Promise<any> {
        return await prisma.students.count({
            where: {
                start: {
                    gte: start,
                },
                end: {
                    lte: end
                }
            }
        })
    }

    async getByStatus(status: string): Promise<any> {
        return await prisma.students.count({ where: { status } })
    }

    async getByCampus(): Promise<any> {
        return await prisma.students.findMany({
            include: {
                courses: {
                    include: {
                        campus: true
                    }
                }
            }
        })
    }

    async getAllEnrollmentsByDate(): Promise<any> {
        return await prisma.students.findMany({
            distinct: ['start']
        })
    }

    async getEnrollmentsByDate(date: any): Promise<any> {
        const dateStart = date.split("-")
        return await prisma.students.count({
            where: {
                start: {
                    gte: new Date(dateStart[0] + "/" + dateStart[1] + "/" + "01"),
                    lt: new Date(dateStart[0] + "/" + dateStart[1] + "/" + "31")
                },
                status: "EM_CURSO"
            }
        })
    }
}