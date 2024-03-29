/***
 * 
 * SCRIPT : GESTION DU FORMULAIRE ET ENVOI VERS LE BACK
 * 
 */


/*-----------------------------------------------------------*/
/* --------------- GESTION DES CHAMPS ---------------------*/
/*---------------------------------------------------------*/
  
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


// Suppressions des champs lorsque le formulaire est envoyé 
  function removeData() {
      firstName.value ="";
      lastName.value="";
      email.value="";
      city.value="";
      address.value='';
  }

  
  //  SUBMIT
  form.addEventListener('submit', (e)=>{

    e.preventDefault();

    let antiNumberRegExp = new RegExp ('[0-9]');

    // Vérification du champ PRENOM
    if(firstName.value.trim() == "" || firstName.value == null){
      msgErrorFirstName.innerHTML = "Vous devez écrire votre prénom.";
      firstName.style.border = "2px solid #fe152f";
      return;
    } else if (antiNumberRegExp.test(firstName.value)){
      msgErrorFirstName.innerHTML = "Votre prénom ne doit pas comporter de chiffres ou de symboles.";
      firstName.style.border = "2px solid #fe152f";
      return;
    }else {
      msgErrorFirstName.innerHTML = "";
      firstName.style.border = "";
    }
  
    // Vérification du champ NOM
    if(lastName.value.trim() =="" || lastName.value == null){
      msgErrorLastName.innerHTML = "Vous devez écrire votre nom.";
      lastName.style.border ="2px solid #fe152f";
      return;
    } else if (antiNumberRegExp.test(lastName.value)){
      msgErrorLastName.innerHTML = "Votre nom ne doit pas comporter de chiffres ou de symboles.";
      lastName.style.border ="2px solid #fe152f";
      return;
    }else {
      msgErrorLastName.innerHTML = "";
      lastName.style.border ="";
    }
      
    // Vérification du champ address
    if(address.value.trim() =="" || address.value == null){
      msgErrorAdress.innerHTML = "Vous devez renseigner votre date de naissance.";
      address.style.border ="2px solid #fe152f";
      return;
    }else{
        msgErrorAdress.innerHTML = "";
        address.style.border ="";
    }
  
    // Vérification du champ City
    if(city.value.trim() =="" || city.value == null){
        msgErrorCity.innerHTML = "Vous devez écrire votre nom.";
        city.style.border ="2px solid #fe152f";
        return;
      } else if (antiNumberRegExp.test(city.value)){
        msgErrorCity.innerHTML = "Votre nom ne doit pas comporter de chiffres ou de symboles.";
        city.style.border ="2px solid #fe152f";
        return;
      }else {
        msgErrorCity.innerHTML = "";
        city.style.border ="";

    }
  
    // Vérification du champ EMAIL
    if(email.value.trim() =="" || email.value == null){
        msgErrorEmail.innerHTML = "Vous devez écrire votre e-mail.";
        email.style.border ="2px solid #fe152f";
        return;
      }else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value))){
        msgErrorEmail.innerHTML = "L'e-mail saisi est incorrect.";
        email.style.border ="2px solid #fe152f";
      }else{
        msgErrorEmail.innerHTML = "";
        email.style.border ="";
    }

    // Faire controle exectuion du code si champ est faux 


    /*-----------------------------------------------------------*/
    /* --------------- ENVOI DU FORMULAIRE ---------------------*/
    /*---------------------------------------------------------*/

    // Contact de l'utilisateur
    const contact = new Client(firstName.value, lastName.value, address.value, city.value, email.value)
    
    // récupérations des id
    const products = [];
    for (let i = 0; i < canapeInCart.length; i++) {
      products.push(canapeInCart[i].idProduit)
    }

    // Objet a envoyer en traitement pour l'API
    const order = {
        contact,
        products,
    };
    
    // Requete formulaire vers l'API
    if(products.length > 0 ){
      fetch("http://localhost:3000/api/products/order",{
          headers: {
              "Content-Type": "application/json",
            },
          method: "post",
          body: JSON.stringify(order)
      }).then(async (response) => {
          const order=  await response.clone().json();
          window.location.replace(`./confirmation.html?id=${order.orderId}`);
          removeData();
          localStorage.clear();
      })
      .catch((error) => console.log(error))
    }
  
});
