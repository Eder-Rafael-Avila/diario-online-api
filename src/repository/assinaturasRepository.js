import { con } from './connection.js';

export async function saveAssinatura(assinatura, dataInicio, status, valor) {
    const command = `
        insert into assinaturas (id_usuario, data_inicio, data_expiracao, valor, periodo, status)
        values (?, ?, ?, ?, ?, ?)
    `

    const [result] = await con.query(command, [
        assinatura.id_usuario,
        dataInicio,
        assinatura.data_expiracao,
        valor,
        assinatura.periodo,
        status
    ])

    return result.insertId;
}

export async function getAssinaturas() {
    const command = `
        select * from assinaturas
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function getAssinaturaByUserId(id) {
    const command = `
        select * from assinaturas
        where id_usuario = ?
    `

    const [result] = await con.query(command, [id]);

    return result[0];
}