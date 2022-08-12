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

const canapeInCart = getProducts();


/**
 * Affichage des éléments dynamiques dans le DOM
 */
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

        for(element of articles){
            const color = element.dataset.color
            const id = element.dataset.id

            const input = element.querySelector('input')
            input.addEventListener('change', (e)=>{
            
                let quantiteArticle = parseInt(e.target.value);

                if(quantiteArticle <= 0){
                    deleteProduct(id, color)
                    element.remove();
                } else{
                    changeProductQuantity(quantiteArticle, id, color);
                }

                // TO DO
                // créer fonction changeQuantity pour changer selon couleur et ID et pas plus de 100 
                // Pas moins de 1 Produit par article
                // Total panier
                    console.log(productListRawFromApi)
                    totalPrice.textContent = getTotalBasketPrice(productListRawFromApi);
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