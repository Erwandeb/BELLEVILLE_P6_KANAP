const displayItem = document.querySelector('.item');
const displaySelecteditem = document.getElementById("cart__items");

let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;
const id ="";
let canapes = [];

//const id = localStorage.getItem('id');
//const quantity = localStorage.getItem('quantity')
//const color = localStorage.getItem('color')

//const produitInCart = localStorage.getItem(item);
//console.log(produitInCart)

//getProductFromLocalStorage();

/*
for(let i=0; i<localStorage.length; i++) {
    let key = localStorage.key( i );
    console.log(key)

    //item.push(JSON.parse(localStorage.getItem( key )));
    //console.log("test", item);
}
*/



canapes.push(JSON.parse(localStorage.getItem( "basket" )));

console.log(canapes[0])
/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */


// Faire forEach()



/*
    for(canape of canapes[0]){
        fetch(`http://localhost:3000/api/products/${canape.idProduit}`)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
            displaySelecteditem.innerHTML = produit.renderItemDetailsOnCart(canape.quantite, canape.couleur);
        })
        .catch(error => console.log("error dans le fetch"+ error)) 
    }
    */
    canapes[0].forEach(canape => {
        fetch(`http://localhost:3000/api/products/${canape.idProduit}`)
        .then((response) => {
            return response.json()
        })
        .then(data => {
            const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
            displaySelecteditem.innerHTML = produit.renderItemDetailsOnCart(canape.quantite, canape.couleur);
        })
        .catch(error => console.log("error dans le fetch"+ error)) 
    });
    





    /*
    fetch(`http://localhost:3000/api/products/${element.idProduit}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displaySelecteditem.innerHTML = produit.renderItemDetailsOnCart(quantity, color);
    })
    .catch(error => console.log("error dans le fetch"+ error)) 
    */ 




//loadItemInCart();