// Coleção: projetos — { contratoId (ref contratos), nomeProjeto, codigoProjeto, ativo, createdAt, updatedAt }
import { criarBase, where } from '../firestoreBase.js';

const base = criarBase('projetos');

export const ProjetoService = {
  criar: base.criar,
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId,
  listarTodos: () => base.listarTodos(),
  listarPorContrato: (contratoId) => base.listarTodos(where('contratoId', '==', contratoId)),
  ouvirPorContrato: (contratoId, callback) => base.ouvirTodos(callback, where('contratoId', '==', contratoId)),
};
