import { Request, Response } from 'express'
import AttributesRepository from '../Repositories/Implementations/AttributesRepository';
import CampusRepository from '../Repositories/Implementations/CampusRepository';
import CoursesRepository from '../Repositories/Implementations/CoursesRepository';
import DashboardRepository from '../Repositories/Implementations/DashboardRepository';
import { formatCSVToObject } from '../utils/utilsCSV';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";

class DashboardController {
    async save(req: Request, res: Response) {
        try {

            const data = await formatCSVToObject(<any>req.file)

            const dataAtt = this.formatterPayload(data) as any

            const dashboardRepository = new DashboardRepository()
            const campusRepository = new CampusRepository()
            const attributesRepository = new AttributesRepository()
            const coursesRepository = new CoursesRepository()


            await this.saveCampus(dataAtt, campusRepository)
            await this.saveAttributesAndCourse(dataAtt, attributesRepository)
            await this.saveCourse(dataAtt, coursesRepository, attributesRepository, campusRepository)



            //TODO listar curso request
            //TODO ver se ja existe o cursos e inserir
            //TODO get subtipoCurso modalidade tipoOferta att
            //TODO add

            //TODO lista students name
            //TODO  ver se ja existe o student e inserir


            // const response = await dashboardRepository.save(dataAtt)


            return res.json(dataAtt)
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
        } catch (error) {
            return error
        }
    }

    private async saveCampus(data: any, campusRepository: any): Promise<any> {
        try {
            const dataCampus = data.map((item: { campus: any; }) => item.campus)
            const campus = this.removeDuplicates(dataCampus)

            const allCampus = await campusRepository.index(campus)
            for (const itemCampus of campus) {
                const campusExists = allCampus?.find((item: { name: any; campus: any; }) => item.name === itemCampus)
                if (!campusExists) {
                    await campusRepository.save(itemCampus)
                }
            }

        } catch (error) {
            return error
        }
    }


    private async saveAttributesAndCourse(data: any, attributesRepository: any): Promise<any> {
        try {
            const attributes: any[] = []

            data.map((item: { subtipoCurso: any; modalidade: any; tipoOferta: any; nomeCurso: any; }) => {
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

        } catch (error) {
            return error
        }
    }

    private async saveCourse(data: any, coursesRepository: any, attributesRepository: any, campusRepository: any): Promise<any> {
        try {
            data.map(async (item: { subtipoCurso: any; modalidade: any; tipoOferta: any; nomeCurso: any; }) => {
                const coursePayload: any = {
                    name: item.nomeCurso
                }

                const getAttribute = await attributesRepository.index({
                    attribute: {
                        sub_type: item.subtipoCurso,
                        modality: item.modalidade,
                        type_offer: item.tipoOferta
                    }
                })
                if (getAttribute) coursePayload.attributeId = getAttribute.id

                const getCourse = await coursesRepository.index(coursePayload)
                if (!getCourse) {
                    const getCampus = await campusRepository.findOne(item.nomeCurso)
                    if (getCampus) coursePayload.campusId = getCampus.id

                    await coursesRepository.save(coursePayload)
                }
            })

        } catch (error) {
            return error
        }
    }

    private removeDuplicates(data: any) {
        try {
            data = [...new Set(data)];

            return data
        } catch (error) {
            return error
        }
    }


}


export default new DashboardController()