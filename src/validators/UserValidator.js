
const { z } = require('zod')

const registerSchema = z.object({
    name: z.string().min(3, "Nome precisa ter no mínimo 3 caracteres"),
    email: z.string().email("Email inválido"),
    senha: z.string()
        .min(6, "Senha precisa ter no mínimo 6 caracteres")
        .regex(/[A-Z]/, "Precisa ter letra maiúscula")
})


const loginSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha inválida")
})

module.exports = {
    registerSchema,
    loginSchema
}