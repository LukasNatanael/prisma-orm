import type { ErrorRequestHandler } from "express"
import { HttpError }           from "../errors/HttpError.ts"

export const errorHandlerMiddleware: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof HttpError) {
        res.status(error.statusCode).json({ message: error.message })
    }
    else if (error instanceof Error) {
        res.status(500).json({ message: error.message })
    }
    else {
        res.status(500).json({ message: "Erro interno no servidor" })
    }
}
