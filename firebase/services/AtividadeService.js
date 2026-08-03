// Coleção: atividades — { nome (ex: "APROJ"), descricao (ex: "Análise e avaliação de projeto"), ativo, createdAt, updatedAt }
// Substitui a lista fixa TIPOS_TAREFA hoje embutida no código; "Área" foi decidida como não utilizada nesta estrutura.
import { criarBase } from '../firestoreBase.js';

const base = criarBase('atividades');

export const AtividadeService = {
  criar: base.criar,
  atualizar: base.atualizar,
  excluir: base.excluir,
  buscarPorId: base.buscarPorId,
  listarTodos: () => base.listarTodos(),
  ouvirTodos: (callback) => base.ouvirTodos(callback),
};
