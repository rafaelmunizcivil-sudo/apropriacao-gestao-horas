// Helpers genéricos de CRUD reutilizados por todos os Services (Firestore SDK modular)
import {
  collection, addDoc, setDoc, updateDoc, deleteDoc, doc, getDoc, getDocs,
  query, where, orderBy, serverTimestamp, onSnapshot,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { db } from './firebase-config.js';

export function criarBase(nomeColecao) {
  const ref = collection(db, nomeColecao);

  return {
    async criar(dados) {
      return addDoc(ref, { ...dados, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
    },
    async criarComId(id, dados) {
      return setDoc(doc(db, nomeColecao, id), { ...dados, createdAt: serverTimestamp(), updatedAt: serverTimestamp() }, { merge: true });
    },
    async atualizar(id, dados) {
      return updateDoc(doc(db, nomeColecao, id), { ...dados, updatedAt: serverTimestamp() });
    },
    async excluir(id) {
      return deleteDoc(doc(db, nomeColecao, id));
    },
    async buscarPorId(id) {
      const snap = await getDoc(doc(db, nomeColecao, id));
      return snap.exists() ? { id: snap.id, ...snap.data() } : null;
    },
    async listarTodos(...condicoes) {
      const q = condicoes.length ? query(ref, ...condicoes) : ref;
      const snap = await getDocs(q);
      return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    },
    ouvirTodos(callback, ...condicoes) {
      const q = condicoes.length ? query(ref, ...condicoes) : ref;
      return onSnapshot(q, (snap) => callback(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), (err) => console.error(`[${nomeColecao}] onSnapshot erro:`, err.code, err.message));
    },
    ref,
  };
}

export { where, orderBy };
