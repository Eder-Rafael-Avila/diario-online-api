import * as dB from '../repository/administradoresRepository.js';

export async function saveAdmin(admin) {
    if (!admin.email || !admin.senha || !admin.nome) {
        throw new Error('Todos os campos devem ser preenchidos.');
    }

    const emailUsado = await dB.getAdminByEmail(admin.email);
    if (emailUsado.firstResult) {
        throw new Error('Email já está em uso.');
    }

    const result = await dB.saveAdmin(admin);
    return result;
}

export async function getAdmin() {
    const result = await dB.getAdmin();
    return result;
}

export async function getAdminByEmail(email) {
    const result = await dB.getAdminByEmail(email);

    if (result.emptyResult) {
        const response = {
            message: 'Nenhum usuário encontrado para este e-mail.'
        }

        return response;
    }

    return result;
}

export async function getAdminById(id) {
    const result = await dB.getAdminById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    if (!result) {
        throw new Error('Nenhum admin encontrado para este ID.');
    }

    return result;
}

export async function editAdmin(admin, id) {

    const idExiste = await dB.getAdminById(id);
    console.log(idExiste);

    if (!idExiste) {
        throw new Error('Nenhum admin encontrado para este ID.')
    }

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    if (!admin.nome || !admin.email || !admin.senha) {
        throw new Error('Todos os campos devem ser preenchidos.');
    }

    const result = await dB.editAdmin(admin, id);
    return result;
}

export async function deleteAdmin(id) {

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    const result = await dB.deleteAdmin(id);
    return result;
}

export async function consultarRenda() {
    return dB.consultarRenda();
}