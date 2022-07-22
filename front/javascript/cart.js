const displayItem = document.querySelector('.item');
const displaySelecteditem = document.getElementById("cart__items");

let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;
const id = "";
let canapes = [];

//const id = localStorage.getItem('id');
//const quantity = localStorage.getItem('quantity')
//const color = localStorage.getItem('color')

//const produitInCart = localStorage.getItem(item);
//console.log(produitInCart)

//getProductFromLocalStorage();


// Initialising 
const canapeInCart = getProducts();

canapes.push(JSON.parse(localStorage.getItem( "basket" )));

console.log("zzoz",canapes[0])
/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */
    canapeInCart.forEach(canape => {
        fetch(`http://localhost:3000/api/products/${canape.idProduit}`)
        .then((response) => {
            return response.json()
        })
        .then(data => {

            

         
            const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
           
            console.log(produit);
            
            displaySelecteditem.innerHTML += produit.renderItemDetailsOnCart(canape.quantite, canape.couleur);

            document.querySelectorAll('div.deleteItem').addEventListener('click', ()=>{
                console.log("testing delete")
            });
            
        })
        .catch(error => console.log("error dans le fetch"+ error)) 
    });
    




//loadItemInCart();

// Fonction de supression des mots clés
function deleteKeyWord(list, element){
    const index = list.indexOf(element)
    if(index > -1 || index === -1){ 
        list.splice(index, 1);
        return list;
    }
}
