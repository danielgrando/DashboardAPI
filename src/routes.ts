import { Router } from 'express'
import DashboardController from './Controllers/DashboardController'
import multerCSV from './utils/multerCSV'

const router = Router()

const createRoute = (path: any): Router => {
    const newRouter = Router()
    router.use(path, newRouter)
    return newRouter
}

const dashboardRouter = createRoute('/v1/data')
dashboardRouter.post('/', multerCSV.single('file'), (req, res) => DashboardController.save(req, res))


export default router