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

    async getStudentsByDateStartAndEnd(start: any, end: any): Promise<any> {
        if (start) {
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
    }
}

