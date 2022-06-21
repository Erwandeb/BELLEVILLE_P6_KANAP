const displayItem = document.querySelector('.item');
const url = new URL(window.location);
const id = url.searchParams.get('id');
/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */
const loadSpecificItem = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displayItem.innerHTML += produit.renderItemDetailsOnSpecificPage();
        
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();


const quantitySelectedListenner = document.getElementById("colors");
quantitySelectedListenner.addEventListener('change', async function(){
  await  console.log(this.value);
}) 
   




