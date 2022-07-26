const displayItem = document.querySelector('.item');
const displaySelecteditem = document.getElementById("cart__items");
const messagePanierVide = document.getElementById("message-panier-vide");

let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;
const id = "";
let canapes = [];

const canapeInCart = getProducts();

/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */


if(canapeInCart.length === 0){
    messagePanierVide.innerHTML = `Le panier est vide  :(`;
}else{
    messagePanierVide.innerHTML = ``;
}


    canapeInCart.forEach(canape => {
        fetch(`http://localhost:3000/api/products/${canape.idProduit}`)
        .then((response) => {
            return response.json()
        })
        .then(data => {

            const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
            displaySelecteditem.innerHTML += produit.renderItemDetailsOnCart(canape.quantite, canape.couleur);
            

            const deleteButton = document.getElementsByClassName('deleteItem');
            for(button of deleteButton){
                button.addEventListener('click', ()=>{
                    console.log('click', produit._id)
                    
                })
            }

        })
        .catch(error => console.log("error dans le fetch"+ error)) 
    });
    
