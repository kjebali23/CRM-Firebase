//listen for auth status changes
auth.onAuthStateChanged(user =>{
    setupUI(user);
    
  });
  
  
  
  const setupUI =(user) =>{
    if (user){
        console.log(user);
       
    }
    else{
        window.location.href = "Log-in.html";
  
    }
  };