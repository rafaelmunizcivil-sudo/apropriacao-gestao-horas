// Inicialização do Firebase (SDK modular) — projeto "apropiacao-de-horas"
import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';

const firebaseConfig = {
  apiKey: 'AIzaSyDrFgJPEkTPsdicMH11wfVNI-Dk9sTby-M',
  authDomain: 'apropiacao-de-horas.firebaseapp.com',
  projectId: 'apropiacao-de-horas',
  storageBucket: 'apropiacao-de-horas.firebasestorage.app',
  messagingSenderId: '660858696532',
  appId: '1:660858696532:web:0deb3d87d5f05fe2c04ec1',
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
