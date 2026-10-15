import * as dB from '../repository/anotacoesRepository.js';
import * as dBUsuario from '../repository/usuariosRepository.js';

export async function saveAnotacao(anotacao, dataCriacao) {

    if (!anotacao.id_usuario || !anotacao.titulo || !anotacao.conteudo) {
        throw new Error('Preencha todos os campos necessários.');
    }

    const idExiste = await dBUsuario.getUserById(anotacao.id_usuario);

    if (!idExiste) {
        throw new Error('Este ID não corresponde à nenhum usuário.');
    }

    return dB.saveAnotacao(anotacao, dataCriacao);

}

export async function getAnotacoes() {
    return dB.getAnotacoes();
}

export async function editAnotacao(anotacao, id, dataAtualizacao) {
    
    if (!anotacao.titulo || !anotacao.conteudo) {
        throw new Error('Todos os campos devem ser preenchidos.');
    }

    const idExiste = await dB.getAnotById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido.')
    }

    if (!idExiste) {
        throw new Error('Este ID não corresponde à nenhuma anotação.');
    }

    return dB.editAnotacao(anotacao, id, dataAtualizacao);

}

export async function deleteAnotacao(id) {

    const idExiste = await dB.getAnotById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido.')
    }

    if (!idExiste) {
        throw new Error('Este ID não corresponde à nenhuma anotação.');
    }

    return dB.deleteAnotacao(id);

}

export async function mudarTema(idTema, idAnot) {
    
    const idExiste = await dB.getAnotById(idAnot);

    if (isNaN(idAnot)) {
        throw new Error('Insira um ID válido.')
    }

    if (!idExiste) {
        throw new Error('Este ID não corresponde à nenhuma anotação.');
    }

    return dB.mudarTema();

}

export async function anotacoesRecentes() {
    return dB.anotacoesRecentes();
}