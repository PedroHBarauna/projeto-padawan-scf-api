class WorkOrderRepositoryInMemory {
    ordensDeServico = [
        {   
            id: 1,
            userId: 2,
            nomeCliente: 'Jãozinho da Silva',
            emailCLiente: 'jao@mail.com',
            cpfCliente: '12345678910',
            idTipoOrdem: 2,
            data: 'Sat Dec 17 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)',
            obs:'',
            status: 'Em andamento'
        },
        {   
            id: 2,
            userId: 2,
            nomeCliente: 'Mary da Silva',
            emailCLiente: 'mary@mail.com',
            cpfCliente: '12345677891',
            idTipoOrdem: 3,
            data: 'Sat Dec 17 2022 00:00:00 GMT-0300 (Horário Padrão de Brasília)',
            obs:'',
            status: 'Em andamento'
        }
    ];

    async cadastrarOrdem({
        userId,
        nomeCliente,
        emailCliente,
        cpfCliente,
        idTipoOrdem,
        data,
        obs,
        status,
    }){
        const ordem = {
            id: Math.floor(Math.random() * 1000) + 1,
            userId,
            nomeCliente,
            emailCliente,
            cpfCliente,
            idTipoOrdem,
            data,
            obs,
            status,
        };

        this.ordensDeServico.push(ordem);

        return ordem.id;
    }

    async listarOrdens(usuario) {
        let ordens = this.ordensDeServico;
        if (usuario) {
            ordens = this.ordensDeServico.find(ordem => ordem.userId == usuario);
        }

        return ordens;
    }

    async buscarOrdem(ordemId) {
        const ordem = this.ordensDeServico.find(ordem => ordem.id == ordemId);

        return ordem;
    }
}

module.exports = new WorkOrderRepositoryInMemory();