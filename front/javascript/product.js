const displayItem = document.querySelector('.item');

const url = new URL(window.location);
const id = url.searchParams.get('id');
let colorChoice = "no-color";
let quantityChoice;
let quantityAddInCart;

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
            
            const errorColor = document.getElementById('error-color');
            const errorQuantityMax = document.getElementById('error-quantity-max');
            const errorQuantityMin  = document.getElementById('error-quantity-negativ');
            
            if(colorChoice !== "no-color"){
                errorColor.style.display='none';
                localStorage.setItem("color", colorChoice);
            } else{
                errorColor.style.display='block';
               e.preventDefault();
            }
            

            if(quantityChoice === undefined){
                errorQuantityMin.style.display='block';
                e.preventDefault();
            }else if(quantityChoice > 100){
                errorQuantityMax.style.display='block';
                e.preventDefault();
            }else if(quantityChoice <= 0){
                errorQuantityMin.style.display='block';
                e.preventDefault();
            } else{
                errorQuantityMax.style.display='none';
                errorQuantityMin.style.display='none';
                quantityAddInCart = parseInt(quantityChoice)
                localStorage.setItem("id", id)
                localStorage.setItem("quantité", quantityAddInCart);
            }
        })
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();


// TO DO 
// remplir la classe a l'ouverture du bouton ajouter au panier




