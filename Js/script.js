const cards = document.querySelector(".cards");
const images = document.querySelectorAll(".card__img");
const backgrounds = document.querySelectorAll(".card__bg");
const range = 40;


alert('entroujs')


const calcValue = (a, b) => (a / b * range - range / 2).toFixed(1) // thanks @alice-mx

let timeout;
document.addEventListener('mousemove', ({ x, y }) => {
  if (timeout) {
    window.cancelAnimationFrame(timeout);
  }

  timeout = window.requestAnimationFrame(() => {
    const yValue = calcValue(y, window.innerHeight);
    const xValue = calcValue(x, window.innerWidth);

    cards.style.transform = `rotateX(${yValue}deg) rotateY(${xValue}deg)`;

    [].forEach.call(images, (image) => {
      image.style.transform = `translateX(${-xValue}px) translateY(${yValue}px)`;
    });

    [].forEach.call(backgrounds, (background) => {
      background.style.backgroundPosition = `${xValue * .45}px ${-yValue * .45}px`;
    })
  })
}, false);


// VALIDAÇÃO LOGIN

  // Import Firebase
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
  import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";

  // Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBgXSa4kvCMFlxi4cym0FJXzKvesXcjR3E",
    authDomain: "buscadev-c62c0.firebaseapp.com",
    projectId: "buscadev-c62c0",
    storageBucket: "buscadev-c62c0.appspot.com",
    messagingSenderId: "637398462359",
    appId: "1:637398462359:web:4a7e216041c176077d5ed2",
    measurementId: "G-SRML28ZC9N"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  // Cadastro com feedback visual
  document.getElementById('cadastro-form').addEventListener('submit', (event) => {
    event.preventDefault(); // Previne o comportamento padrão de envio do formulário

    const email = document.getElementById('email-cd').value;
    const password = document.getElementById('password-cd').value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const feedbackSuccess = document.getElementById('feedback-success');
        feedbackSuccess.classList.add('show');
        setTimeout(() => feedbackSuccess.classList.remove('show'), 3000);
        toggleAuthState(true);
      })
      .catch((error) => {
        const feedbackError = document.getElementById('feedback-error');
        feedbackError.classList.add('show');
        feedbackError.innerHTML = 'Erro no cadastro: ' + error.message;
        setTimeout(() => feedbackError.classList.remove('show'), 3000);
      });
  });

  // Função de login com feedback visual
  document.getElementById('btn-login').addEventListener('click', () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const feedbackSuccess = document.getElementById('feedback-success');
        feedbackSuccess.classList.add('show');
        setTimeout(() => feedbackSuccess.classList.remove('show'), 3000);
        toggleAuthState(true);
      })
      .catch((error) => {
        const feedbackError = document.getElementById('feedback-error');
        feedbackError.classList.add('show');
        feedbackError.innerHTML = 'Erro no login: ' + error.message;
        setTimeout(() => feedbackError.classList.remove('show'), 3000);
      });
  });

  // Função para alternar o estado de autenticação
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
