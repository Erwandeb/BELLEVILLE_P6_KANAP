// Recuperation du numéro de commande dans le localstorage et affichage dans le DOM
const orderId = document.getElementById("orderId");
const confirmComande = JSON.parse(localStorage.getItem("commande"));
orderId.innerHTML = confirmComande.orderId;