// Recuperation du numéro de commande dans le localstorage et affichage dans le DOM

const url = new URL(window.location);
const id = url.searchParams.get('id');

console.log(url);
console.log(id);

const orderId = document.getElementById("orderId");
const confirmComande = JSON.parse(localStorage.getItem("commande"));
orderId.innerHTML = confirmComande.orderId;