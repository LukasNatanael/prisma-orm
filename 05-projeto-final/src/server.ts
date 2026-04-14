import cors from "cors"
import express from "express"
import { router } from './routes.ts'
import { errorHandlerMiddleware } from "./middlewares/error-handler.ts"

const app = express()

app.use(cors())
app.use('/api', router)
app.use(errorHandlerMiddleware)

const PORT = process.env.PORT || 3000

app.listen( PORT, () => {
    console.clear()
    console.log(`Server is running in:\nhttp://localhost:${PORT}`)
})