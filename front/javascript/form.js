/*
------ Gestion de la Modale en responsive-----

function editNav() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }
  
  // DOM Elements
  const modalbg = document.querySelector(".bground");
  const modalBtn = document.querySelectorAll(".modal-btn");
  const formData = document.querySelectorAll(".formData");
  const closeBtn = document.querySelector(".close")
  const fenetreEnvoie = document.querySelector('.fenetre-envoi')
  
  ---- Fonction permettant d'ouvrir et de fermer la fenetre modale-----
  
  // launch modal event
  modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
  
  // launch modal form
  function launchModal() {
    modalbg.style.display = "block";
  }
  
  
  // Click to leave
  closeBtn.addEventListener("click" , closeModal);
  
  // Close modal form
  function closeModal () {
    modalbg.style.display="none"
  }
  
  */

  /*----------------------- GESTION  DU FORMULAIRE -------------------------*/
  
  // Input 
  const form = document.getElementById('form');
  const firstName = document.getElementById("firstName");
  const lastName = document.getElementById("lastName");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const email = document.getElementById("email");

  // Messages d'erreurs
  const msgErrorFirstName = document.getElementById("firstNameErrorMsg");
  const msgErrorLastName = document.getElementById("lastNameErrorMsg");
  const msgErrorAdress = document.getElementById("addressErrorMsg");
  const msgErrorCity= document.getElementById("cityErrorMsg");
  const msgErrorEmail = document.getElementById("emailErrorMsg");


  /*---- fonctions----*/
  // Vérification des emails
  function emailIsValid (email) {
    return /\S+@\S+\.\S+/.test(email)
  }

// Suppressions des champs lorsque le formulaire est envoyé 
  function removeData() {
      firstName.value ="";
      lastName.value="";
      email.value="";
      city.value="";
      address.value='';
  }

  
  // validation au moment du clique sur "SUBMIT"
  form.addEventListener('submit', (e)=>{

    e.preventDefault();

    let antiNumberRegExp = new RegExp ('[0-9]');

    // Vérification du champ PRENOM
    if(firstName.value.trim() == "" || firstName.value == null){
        msgErrorFirstName.innerHTML = "Vous devez écrire votre prénom.";
      firstName.style.border = "2px solid #fe152f";
    } else if (antiNumberRegExp.test(firstName.value)){
        msgErrorFirstName.innerHTML = "Votre prénom ne doit pas comporter de chiffres ou de symboles.";
      firstName.style.border = "2px solid #fe152f";
    }else {
      msgErrorFirstName.innerHTML = "";
      firstName.style.border = "";
    }
  
    // Vérification du champ NOM
    if(lastName.value.trim() =="" || lastName.value == null){
      msgErrorLastName.innerHTML = "Vous devez écrire votre nom.";
      lastName.style.border ="2px solid #fe152f";
    } else if (antiNumberRegExp.test(lastName.value)){
      msgErrorLastName.innerHTML = "Votre nom ne doit pas comporter de chiffres ou de symboles.";
      lastName.style.border ="2px solid #fe152f";
    }else {
      msgErrorLastName.innerHTML = "";
      lastName.style.border ="";
    }
      
    // Vérification du champ address
    if(address.value.trim() =="" || address.value == null){
      msgErrorAdress.innerHTML = "Vous devez renseigner votre date de naissance.";
      address.style.border ="2px solid #fe152f";
    }else{
        msgErrorAdress.innerHTML = "";
        address.style.border ="";
    }
  
    // Vérification du champ City
    if(city.value.trim() =="" || city.value == null){
        msgErrorCity.innerHTML = "Vous devez écrire votre nom.";
        city.style.border ="2px solid #fe152f";
      } else if (antiNumberRegExp.test(city.value)){
        msgErrorCity.innerHTML = "Votre nom ne doit pas comporter de chiffres ou de symboles.";
        city.style.border ="2px solid #fe152f";
      }else {
        msgErrorCity.innerHTML = "";
        city.style.border ="";

    }
  
    // Vérification du champ EMAIL
    if(email.value.trim() =="" || email.value == null){
        msgErrorEmail.innerHTML = "Vous devez écrire votre e-mail.";
        email.style.border ="2px solid #fe152f";
      } else if (email.value.trim() === emailIsValid){
        msgErrorEmail.innerHTML = "L'e-mail saisi est incorrect.";
        email.style.border ="2px solid #fe152f";
      }else{
        msgErrorEmail.innerHTML = "";
        email.style.border ="";
    }

    const contact = new Client(firstName.value, lastName.value, address.value, city.value, email.value)
    const products = [];
    
    const order = {
        contact,
        products,
    };
    
    fetch("http://localhost:3000/api/products/order",{
        headers: {
            "Content-Type": "application/json",
          },
        method: "post",
        body: JSON.stringify(order)
    })
    .then((response) => {
        console.log(response)
        console.log(order.id)
        localStorage.setItem("commande effectué :", JSON.stringify(response));
    })
    .then(function(text) {
        console.log(text)
    })
    .catch((error) => console.log(error))

});
   
   
  
  
