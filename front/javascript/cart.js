const displayItem = document.querySelector('.item');
const displaySelecteditem = document.getElementById("cart__items");

let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;

const id = localStorage.getItem('id');


/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */
const loadItemInCart = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        
        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displaySelecteditem.innerHTML = produit.renderItemDetailsOnCart();
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadItemInCart();