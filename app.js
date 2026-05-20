const express = require('express')
const app = express()
const path = require('path')

const userRoutes = require('./src/routes/userRoutes')
const upload = require('./src/middleware/upload')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public'))


app.use('/src/uploads', express.static('uploads'))

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

app.get('/cadastro', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/HTML/cadastro.html'))
})

app.post('/register', upload.single('foto_perfil'), async(req, res) => {

    const { nome, email, senha } = req.body

    const foto_perfil = req.file?.filename

    console.log(req.file)

})

module.exports = app