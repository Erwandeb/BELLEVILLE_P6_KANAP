const itemsId = document.getElementById('items');

/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir classe "produit"
 * 
 */
const loadProducts = () => {
    fetch('http://localhost:3000/api/products/')
    .then((response) => {
        return response.json()
    })
    .then(data => {
        for(item of data){
            const produit = new Produit(item.colors, item._id, item.name, item.price, item.imageUrl, item.description, item.altText)
            itemsId.innerHTML += produit.renderItemByItem();
        }
    })
    .catch(error => console.log("error fetch"+ error))  
}
loadProducts();