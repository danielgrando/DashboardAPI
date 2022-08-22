import { prisma } from "../../database/prismaClient";
import { ICoursesRepository } from "../ICoursesRepository";

export default class CoursesRepository implements ICoursesRepository {
    async index(course: any): Promise<any> {
        const { name, attributeId } = course
        return await prisma.courses.findFirst({ where: { name, attributeId } })
    }

    async save(course: any): Promise<any> {
        const { name, campusId, attributeId } = course
        await prisma.courses.create({ data: { name, campusId, attributeId } })
    }
}

