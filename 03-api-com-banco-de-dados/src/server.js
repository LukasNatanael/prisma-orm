const express = require('express')
const router = require('./router')

const app = express()

app.use(express.json())
app.use('/api', router)

const PORT = process.env.PORT || 3000
app.listen( PORT, () => {
    console.clear()
    console.log(`Server running in: http://localhost:${PORT}`)
} )