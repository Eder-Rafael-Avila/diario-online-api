import { con } from './connection.js';

export async function saveAdmin(admin) {
    const command = `
        insert into administradores(nome, email, senha)
        values (?, ?, ?);
    `

    const [result] = await con.query(command, [
        admin.nome,
        admin.email,
        admin.senha
    ]);

    return result.insertId;
}

export async function getAdmin() {
    const command = `
        select * from administradores;
    `

    const [result] = await con.query(command, []);

    return result;
}

export async function getAdminByEmail(email) {
    const command = `
        select * from administradores
        where email = ?;
    `

    const [result] = await con.query(command, [email]);
    
    const firstResult = result[0];
    const emptyResult = result.length === 0;

    return { firstResult, emptyResult };
}

export async function getAdminById(id) {
    const command = `
        select * from administradores
        where id_admin = ?;
    `

    const [result] = await con.query(command, [id]);

    return result[0];
}

export async function editAdmin(admin, id) {
    const command = `
        update administradores
        set nome = ?,
            email = ?,
            senha = ?
        where id_admin = ?
    `

    const [result] = await con.query(command, [
        admin.nome,
        admin.email,
        admin.senha,
        id
    ])

    return result.affectedRows;
}

export async function deleteAdmin(id) {
    const command = `
        delete from administradores
        where id_admin = ?;
    `

    const [result] = await con.query(command, [id]);

    return result.affectedRows;
}

export async function consultarRenda() {
    const command = `
        select sum(valor) from assinaturas
    `

    const [result] = await con.query(command, []);

    return result;
}