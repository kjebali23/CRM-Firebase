//logout 
const logout = document.querySelector('#logout');
logout.addEventListener('click' , (e) => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location = 'Log-in.html'; 
    });
} );