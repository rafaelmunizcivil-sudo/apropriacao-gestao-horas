// Coleção: historico — registra somente alterações em "lancamentos" (decidido)
// { usuarioId, acao ('criar'|'atualizar'|'excluir'), colecao: 'lancamentos', documentoId, dadosAntes, dadosDepois, createdAt }
import { criarBase, where, orderBy } from '../firestoreBase.js';

const base = criarBase('historico');

export const HistoricoService = {
  criar: base.criar, // registrarAlteracao: HistoricoService.criar({ usuarioId, acao, colecao: 'lancamentos', documentoId, dadosAntes, dadosDepois })
  listarPorLancamento: async (documentoId) => {
    const lista = await base.listarTodos(where('documentoId', '==', documentoId));
    return lista.slice().sort((a, b) => (a.createdAt?.seconds || 0) - (b.createdAt?.seconds || 0));
  },
  listarTodos: () => base.listarTodos(orderBy('createdAt', 'desc')),
};
