const displayItem = document.querySelector('.item');
const url = new URL(window.location);
const id = url.searchParams.get('id');

// Traitement de l'URl !!!

/**
 * Affichage des éléments dynamiques dans le DOM
 * @classe voir scipt "classes.js"
 * 
 */

let colorChoice = "no-color";
let quantityChoice;

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
           
         let transormResultIntoNumber = e.target.value;
            quantityChoice = parseInt(transormResultIntoNumber);
       
        
        }) 

        const addToCartBtn = document.getElementById("addToCart"); 
        addToCartBtn.addEventListener('click', ()=> {
           

            if(colorChoice !== "no-color"){
                localStorage.setItem("color", colorChoice);
            } else{
                console.log("merci de choisir une couleur");
                e.preventDefault();
            }
            
               
            if(quantityChoice > 100){
                e.preventDefault();
                console.log("impossible superieur a 100")
            }else if(quantityChoice <= 0){
                console.log("impossible nombre négatif");
                e.preventDefault();
            } else{
                localStorage.setItem("quantité mise en panier", quantityChoice);
            }

        
        })
        
    })
    .catch(error => console.log("error dans le fetch"+ error))  
}

loadSpecificItem();


// TO DO 
// remplir la classe a l'ouverture du bouton ajouter au panier




