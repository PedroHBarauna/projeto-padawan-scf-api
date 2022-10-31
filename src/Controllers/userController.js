const userRepository = require('../Repositories/UserRepositoryInMemory');
const AppError = require("../utils/AppError");

class UserController {
    async index(req, res) {
        const usuarios = await userRepository.index();

        if(usuarios.length > 0) {
            return res.json(usuarios);
        }

        throw new AppError('Nenhum usuário cadastrado.');
        
    }

    async show(req, res) {
        const { id } = req.params;
        const usuario = await userRepository.encontrarPorId(id);

        if (!usuario) {
            throw new AppError('Usuário não encontrado.');
        }
        
        return res.json(usuario);
    }

    async create(req, res) {
        const {nome, email, senha} = req.body;

        if (nome && email && senha) {
            const emailIndisponivel = await userRepository.encontrarPorEmail(email);

            
            if (emailIndisponivel) {
                throw new AppError('Este email já está cadastrado.');
            }

            const userId = await userRepository.criarUsuario({ nome, email, senha });
    
            if (userId) {
                return res.status(201).json(`${nome} - id ${userId} criado com sucesso!`);
            }
        }

        throw new AppError('Informe nome, email e senha.')
    }

}

module.exports = new UserController();