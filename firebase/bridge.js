// Bridge: expõe Firebase Auth/Firestore (SDK modular) como window.FB para a lógica do Design Component
import { initializeApp, deleteApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut,
  sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
import { auth } from './firebase-config.js';
import { ClienteService } from './services/ClienteService.js';
import { ContratoService } from './services/ContratoService.js';
import { ProjetoService } from './services/ProjetoService.js';
import { AtividadeService } from './services/AtividadeService.js';
import { UsuarioService } from './services/UsuarioService.js';
import { LancamentoService } from './services/LancamentoService.js';
import { HistoricoService } from './services/HistoricoService.js';
import { ExcecaoPreenchimentoService } from './services/ExcecaoPreenchimentoService.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDrFgJPEkTPsdicMH11wfVNI-Dk9sTby-M',
  authDomain: 'apropiacao-de-horas.firebaseapp.com',
  projectId: 'apropiacao-de-horas',
  storageBucket: 'apropiacao-de-horas.firebasestorage.app',
  messagingSenderId: '660858696532',
  appId: '1:660858696532:web:0deb3d87d5f05fe2c04ec1',
};

// Cria funcionário sem derrubar a sessão do supervisor logado: usa uma segunda instância do app
async function criarFuncionario(nome, email, perfil = 'funcionario', senhaInicial = '123456') {
  const appSecundario = initializeApp(firebaseConfig, `secundario-${Date.now()}`);
  const authSecundario = getAuth(appSecundario);
  try {
    let uid;
    try {
      const cred = await createUserWithEmailAndPassword(authSecundario, email, senhaInicial);
      uid = cred.user.uid;
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        const cred = await signInWithEmailAndPassword(authSecundario, email, senhaInicial);
        uid = cred.user.uid;
      } else {
        throw e;
      }
    }
    await UsuarioService.criarComId(uid, { nome, email, perfil, ativo: true });
    await signOut(authSecundario);
    return uid;
  } finally {
    await deleteApp(appSecundario);
  }
}

window.FB = {
  onAuthStateChanged: (cb) => onAuthStateChanged(auth, cb),
  signIn: (email, senha) => signInWithEmailAndPassword(auth, email, senha),
  signOut: () => signOut(auth),
  resetPassword: (email) => sendPasswordResetEmail(auth, email),
  updatePassword: (novaSenha) => updatePassword(auth.currentUser, novaSenha),
  criarFuncionario,
  ClienteService, ContratoService, ProjetoService, AtividadeService,
  UsuarioService, LancamentoService, HistoricoService, ExcecaoPreenchimentoService,
};
window.dispatchEvent(new Event('fb-ready'));
