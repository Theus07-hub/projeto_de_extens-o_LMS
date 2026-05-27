const express = require('express')
const userRepository = require('../repositories/userRepository')
const bcrypt = require('bcrypt')

exports.register = async(name, email, senha) => {
    const usuarioExiste = await userRepository.findByEmail(email)

    if(usuarioExiste){
        const error = new Error('Usuário já cadastrado')
        error.status = 400

        throw error
    }

    const senhaHash = await bcrypt.hash(senha, 10)

    await userRepository.createUser({
        name, 
        email,
        senha: senhaHash
    })

    return {
        message: "Usuário cadastrado com sucesso"
    }
}

exports.login = async(email, senha) => {
    const user = await userRepository.findByEmail(email)

    if(!user){
        const error = new Error('Usuário não encontrado')
        error.status = 404

        throw error
    }

    const senhaValida = await bcrypt.compare(senha, user.senha)

    if(!senhaValida){
        const error = new Error('Senha inválida')
        error.status = 401

        throw error
    }

    return {
        message: "Login realizado com sucesso"
    }
}