/***
 * 
 * SCRIPT : GESTION DU STORAGE
 * 
 */



// Ajouter un produit dans le panier
const addProduct  = (produit) => {
    const products = getProducts();

    const product = products.find(element => element.idProduit === produit.idProduit &&  element.couleur === produit.couleur );
    if(!product){
        products.push(produit);
    }else{
        product.quantite += produit.quantite;
        if(product.quantite > 100 ){
            product.quantite = 100;
        }
    }
    saveBasket(products);
}

const basketKey = 'basket';

// Récupérer les éléments du panier 
const getProducts = () => JSON.parse(localStorage.getItem(basketKey) ?? "[]")

// Sauvegarder le panier
const saveBasket = (products) => localStorage.setItem(basketKey, JSON.stringify(products))

// Supprimer un produit du panier
const deleteProduct = (id, color) => {
    const product = getProducts();
    const  newBasket = product.filter(element => element.idProduit !== id &&  element.couleur !== color)
    saveBasket(newBasket);
}

// Changer la quantité du produit
const changeProductQuantity = (quantiteArticle, id, color) => {
    const products = getProducts();
    const product = products.find(element => element.idProduit === id &&  element.couleur === color );
    if(product){
        product.quantite = quantiteArticle;
        if(product.quantite > 100 ){
            product.quantite = 100;
        }
    }
    saveBasket(products);
}; 

// Obtenir le prix total du panier
const getTotalBasketPrice = (products)=>{
    return getProducts()
        .map(product => product.quantite * products.find(p=> p._id === product.idProduit)?.price ?? 0 )
        .reduce((a,b)=>a+b)
}

// Obtenir le nombre total d'article dans le panier
const getTotalItemsInBasket = () =>{
    return getProducts()
    .map(product => product.quantite)
    .reduce((a, b) => a + b, 0);
}
