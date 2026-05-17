const express = require('express')
const userService = require('../service/userService')
const userRepository = require('../repositories/userRepository')

exports.register = async(req, res) => {
    try{
        const { nome, email, senha } = req.body

        const result = await userService.register(
            nome, 
            email, 
            senha
        )

        res.status(201).json({message: "Usuário cadastro com sucesso"})
    } catch(error) {
        console.log(error)
        return res.status(500).json({error: "Erro no servidor"})
    }
}

exports.login = async(req, res) => {
    try{
        const { email, senha } = req.body

        const result = await userService.login(email, senha)

        res.status(200).json({message: "Login realizado com sucesso"})
    } catch(error){
        console.log(error)
        return res.status(500).json({error: "Erro no servidor"})
    }
}
