import express, { Request, Response, Express } from 'express'
import cors from 'cors'
import router from './routes'

const app = express()

app.use(express.json())
app.use(cors())
app.use(router)

app.get('/', (req: Request, res: Response) => {
    return res.json({ 'Online': true, 'Server': 'UP' })
})

app.listen(process.env.PORT || 3333, () => console.log("Server is running on PORT 3333"))
