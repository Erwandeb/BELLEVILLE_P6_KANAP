class Produit {
    constructor(colors, _id, name, price, imageUrl, description, altTxt){
        this.colors=colors,
        this._id= _id,
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this.altTxt = altTxt;
    };
    renderItemByItem(){
        return `
            <a href="./product.html?id=${this._id}">
                <article>
                    <img src='${this.imageUrl}' alt='${this.altTxt}'>
                    <h3 class="productName">${this.name}</h3>
                    <p class="productDescription">${this.description}</p>
                </article>
            </a>
        `
    };
    renderItemDetailsOnSpecificPage(){
        return `
                <div class="limitedWidthBlock">
                    <section class="item">
                        <article>
                            <div class="item__img">
                            <img src='${this.imageUrl}' alt='${this.altTxt}'>
                            </div>
                         <div class="item__content">

                        <div class="item__content__titlePrice">
                            <h1 id="title">${this.name}</h1>
                            <p>Prix : <span id="price">${this.price} </span>€</p>
                        </div>

                        <div class="item__content__description">
                            <p class="item__content__description__title">Description :</p>
                            <p id="description">${this.description}</p>
                        </div>

                        <div class="item__content__settings">
                            <div class="item__content__settings__color">
                            <label for="color-select">Choisir une couleur :</label>
                            <select name="color-select" id="colors">
                                <option value="">--SVP, choisissez une couleur --</option>
                                ${this.colors.map((color) => {
                                   return `<option value=${color}> ${color}</option>`
                                })}
                            </select>
                            
                            </div>
                            <div class="item__content__settings__quantity">
                            <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                            <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                            </div>
                        </div>

                        <div class="item__content__addButton">
                            <button id="addToCart">Ajouter au panier</button>
                        </div>

                        </div>
                    </article>
                </section>
            </div>
        `
    }
}


// TO DO
// Faire une liste pour les couleurs 
// Boucle pour récuperer les couleurs
