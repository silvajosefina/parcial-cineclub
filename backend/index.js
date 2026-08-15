require('dotenv').config()

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3001

app.use(express.json())

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`)
    next()
})

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})