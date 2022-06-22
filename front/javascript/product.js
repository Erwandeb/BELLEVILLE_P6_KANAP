const displayItem = document.querySelector('.item');
const url = new URL(window.location);
const id = url.searchParams.get('id');


/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */

let specificColorChoiceOfCustomer = [];
let specificNumberChoiceOfCustomer = [];
let fullSOrder = [];
let productInCart={};

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
           const colorChoice = e.target.value;
           specificColorChoiceOfCustomer.push(colorChoice);

           if(specificColorChoiceOfCustomer.length >= 2){
                specificColorChoiceOfCustomer.shift();          
            }
        }) 
        
        const quantitySelectedListenner = document.getElementById("quantity");
        quantitySelectedListenner.addEventListener('change', (e)=>{
            const quantityNumberChoice = e.target.value
            specificNumberChoiceOfCustomer.push(quantityNumberChoice);

            if(specificNumberChoiceOfCustomer.length >= 2){
                specificNumberChoiceOfCustomer.shift();          
            }
        }) 

        const addToCartBtn = document.getElementById("addToCart"); 
        addToCartBtn.addEventListener('click', ()=> {
            if(specificColorChoiceOfCustomer.length >= 1){
                console.log(specificColorChoiceOfCustomer);
                fullSOrder = specificColorChoiceOfCustomer.concat(specificNumberChoiceOfCustomer)
                fullSOrder.push(id);

            } else{
                console.log("merci de choisir une couleur");
                // Ajouter un innerHTML dans le DOM
            }

            if(specificNumberChoiceOfCustomer.length >= 1){
                console.log(specificNumberChoiceOfCustomer);
                fullSOrder = specificNumberChoiceOfCustomer.concat(specificColorChoiceOfCustomer)
                
                fullSOrder.push(id);
                productInCart = new ProduitInCart(fullSOrder[2], fullSOrder[1], fullSOrder[0]);
                console.log(productInCart);
            } else{
                console.log("merci de choisir une quantité");
                // Ajouter un innerHTML dans le DOM
            }
        })
        
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();
console.log("test", test)

// TO DO 
// remplir la classe a l'ouverture du bouton ajouter au panier




