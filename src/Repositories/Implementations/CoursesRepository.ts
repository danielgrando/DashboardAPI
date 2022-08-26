import { prisma } from "../../database/prismaClient";
import { ICoursesRepository } from "../ICoursesRepository";

export default class CoursesRepository implements ICoursesRepository {
    async index(course: any): Promise<any> {
        const { name, attributeId } = course
        return await prisma.courses.findFirst({ where: { name, attributeId } })
    }

    async save(course: any): Promise<any> {
        const { nomeCurso, campusId, attributeId } = course
        await prisma.courses.create({ data: { name: nomeCurso, campusId, attributeId } })
    }

    async getCountAll(): Promise<any> {
        return await prisma.courses.count()
    }

    async getAndCountStudents(): Promise<any> {
        return await prisma.courses.findMany({
            include: {
                _count: {
                    select: {
                        Students: true
                    }
                }
            }
        })
    }
}

