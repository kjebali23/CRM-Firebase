//signup

const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit' , e =>{
    e.preventDefault();

const email = signupForm['email'].value;
const pass  = signupForm['pass'].value;


//sign up the user

auth.createUserWithEmailAndPassword(email , pass).then(cred =>{
    console.log(cred);
    firebase.auth().onAuthStateChanged(user => {
        if(user) {
          window.location = 'index.html'; //After successful login, user will be redirected to home.html
        }
      })
}).catch(err =>{
if(err.message == 'The email address is already in use by another account.'){
console.log(err);
  signupForm.querySelector('.error').innerHTML = 'Cet email est associé a un autre compte';
}
})





});




