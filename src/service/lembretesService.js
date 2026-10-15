import * as dB from '../repository/lembretesRepository.js';
import * as dBUsuario from '../repository/usuariosRepository.js';

export async function saveLembrete(lembrete, dataCriacao, concluido) {

    if (!lembrete.id_usuario || !lembrete.titulo || !lembrete.descricao || !lembrete.data_aviso) {
        throw new Error('Preencha todos os campos.');
    }

    const idExiste = await dBUsuario.getUserById(lembrete.id_usuario);

    if (!idExiste) {
        throw new Error('Nenhum usuário encontrado para este ID.');
    }

    return dB.saveLembrete(lembrete, dataCriacao, concluido);

}

export async function getLembretes() {
    return dB.getLembretes();
}

export async function getLembreteById(id) {

    if (isNaN(id)) {
        throw new Error('Insira um ID válido.');
    }

    return dB.getLembreteById(id);
}

export async function editLembrete(lembrete, concluido, id) {

    if (!lembrete.titulo || !lembrete.descricao || !lembrete.data_aviso) {
        throw new Error('Preencha todos os campos.');
    }

    const idExiste = await dB.getLembreteById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido.');
    }

    if (!idExiste) {
        throw new Error('Nenhum lembrete encontrado para este ID.');
    }

    return dB.editLembrete(lembrete, concluido, id);

}

export async function deleteLembrete(id) {

    const idExiste = await dB.getLembreteById(id);

    if (isNaN(id)) {
        throw new Error('Insira um ID válido.');
    }

    if (!idExiste) {
        throw new Error('Nenhum lembrete encontrado para este ID.');
    }

    return dB.deleteLembrete(id);
}

export async function markLembreteAsConcluido(id_lembrete) {
    
    const idExiste = await dB.getLembreteById(id_lembrete);

    if (isNaN(id_lembrete)) {
        throw new Error('Insira um ID válido.');
    }

    if (!idExiste) {
        throw new Error('Nenhum lembrete encontrado para este ID.');
    }

    return dB.markLembreteAsConcluido(id_lembrete);

}

export async function getLembretesConcluidos() {
    return dB.getLembretesConcluidos();
}

export async function getLembretesPendentes() {
    return dB.getLembretesPendentes();
}