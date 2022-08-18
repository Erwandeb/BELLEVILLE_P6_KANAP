/***
 * 
 * SCRIPT : GESTION DE LA PAGE DE CONFIRMATION
 * 
 */

const url = new URL(window.location);
const id = url.searchParams.get('id');
const orderId = document.getElementById("orderId");

// Affichage de l'orderId sur la page confirmation
orderId.innerHTML = id;