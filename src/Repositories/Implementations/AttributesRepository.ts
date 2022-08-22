import { prisma } from "../../database/prismaClient";
import { IAttributesRepository } from "../IAttributesRepository";

export default class CampusRepository implements IAttributesRepository {
    async index(attribute: any): Promise<any> {
        const { sub_type, modality, type_offer } = attribute

        return await prisma.attributes.findFirst({
            where: {
                sub_type,
                modality,
                type_offer
            }
        })
    }

    async save(attribute: any): Promise<any> {
        const { sub_type, modality, type_offer } = attribute

        return await prisma.attributes.create({
            data: {
                sub_type,
                modality,
                type_offer
            }
        })
    }
}
