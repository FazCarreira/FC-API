module.exports = {
    roles: { aluno: 'aluno', facilitador: 'facilitador', empresa: 'empresa', admin: 'admin' },
    admin: { email: "admin@fazcarreira.com", password: "123", name: 'SUPERADMIN', phone: '0', role: 'admin' },
    aluno: { email: "aluno@fazcarreira.com", password: "123", name: 'Aluno Teste', phone: '0', role: 'aluno', profile_type: 'aluno' },
    iSite: {
        opinioes: [
            { nome: "Fulano", desc: "Cum a fugit sed impedit corrupti et. Aspernatur aut accusamus corporis maiores optio repellendus. Architecto possimus ex harum consequatur sit voluptas architecto. Dolores vitae sit itaque sit occaecati non." },
            { nome: "Beltrano", desc: "Sint recusandae hic et. Velit at blanditiis ipsum sint et error eveniet. Natus non dolore ullam aliquid mollitia dolor ea. Accusantium voluptatem minus reiciendis sunt ipsam. Perspiciatis adipisci blanditiis laudantium quidem perspiciatis voluptatem tempora facilis." }
        ],
        apoiadores: [{
            name: "FortBrasil"
        }, {
            name: "Super Mercadinhos São Luiz"
        }, {
            name: "ceneged"
        }, {
            name: "Farmácias Pague Menos"
        }],
        contato: {
            local: "Fortaleza",
            email: "contato@fazcarreira.com",
            telefone: ["(85) 98881-0354", '']
        }
    },

    asyncForEach: async (array, callback) => {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index, array);
        }
    }
}