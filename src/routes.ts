import { Router } from 'express'
import CampusController from './Controllers/CampusController'
import CoursesController from './Controllers/CoursesController'
import DashboardController from './Controllers/DashboardController'
import StudentsController from './Controllers/StudentsController'
import validateStudents from './validators/getStudentsValidator'
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

const coursesRouter = createRoute('/v1/courses')
coursesRouter.get('/students', (req, res) => CoursesController.getAndCountStudents(req, res))
coursesRouter.get('/modality', (req, res) => CoursesController.getByModalities(req, res))

const studentsRouter = createRoute('/v1/students')
studentsRouter.get('/date', validateStudents.validateDate, (req, res) => StudentsController.getByDateStartAndEnd(req, res))
studentsRouter.get('/enrollments-date', (req, res) => StudentsController.getEnrollmentsByDate(req, res))
studentsRouter.get('/status', (req, res) => StudentsController.getByStatus(req, res))
studentsRouter.get('/campus', (req, res) => StudentsController.getByCampus(req, res))

export default router