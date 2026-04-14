import { Router } from "express";

const router = Router()

router.get('/status', (req, res) => {
    try {
        res.json({ status: "ok" })
    }
    catch (error) {
        res.status(500).json({ error: "Erro interno no sesrvidor" })
    }
})

export { router }