import * as dB from '../repository/assinaturasRepository.js';
import * as dBUsuarios from '../repository/usuariosRepository.js';

export async function saveAssinatura(assinatura, dataInicio, status, valor) {

    if (!assinatura.id_usuario || !assinatura.periodo) {
        throw new Error('Preencha os campos obrigatórios.')
    }

    const idExiste = await dBUsuarios.getUserById(assinatura.id_usuario);

    if (isNaN(assinatura.id_usuario)) {
        throw new Error('Insira um ID de usuário válido.');
    }

    if (!idExiste) {
        throw new Error('Nenhum usuário encontrado para este ID.');
    }

    const assinaturaUser = await dB.getAssinaturaByUserId(assinatura.id_usuario);
    console.log(assinaturaUser);

    if (assinaturaUser?.status == 'Ativo') {
        throw new Error('Este usuário já tem uma assinatura ativa.');
    }

    return dB.saveAssinatura(assinatura, dataInicio, status, valor);

}

export async function getAssinaturas() {
    return dB.getAssinaturas();
}