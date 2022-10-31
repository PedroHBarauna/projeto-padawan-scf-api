const AppError = require('../../utils/AppError');

class UserCreateService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async execute({nome, email, senha}){
        if (nome && email && senha) {
            const emailIndisponivel = await userRepository.encontrarPorEmail(email);

            if (emailIndisponivel) {
                throw new AppError('Este email já está cadastrado.');
            }

            const userId = await userRepository.criarUsuario({ nome, email, senha });
    
            if (userId) {
                return userId;
            }
        }
        throw new AppError('Informe nome, email e senha.')
    }
}

module.exports = UserCreateService;