

const request = require('supertest')
const app = require('../../app')


test('Deve responder com status 200', async () => {
   const response = await request(app).get('/')

   expect(response.status).toBe(200)
})


test('Deve bloquear após 2 tentativas', async() => {
    for(let i = 0; i < 2; i++ ){
        await request(app)
            .post('/login')
            .send({
                email: "kaique@gmail.com",
                senha: "Kaique@22455"
            })
    }

    const response = await request(app)
        .post('/login')
        .send({
            email: "kaique@gmail.com",
            senha: "Kaique@22455"
        })

    console.log(response.status)
    console.log(response.body)
    expect(response.status).toBe(429)
})

test('Deve cadastrar usuário', async () => {
    const response = await request(app)
        .post('/registe')
        .send({
            nome: "Bruno Melo",
            email: "bruno@gmail.com",
            senha: "Bruno@2245"
        })
})