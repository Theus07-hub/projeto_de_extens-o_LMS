const express = require('express')
const app = express()
const path = require('path')

const userRoutes = require('./src/routes/userRoutes')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public'))

app.use(userRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/login.html'))
})

app.get('/cursos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/cursos.html'))
})

app.get('/alunos', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/alunos.html'))
})

app.listen(3000, () => {
    console.log('Servidor rodando...')
})