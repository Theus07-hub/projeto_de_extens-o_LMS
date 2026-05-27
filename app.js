
const express = require('express')
const app = express()
const path = require('path')
const userRoutes = require('./src/routes/userRoutes') 
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(userRoutes)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/index.html')
})

app.get('/cursos', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/cursos.html')
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/login.html')
})

app.get('/cadastro', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/cadastro.html')
})

app.get('/alunos', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/alunos.html')
})

app.get('/perfil_matheus', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/perfil_(M).html')
})

app.get('/perfil_gabi', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/perfil_(M).html')
})

app.get('/perfil_bruno', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/perfil_(M).html')
})

app.get('/perfil_marcos', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/perfil_(MCS).html')
})

app.get('/perfil_robson', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/perfil_(RH).html')
})

app.get('/matricular_logistica', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_logistica.html')
})

app.get('/matricular_medicina', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_medicina.html')
})

app.get('/matricular_ads', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_ADS.html')
})

app.get('/matricular_educacao_fisica', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_ed_fisica.html')
})

app.get('/matricular_nutricao', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_nutricao.html')
})

app.get('/matricular_engenharia', (req, res) => {
    res.sendFile(__dirname + '/public/HTML/pagina_engenharia.html')
})
module.exports = app