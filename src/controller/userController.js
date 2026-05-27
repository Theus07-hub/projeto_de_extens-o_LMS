const express = require('express')
const userService = require('../service/userService')
const { registerSchema } = require('../validators/UserValidator')
const { loginSchema } = require('../validators/UserValidator')

exports.register = async (req, res) => {
    try{

        registerSchema.parse(req.body)

        const { name, email, senha } = req.body

        const result = await userService.register(
            name,
            email,
            senha
        )

        return res.status(201).json({
            success: true,
            message: "Usuário cadastrado com sucesso"
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Erro ao cadastrar usuário"
        })
    }
}

exports.login = async(req, res) => {
    
    try{

        loginSchema.parse(req.body)

        const { email, senha } = req.body
    
        const result = await userService.login(
            email,
            senha
        )

        return res.status(200).json({
            success: true,
            message: "Login realizado com sucesso"
        })
    }
    catch(error){
        console.log(error)
        return res.status(400).json({
            success: false,
            message: "Erro ao fazer login"
        })
    }
}