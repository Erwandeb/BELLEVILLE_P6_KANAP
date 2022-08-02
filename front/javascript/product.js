const displayItem = document.querySelector('.item');

const url = new URL(window.location);
const id = url.searchParams.get('id');


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

        const validationMessage = document.getElementById('validation-message');
        validationMessage.innerHTML=``;
        const colorSelectedListenner = document.getElementById("colors");
        colorSelectedListenner.addEventListener('change', (e)=>{ 
            validationMessage.innerHTML=``;
           if(e.target.value !== ""){
                colorChoice = e.target.value;
            } 
        }) 
        
        const quantitySelectedListenner = document.getElementById("quantity");
        quantitySelectedListenner.addEventListener('change', (e)=>{
            validationMessage.innerHTML=``;
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

                addProduct({idProduit: id, quantite: quantityAddInCart, couleur: colorChoice})
                validationMessage.innerHTML = `${produit.name} a été ajouté au panier !`
            }
        })
    })
    .catch((error) => {
        console.log("error dans le fetch"+ error)
        document.querySelector('.item').innerHTML = "404 Erreur ! La page que vous demandez n'existe pas..."
    })
}

loadSpecificItem();