import { con } from './connection.js';

export async function getLembretes() {
    const command = `
        select * from lembretes
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function saveLembrete(lembrete, dataCriacao, concluido) {
    const command = `
        insert into lembretes (id_usuario, titulo, descricao, data_aviso, concluido, data_criacao)
        values (?, ?, ?, ?, ?, ?)
    `

    const [result] = await con.query(command, [
        lembrete.id_usuario,
        lembrete.titulo,
        lembrete.descricao,
        lembrete.data_aviso,
        concluido,
        dataCriacao
    ])

    return result.insertId;
}

export async function getLembreteById(id) {
    const command = `
        select * from lembretes
        where id_lembrete = ?
    `

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function editLembrete(lembrete, concluido, id) {
    const command = `
        update lembretes
        set titulo = ?,
            descricao = ?,
            data_aviso = ?,
            concluido = ?
        where id_lembrete = ?
    `

    const [result] = await con.query(command, [
        lembrete.titulo,
        lembrete.descricao,
        lembrete.data_aviso,
        concluido,
        id
    ])

    return result.affectedRows;
}

export async function deleteLembrete(id) {
    const command = `
        delete from lembretes
        where id_lembrete = ?
    `

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}

export async function markLembreteAsConcluido(id_lembrete) {
    const command = `
        update lembretes
        set concluido = 1
        where id_lembrete = ?
    ` 

    const [result] = await con.query(command, [id_lembrete]);

    return result.affectedRows;
}

export async function getLembretesConcluidos() {
    const command = `
        select * from lembretes
        where concluido = 1;
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function getLembretesPendentes() {
    const command = `
        select * from lembretes
        where concluido = 0;
    `

    const [result] = await con.query(command, []);

    return result;
}