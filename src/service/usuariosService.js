import * as dB from '../repository/usuariosRepository.js';

export async function saveUser(user) {

    if (!user.email || !user.senha || !user.nome_usuario || !user.data_cadastro || !user.chave_seguranca) {
        throw new Error('Todos os campos devem ser preenchidos.');
    }

    const emailUsado = await dB.getUserByEmail(user.email);

    if (emailUsado) {
        throw new Error('Email já está em uso.');
    }

    const result = await dB.saveUser(user);
    return result;
}

export async function getUser() {
    const result = await dB.getUser();
    return result;
}

export async function getUserByEmail(email) {
    const result = await dB.getUserByEmail(email);

    if (!result) {
        const response = {
            message: 'Nenhum usuário encontrado para este e-mail.'
        }

        return response;
    }

    return result;
}

export async function getUserById(id) {
    const result = await dB.getUserById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    if (!result) {
        throw new Error('Nenhum usuário encontrado para este ID.');
    }

    return result;
}

export async function editUser(user, id) {

    const idExiste = await dB.getUserById(id);

    if (!idExiste) {
        throw new Error('Nenhum usuário encontrado para este ID.')
    }

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    if (!user.nome_usuario || !user.email || !user.senha || !user.data_cadastro) {
        throw new Error('Todos os campos devem ser preenchidos.');
    }

    const result = await dB.editUser(user, id);
    return result;
}

export async function editPassword(senha, id, securityKey) {

    const idExiste = await dB.getUserById(id);

    if (!idExiste) {
        throw new Error('Nenhum usuário encontrado para este ID.')
    }

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    const trueSecurityKey = await dB.getSecurityKey(id);
    console.log(trueSecurityKey)

    if (!securityKey) {
        throw new Error('Insira sua chave de segurança');
    }

    if (securityKey != trueSecurityKey.chave_seguranca) {
        throw new Error('Chave de Segurança Incorreta.');
    }

    return dB.editPassword(senha, id);

}

export async function deleteUser(id) {

    if (isNaN(id)) {
        throw new Error('Insira um ID válido no parâmetro.');
    }

    const result = await dB.deleteUser(id);
    return result;
}