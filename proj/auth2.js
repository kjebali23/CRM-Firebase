//login

const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit' , e =>{
    e.preventDefault();

const email = loginForm['email'].value;
const pass  = loginForm['pass'].value;


//Login user

auth.signInWithEmailAndPassword(email , pass).then(cred =>{
    console.log(cred);
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
          window.location = 'index.html'; //After successful login, user will be redirected to index.html
        }
      })
}).catch(err =>{
  console.log(err.message);
    if(err.message == 'There is no user record corresponding to this identifier. The user may have been deleted.'){
      loginForm.querySelector('.error').innerHTML ='Email non trouvé';
  }else if(err.message == 'The password is invalid or the user does not have a password.'){
    loginForm.querySelector('.error').innerHTML ='Votre mot de passe est non valide';
  }
})





});