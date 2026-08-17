// Coleção: contratos — { numeroContrato, tipo ('P'|'M'|'S'|''), nome, cliente, createdAt, updatedAt }
import { criarBase, where } from '../firestoreBase.js';

const base = criarBase('contratos');

export const ContratoService = {
  criar: base.criar,
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId,
  listarTodos: () => base.listarTodos(),
  listarPorCliente: (clienteId) => base.listarTodos(where('clienteId', '==', clienteId)),
  ouvirPorCliente: (clienteId, callback) => base.ouvirTodos(callback, where('clienteId', '==', clienteId)),
};
