import { Router } from 'express'
import CampusController from './Controllers/CampusController'
import DashboardController from './Controllers/DashboardController'
import multerCSV from './utils/multerCSV'

const router = Router()

const createRoute = (path: any): Router => {
    const newRouter = Router()
    router.use(path, newRouter)
    return newRouter
}

const dashboardRouter = createRoute('/v1')
dashboardRouter.post('/', multerCSV.single('file'), (req, res) => DashboardController.save(req, res))
dashboardRouter.get('/', (req, res) => DashboardController.getBasicData(req, res))

const campusRouter = createRoute('/v1/campus')
campusRouter.get('/courses', (req, res) => CampusController.getCampusCountCourses(req, res))


export default router