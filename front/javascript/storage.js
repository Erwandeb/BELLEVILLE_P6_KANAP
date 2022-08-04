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
const getProducts = () => JSON.parse(localStorage.getItem(basketKey) ?? "[]")
const saveBasket = (products) => localStorage.setItem(basketKey, JSON.stringify(products))
const deleteProduct = (id, color) => {
    const product = getProducts();
    const  newBasket = product.filter(element => element.idProduit !== id &&  element.couleur !== color)
    saveBasket(newBasket);
}