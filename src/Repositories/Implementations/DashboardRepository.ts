import { prisma } from "../../database/prismaClient";
import { IDashboardRepository } from "../IDashboardRepository";


export default class DashboardRepository implements IDashboardRepository {
    async save(): Promise<any> {
        // await prisma.

    }
}

