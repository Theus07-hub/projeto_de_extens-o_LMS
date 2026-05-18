

const request = require('supertest')
const app = require('../../app')


test('Deve responder com status 200', async () => {
   const response = await request(app).get('/')

   expect(response.status).toBe(200)
})

test('Deve cadastrar usuário', async () => {
    const response = await request(app)
        .post('/register')
        .send({
            nome: "Gabi namorada matheus",
            email: "gabi@gmail.com",
            senha: "gabi@2245"
        })
    
    expect(response.status).toBe(201)
})

test('Deve fazer login', async () => {
    const response = await request(app)
        .post('/login')
        .send({
            email: "gabi@gmail.com",
            senha: "gabi@2245"
        })

    expect(response.status).toBe(200)
})