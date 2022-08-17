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


if(canapeInCart.length === 0){
    messagePanierVide.innerHTML = `Le panier est vide  :(`;
    document.querySelector('.cart__order').style.display="none";
}

const productListRawFromApi = []; 

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
        //totalQuantity.textContent = getTotalItemsInBasket(productListRawFromApi)
        
        //quantityItemOfTheCart.push(canape.quantite).reduce((a, b) => a + b, 0);
        getTotalItemsInBasket(quantityAddInCart)

        console.log(quantityItemOfTheCart)
       // console.log(productListRawFromApi)

        for(element of articles){
            const color = element.dataset.color
            const id = element.dataset.id

            const input = element.querySelector('input')
            const errorQuantityMsg = element.querySelector('cart__item__content__settings__quantity')
            console.log(errorQuantityMsg)
            input.addEventListener('change', (e)=>{
            
                let quantiteArticle = parseInt(e.target.value);
                console.log(quantiteArticle)

                if(quantiteArticle <= 0){
                    deleteProduct(id, color);
                    element.remove();
                } else if (quantiteArticle >= 100){
                    quantiteArticle = 100;
                    errorQuantityMsg.innerHTML ="Trop d'article !"             
                    input.style.border ="1px solid red";
                }else {
                    changeProductQuantity(quantiteArticle, id, color);
                }

               
       
                totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);
                console.log("zzz", canape.quantite)
            })

            const deleteItem = element.querySelector('.deleteItem')
            deleteItem.addEventListener('click', (e)=>{
                deleteProduct(id, color)
                element.remove();
                totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);

            })
       }
   

    })
    .catch(error => console.log("error dans le fetch"+ error)) 

});