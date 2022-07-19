const addProduct  = (produit) => {
    const products = getProducts();
    products.push(produit);


    // Traitment des doublons
    console.log('products', products)

    let arraySansDoublon = deleteDoublon(products)

    console.log("test2" , arraySansDoublon)
    
    let arraySansDoublon2 = hasDuplicates(products)
    console.log("test2" , arraySansDoublon2);

    const found = products.find(element => element.idProduit > 10);
    console.log(found)
    
    const test22 = products.filter(onlyUnique);

    console.log("ya", test22);
    // Fin traitement doublons




    saveBasket(products);
}

const basketKey = 'basket';
const getProducts = () => JSON.parse(localStorage.getItem(basketKey) ?? "[]")
const saveBasket = (products) => localStorage.setItem(basketKey, JSON.stringify(products))


// Find pour éviter les doublons 
function remove_duplicates(arr) {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    for (var key in obj) {
        ret_arr.push(key);
    }
    return ret_arr;
}

function deleteDoublon(tableauOrigine){
    let sansDoublon = new Set(tableauOrigine);
    return Array.from(sansDoublon);
}

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  


/*
  const getProductFromLocalStorage = () =>{

    console.log(localStorage.basket)
    const item = [];

    for(let i=0; i<localStorage.basket.length; i++) {
        let key = localStorage.key( i );
        console.log(key, i)
    
        item.push(JSON.parse(localStorage.getItem( "basket" )));
        console.log("test", item);
    }
  }

  */