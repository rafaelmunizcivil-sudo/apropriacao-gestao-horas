// Coleção: excecoesPreenchimento — libera manualmente o preenchimento de uma data
// específica para um funcionário específico, mesmo depois do prazo de 5 dias úteis
// (ex: funcionário estava de atestado).
// Documento: { usuarioId, data ('YYYY-MM-DD'), motivo, liberadoPorUid, liberadoPorNome }
// Id do documento = `${usuarioId}_${data}` (evita duplicidade da mesma exceção).
import { criarBase } from '../firestoreBase.js';

const base = criarBase('excecoesPreenchimento');

export const ExcecaoPreenchimentoService = {
  async liberar({ usuarioId, data, motivo, liberadoPorUid, liberadoPorNome }) {
    return base.criarComId(`${usuarioId}_${data}`, {
      usuarioId, data, motivo: motivo || '', liberadoPorUid, liberadoPorNome,
    });
  },
  async revogar(usuarioId, data) {
    return base.excluir(`${usuarioId}_${data}`);
  },
  listarTodos: () => base.listarTodos(),
  ouvirTodos: (callback) => base.ouvirTodos(callback),
};
