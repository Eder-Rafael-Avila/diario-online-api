import { con } from './connection.js';

export async function saveUser(user) {
    const command = `
        insert into usuarios(nome_usuario, email, senha, data_cadastro, ativo, chave_seguranca)
        values (?, ?, ?, ?, ?, ?);
    `

    const [result] = await con.query(command, [
        user.nome_usuario,
        user.email,
        user.senha,
        user.data_cadastro,
        user.ativo,
        user.chave_seguranca
    ]);

    return result.insertId;
}

export async function getUser() {
    const command = `
        select * from usuarios;
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function getUserByEmail(email) {
    const command = `
        select * from usuarios
        where email = ?;
    `

    const [result] = await con.query(command, [email]);
    
    return result[0];
}

export async function getUserById(id) {
    const command = `
        select * from usuarios
        where id_usuario = ?;
    `

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function getSecurityKey(id) {
    const command = `
        select chave_seguranca from usuarios
        where id_usuario = ?
    `

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function editUser(user, id) {
    const command = `
        update usuarios
        set nome_usuario = ?,
            email = ?,
            senha = ?,
            data_cadastro = ?,
            ativo = ?
        where id_usuario = ?
    `

    const [result] = await con.query(command, [
        user.nome_usuario,
        user.email,
        user.senha,
        user.data_cadastro,
        user.ativo,
        id
    ])

    return result.affectedRows;
}

export async function editPassword(senha ,id) {
    const command = `
        update usuarios
        set senha = ?
        where id_usuario = ?
    `

    const [result] = await con.query(command, [
        senha,
        id
    ])

    return result.affectedRows;
}

export async function deleteUser(id) {
    const command = `
        delete from usuarios
        where id_usuario = ?;
    `

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}