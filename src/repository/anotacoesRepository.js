import { con } from './connection.js';

export async function saveAnotacao(anotacao, dataCriacao) {
    const command = `
        insert into anotacoes (id_usuario, id_tema, titulo, conteudo, data_criacao, data_atualizacao)
        values (?, ?, ?, ?, ?, ?)
    `

    const [result] = await con.query(command, [
        anotacao.id_usuario,
        anotacao.id_tema,
        anotacao.titulo,
        anotacao.conteudo,
        dataCriacao,
        anotacao.data_atualizacao
    ])

    return result.insertId;
}

export async function getAnotacoes() {
    const command = `
        select * from anotacoes
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function getAnotById(id) {
    const command = `
        select * from anotacoes
        where id_anotacoes = ?
    `

    const [result] = await con.query(command, [id]);
    
    return result[0];
}

export async function editAnotacao(anotacao, id, dataAtualizacao) {
    const command = `
        update anotacoes
        set titulo = ?,
            conteudo = ?,
            data_atualizacao = ?
        where id_anotacoes = ?
    `

    const [result] = await con.query(command, [
        anotacao.titulo,
        anotacao.conteudo,
        dataAtualizacao,
        id
    ])

    return result.affectedRows;
}

export async function deleteAnotacao(id) {
    const command = `
        delete from anotacoes
        where id_anotacoes = ?
    `

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}

export async function mudarTema(idTema, idAnot) {
    const command = `
        update anotacoes
        set id_tema = ?
        where id_anotacoes = ?
    `

    const [result] = await con.query(command, [
        idTema,
        idAnot
    ]);

    return result.affectedRows;
}

export async function anotacoesRecentes() {
    const command = `
        select * from anotacoes
        order by data_criacao desc
    `

    const [result] = await con.query(command, []);

    return result;
}