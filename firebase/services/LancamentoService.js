// Coleção: lancamentos
// { usuarioId (ref usuarios), clienteId, contratoId, projetoId, atividadeId, data ('YYYY-MM-DD'),
//   horas (number), descricao, status ('ativo'|'cancelado'), createdAt, updatedAt }
// Sem horaInicio/horaFim/intervalo (decidido manter só "horas" direto) e sem areaId (decidido não usar Área).
import { criarBase, where, orderBy } from '../firestoreBase.js';

const base = criarBase('lancamentos');

export const LancamentoService = {
  criar: base.criar,
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId,
  listarPorUsuario: async (usuarioId) => {
    const lista = await base.listarTodos(where('usuarioId', '==', usuarioId));
    return lista.slice().sort((a, b) => (a.data || '').localeCompare(b.data || ''));
  },
  ouvirPorUsuario: (usuarioId, callback) => base.ouvirTodos(
    (lista) => callback(lista.slice().sort((a, b) => (a.data || '').localeCompare(b.data || ''))),
    where('usuarioId', '==', usuarioId),
  ),
  // Painel da coordenação: histórico completo, todos os usuários
  listarTodos: () => base.listarTodos(orderBy('data', 'asc')),
  ouvirTodos: (callback) => base.ouvirTodos(callback, orderBy('data', 'asc')),
};
