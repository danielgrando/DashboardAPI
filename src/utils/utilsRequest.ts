import { Request, Response } from "express";
import { ErrorRequest } from "./customTypes";

export function resourceCreatedSuccess(res: Response) {
    res.status(201).json({ status: 'success' })
}

export function resourceUpdatedSuccess(res: Response) {
    res.status(200).json({ status: 'success' })
}

export function resourceDeletedSuccess(res: Response) {
    res.status(200).json({ status: 'success' })
}

export function resourceNotFound(res: Response, resource: string | number, complementResource?: string) {
    const resourceMessage = complementResource ? `resource ${complementResource}` : 'resource'

    const errorMessage: ErrorRequest = {
        status: 'error',
        message: `${resourceMessage} '${resource}' not found!`
    }

    res.status(404).json(errorMessage)
}

export function errorInRouter(req: Request, res: Response, error: any) {
    const errorMessage: ErrorRequest = {
        status: 'error',
        message: `an error ocurred in ${req.method} ${req.baseUrl}`,
        error: error?.message ? error.message : 'undefined'
    }

    console.error(error)

    res.status(500).send(errorMessage)
}