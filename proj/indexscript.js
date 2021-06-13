//listen for auth status changes
auth.onAuthStateChanged(user =>{
    setupUI(user);
    
});

const userName = document.querySelector('.userName');

const setupUI =(user) =>{
    if (user){
        const html = `<div>${user.email} </div>`;
        userName.innerHTML = html;
       
    }
    else{
        userName.innerHTML = "";
        window.location.href = "Log-in.html";

    }
}



db.collection('users').get().then(snap => {
    size = snap.size // will return the collection size
   
    sessionStorage.setItem("size", size);
 const Nclients = document.querySelector('.Nclients');
const NC = `<div>${size} </div>`;
Nclients.innerHTML = NC;

});


db.collection('opp').get().then(snap => {
    size = snap.size // will return the collection size
    
    sessionStorage.setItem("size", size);
 const Nopp = document.querySelector('.Nopp');
const NO = `<div>${size} </div>`;
Nopp.innerHTML = NO;

});

db.collection('Leads').get().then(snap => {
    size = snap.size // will return the collection size
    
    sessionStorage.setItem("size", size);
 const Nlead = document.querySelector('.Nlead');
const Nl = `<div>${size} </div>`;
Nlead.innerHTML = Nl;

});

db.collection('entreprise').get().then(snap => {
    size = snap.size // will return the collection size
   
    sessionStorage.setItem("size", size);
 const Nrdv = document.querySelector('.Nentreprise');
const Nr = `<div>${size} </div>`;
Nrdv.innerHTML = Nr;

});





