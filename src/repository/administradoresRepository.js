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

export async function deleteAdmin(id) {
    command = `
        delete from administradores
        where id = ?;
    `

    const [result] = await con.query(command, [i]);

    return result.affectedRows;
}