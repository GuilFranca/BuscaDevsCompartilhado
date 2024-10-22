function onChangeEmail() {
  toggleButtonsDisable();
  toggleEmailErrors();
}

function onChangePassword() {
  toggleButtonsDisable();
  togglePasswordErrors();
}

function userLogin() { // Renomeado para userLogin
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(response => {
      window.location.href = "BuscaDevsCompartilhado-main/logado/logado.html";
    })
    .catch(error => {
      alert(getErrorMessage(error));
    });
}

function userRegister() { // Renomeado para userRegister
  window.location.href = "BuscaDevsCompartilhado-main/login.html";
}

function getErrorMessage(error) {
  if (error.code === "auth/user-not-found") {
    return "Usuário não encontrado";
  }
  return error.message;
}

function toggleEmailErrors() {
  const email = document.getElementById("email").value;
  const emailRequiredError = document.getElementById("email-required-error");
  const emailInvalidError = document.getElementById("email-invalid-error");

  emailRequiredError.style.display = email ? "none" : "block";
  emailInvalidError.style.display = validateEmail(email) ? "none" : "block";
}

function togglePasswordErrors() {
  const password = document.getElementById("password").value;
  const passwordRequiredError = document.getElementById("password-required-error");

  passwordRequiredError.style.display = password ? "none" : "block";
}

function toggleButtonsDisable() {
  const emailValid = isEmailValid();
  const recoverPasswordButton = document.getElementById("recover-password-button");
  const loginButton = document.getElementById("login-button");

  recoverPasswordButton.disabled = !emailValid;
  const passwordValid = isPasswordValid();
  loginButton.disabled = !emailValid || !passwordValid;
}

function isEmailValid() {
  const email = document.getElementById("email").value;
  if (!email) {
    return false;
  }
  return validateEmail(email);
}

function isPasswordValid() {
  return document.getElementById("password").value ? true : false;
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
}
