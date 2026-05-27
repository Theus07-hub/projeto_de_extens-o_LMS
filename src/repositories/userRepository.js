const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

exports.findByEmail = async(email) => {
    return await prisma.usuarios.findUnique({
        where: { email }
    })
}

exports.createUser = async(data) => {
    return await prisma.usuarios.create({
        data
    })
}