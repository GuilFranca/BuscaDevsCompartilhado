// VALIDAÇÃO LOGIN

alert('entrouJS')
// Import the functions from the Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// Firebase configuration (substitua pelos seus dados)
const firebaseConfig = {
  apiKey: "AIzaSyBgXSa4kvCMFlxi4cym0FJXzKvesXcjR3E",
  authDomain: "buscadev-c62c0.firebaseapp.com",
  projectId: "buscadev-c62c0",
  storageBucket: "buscadev-c62c0.appspot.com",
  messagingSenderId: "637398462359",
  appId: "1:637398462359:web:4a7e216041c176077d5ed2",
  measurementId: "G-SRML28ZC9N"
};
// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Função de login com feedback visual
document.getElementById('btn-login').addEventListener('click', () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Login realizado com sucesso!');

      // Mostra o feedback visual
      const feedbackElement = document.getElementById('feedback-success');
      feedbackElement.classList.add('show');
      
      // Remove o feedback após 3 segundos
      setTimeout(() => {
        feedbackElement.classList.remove('show');
      }, 3000);

      toggleAuthState(true);
    })
    .catch((error) => {
      alert('Erro no login: ' + error.message);
    });
});

// Função de cadastro
document.getElementById('cadastro-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Previne o comportamento padrão de envio do formulário


  const email = document.getElementById('email-cd').value;
  const password = document.getElementById('password-cd').value;

  console.log("email: " + email)
  console.log("senha: " + password)
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert('Cadastro realizado com sucesso!');
      toggleAuthState(true);
    })
    .catch((error) => {
      alert('Erro no cadastro: ' + error.message);
    });
});

// Função de logout
document.getElementById('logout-btn').addEventListener('click', () => {
  signOut(auth).then(() => {
    alert('Logout realizado com sucesso!');
    toggleAuthState(false);
  }).catch((error) => {
    alert('Erro ao realizar logout: ' + error.message);
  });
});

// Verifica se há usuário logado
onAuthStateChanged(auth, (user) => {
  if (user) {
    toggleAuthState(true);
  } else {
    toggleAuthState(false);
  }
});

// Função para alternar o estado da autenticação (ocultar/mostrar botões)
function toggleAuthState(isLoggedIn) {
  if (isLoggedIn) {
    document.getElementById('btn-login').style.display = 'none';
    document.getElementById('signup-btn').style.display = 'none';
    document.getElementById('logout-btn').style.display = 'block';
  } else {
    document.getElementById('btn-login').style.display = 'block';
    document.getElementById('signup-btn').style.display = 'block';
    document.getElementById('logout-btn').style.display = 'none';
  }
}