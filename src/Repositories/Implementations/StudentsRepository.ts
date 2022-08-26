import { prisma } from "../../database/prismaClient";
import { IStudentsRepository } from "../IStudentsRepository";

export default class StudentsRepository implements IStudentsRepository {
    async index(names: string[]): Promise<any> {
        return await prisma.students.findMany({ where: { name: { in: names } } })
    }

    async save(student: any): Promise<any> {
        const { aluno, dataInicio, dataFimPrevisto, statusMatricula, courseId } = student
        await prisma.students.create({ data: { name: aluno, start: dataInicio, end: dataFimPrevisto, status: statusMatricula, courseId } })
    }

}

