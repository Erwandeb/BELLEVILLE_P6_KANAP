const displayItem = document.querySelector('.item');

const url = new URL(window.location);
const id = url.searchParams.get('id');

// Traitement de l'URl !!!

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
        let colorChoice = "no-color";
        let quantityChoice;
        let quantityAddInCart;

        const produit = new Produit(data.colors, data._id, data.name, data.price, data.imageUrl, data.description, data.altText);
        displayItem.innerHTML = produit.renderItemDetailsOnSpecificPage();

        const colorSelectedListenner = document.getElementById("colors");
        colorSelectedListenner.addEventListener('change', (e)=>{ 
           if(e.target.value !== ""){
                colorChoice = e.target.value;
            } 
        }) 
        
        const quantitySelectedListenner = document.getElementById("quantity");
        quantitySelectedListenner.addEventListener('change', (e)=>{
            quantityChoice = e.target.value;
        }) 


        const addToCartBtn = document.getElementById("addToCart"); 
        addToCartBtn.addEventListener('click', (e)=> {
            
            e.preventDefault();
            
            const errorColor = document.getElementById('error-color');
            const errorQuantity  = document.getElementById('error-quantity');
            
            // Gestion couleurs
            if(colorChoice === "no-color"){
                errorColor.innerHTML ='pas de couleurs choisie';
            }else{
                errorColor.innerHTML ='';
            }
                
            // Gestion quantité
            if(!quantityChoice){
                errorQuantity.innerHTML = "Erreur dans la quantité choisie";

            }else if(quantityChoice > 100){
                errorQuantity.innerHTML = "la quantité dépasse les 100 unités";
            
            }else if(quantityChoice <= 0){
                errorQuantity.innerHTML = "Aucune quanité choisie";
            } else{
                errorQuantity.innerHTML = "";
                quantityAddInCart = parseInt(quantityChoice)
                
                // Appeler la fonction addProduct
                addProduct({idProduit: id, quantite: quantityAddInCart, couleur: colorChoice})
           
            }
        })
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();


// TO DO 
// remplir la classe a l'ouverture du bouton ajouter au panier

// Ouvrir Fichier storage 


