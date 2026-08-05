// Coleção: clientes — { nomeCompleto, sigla, tipo (P|S|M), descricao, ativo, createdAt, updatedAt }
import { criarBase } from '../firestoreBase.js';

const base = criarBase('clientes');

export const ClienteService = {
  criar: base.criar,
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId,
  listarTodos: () => base.listarTodos(),
  ouvirTodos: (callback) => base.ouvirTodos(callback),
};
