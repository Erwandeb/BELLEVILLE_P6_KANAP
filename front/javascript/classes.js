class Produit {
    constructor(colors, _id, name, price, imageUrl, description, altTxt){
        this.colors = colors,
        this._id = _id,
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
                             <p id="error-color"></p>
                                <label for="color-select">Choisir une couleur : <p id="error-color"></p></label>
                                <select name="color-select" id="colors">
                                    <option value="no-color">--SVP, choisissez une couleur --</option>
                                    ${this.colors.map((color) => {
                                    return `<option value=${color}> ${color}</option>`
                                    })}
                                </select>

                            </div>
                            <div class="item__content__settings__quantity">
                                <div class="itemsetting-label-container">
                                    <label for="itemQuantity">Nombre d'article(s) (1-100) :</label>
                                    <input type="number" name="itemQuantity" min="1" max="100" value="0" id="quantity">
                                </div>
                                <p id="error-quantity"></p>
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
    renderItemDetailsOnCart(quantity, color){
        return `
        <article class="cart__item" data-id="${this._id}" data-color="${color}">
            <div class="cart__item__img">
                <img src='${this.imageUrl}' alt=${this.altTxt}>
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                    <h2>${this.name}</h2>
                    <p id="color-of-canape">${color}</p>
                    <p>${this.price} €</p>
                </div>
                <div class="cart__item__content__settings">
                        <div class="cart__item__content__settings__quantity">
                            <p id="quantity-of-canape">Qté : </p>
                            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value=${quantity}>
                        </div>
                        <div class="cart__item__content__settings__delete">
                            <p class="deleteItem">Supprimer</p>
                        </div>
                </div>
            </div>
        </article>
        `
    }
}

