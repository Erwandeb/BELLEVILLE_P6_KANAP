const displayItem = document.querySelector('.item');
const url = new URL(window.location);
const id = url.searchParams.get('id');
/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */

let dataTest = [];

const loadSpecificItem = () => {
    fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => {
        return response.json()
    })
    .then(data => {
        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displayItem.innerHTML += produit.renderItemDetailsOnSpecificPage();

        const colorSelectedListenner = document.getElementById("colors");
        colorSelectedListenner.addEventListener('change', (e)=>{
           const colorChoice = e.target.value
          
        }) 
        

        const quantitySelectedListenner = document.getElementById("quantity");
        quantitySelectedListenner.addEventListener('change', (e)=>{
            const quantityNumberChoice = e.target.value
            console.log(quantityNumberChoice);
        
        }) 
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();


// TO DO 
// remplir la classe a l'ouverture du bouton ajouter au panier




