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

export async function deleteAdmin(id) {
    const result = await dB.deleteAdmin(id);
    return result;
}