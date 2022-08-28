import { prisma } from "../../database/prismaClient";
import { ICampusRepository } from "../ICampusRepository";

export default class CampusRepository implements ICampusRepository {
    async index(campus: any): Promise<any> {
        return await prisma.campus.findMany({ where: { name: { in: campus } } })
    }

    async save(campus: string): Promise<any> {
        await prisma.campus.create({ data: { name: campus } })
    }

    async findOne(campus: string): Promise<any> {
        return await prisma.campus.findFirst({ where: { name: campus } })
    }

    async getCountAll(): Promise<any[number]> {
        return await prisma.campus.count()
    }

    async getAll(): Promise<any[]> {
        return await prisma.campus.findMany()
    }

    async getCoursesFromCampus(): Promise<any> {
        return await prisma.campus.findMany({
            select: {
                name: true,
                _count: {
                    select: {
                        courses: true
                    }
                }
            }
        })
    }
}