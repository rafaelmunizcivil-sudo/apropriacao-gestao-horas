// Coleção: usuarios — id do documento = uid do Firebase Auth
// { nome, email, perfil ('funcionario' | 'supervisor'), ativo, createdAt, updatedAt }
import { criarBase } from '../firestoreBase.js';

const base = criarBase('usuarios');

export const UsuarioService = {
  criarComId: base.criarComId, // usado no cadastro: criarComId(uid, { nome, email, perfil, ativo: true })
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId, // buscarPorId(uid)
  listarTodos: () => base.listarTodos(),
  ouvirTodos: (callback) => base.ouvirTodos(callback),
};
