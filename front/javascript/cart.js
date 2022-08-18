/***
 * 
 * SCRIPT : GESTION DU PANIER
 * 
 */

const displayItem = document.querySelector('.item');
const displaySelecteditem = document.getElementById("cart__items");
const messagePanierVide = document.getElementById("message-panier-vide");
const totalQuantity = document.getElementById("totalQuantity");
const totalPrice = document.getElementById("totalPrice");


let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;
const id = "";
let finalOrderList =[];
let quantityItemOfTheCart = [];
const canapeInCart = getProducts();


// Si le panier est vide
if(canapeInCart.length === 0){
    messagePanierVide.innerHTML = `Le panier est vide  :(`;
    document.querySelector('.cart__order').style.display="none";
}

const productListRawFromApi = []; 

// Affichage pour chaque éléments dans le panier
canapeInCart.forEach(canape => {
    fetch(`http://localhost:3000/api/products/${canape.idProduit}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {

        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displaySelecteditem.innerHTML += produit.renderItemDetailsOnCart(canape.quantite, canape.couleur);
        
        productListRawFromApi.push(produit);
        const articles = document.getElementsByClassName('cart__item');
        totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);
        totalQuantity.textContent = getTotalItemsInBasket();
        

        for(element of articles){
            const color = element.dataset.color
            const id = element.dataset.id
            const input = element.querySelector('input')
           
            // Gestion du champs quantité
            input.addEventListener('change', (e)=>{
                let quantiteArticle = parseInt(e.target.value);
            
                if(quantiteArticle <= 0){
                    deleteProduct(id, color);
                    element.remove();
                }else {
                    if(quantiteArticle > 100){
                        quantiteArticle = 100;
                        e.target.value = 100;
                    }
                    changeProductQuantity(quantiteArticle, id, color);
                }
                totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);
                totalQuantity.textContent = getTotalItemsInBasket();
            })

            // Gestion du bouton supprimer
            const deleteItem = element.querySelector('.deleteItem')
            deleteItem.addEventListener('click', (e)=>{
                deleteProduct(id, color)
                element.remove();
                totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);
                totalQuantity.textContent = getTotalItemsInBasket();
            })
       }
    })
    .catch(error => console.log("error dans le fetch"+ error)) 
});