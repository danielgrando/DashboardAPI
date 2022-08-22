import { Request, Response } from 'express'
import DashboardRepository from '../Repositories/Implementations/DashboardRepository';
import { formatCSVToObject } from '../utils/utilsCSV';
import { errorInRouter, resourceCreatedSuccess, resourceDeletedSuccess, resourceUpdatedSuccess } from "../utils/utilsRequest";


class CampusController {
    async index(req: Request, res: Response) {
        try {


            return res.json()
        } catch (error) {
            errorInRouter(req, res, error)
        }
    }

}


export default new CampusController()