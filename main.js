const imageUrl = document.querySelector("#imageUrl");
const productName = document.querySelector("#productName");
const price = document.querySelector("#price");
const description = document.querySelector("#description");
const form = document.querySelector(".form");
const carts = document.querySelector("#carts");

const searchprodut = document.querySelector("#searchprodut")

// LocalStorage se products lao
let productArray = JSON.parse(localStorage.getItem("products")) || [];


form.addEventListener("submit", (e) => {

    e.preventDefault();

    let imageInput = imageUrl.value;
    let nameInput = productName.value;
    let priceInput = price.value;
    let descInput = description.value;

    if(imageInput === ""|| nameInput === "" || priceInput === "" || descInput === ""){
        alert("Please Filled The Field First")
        return;
    }

    let productOBJECT = {
        id: Date.now(),
        image: imageInput,
        name: nameInput,
        price: priceInput,
        description: descInput
    };

    productArray.push(productOBJECT);

    // LocalStorage mein save karo
    localStorage.setItem("products", JSON.stringify(productArray));

    console.log(productArray);

    form.reset();

    displayProducts();
});


const displayProducts = (products = productArray) => {

    // Container ko empty karo
    carts.innerHTML = "";

    products.forEach((item) => {

        // New card create
        const cart = document.createElement("div");

        cart.classList.add("cart");

        cart.innerHTML = `
            <div class="cart-image">
                <img src="${item.image}" alt="${item.name}">
            </div>

            <div class="product-detaile">

                <p class="product-name">
                    ${item.name}
                </p>

                <p class="product-price">
                    Rs. ${item.price}
                </p>

                <p class="product-descriptions">
                    ${item.description}
                </p>

            </div>

            <button>Add to Cart</button>
            <button class="delete-btn" data-id="${item.id}">
             Delete
            </button>
            <button class="delete-btn" data-id="${item.id}">
             Edit
            </button>
        `;

        // Card ko container mein add karo
        carts.appendChild(cart);
    });
};


// delete concept








displayProducts();


const filterArray = () => {

    searchprodut.addEventListener("input", () => {
        let searchText = searchprodut.value.toLowerCase().trim();
        let filter = productArray.filter((item) => {
            return (
                item.name.toLowerCase().includes(searchText) ||
                item.description.toLowerCase().includes(searchText)
            );
        });
        displayProducts(filter);
    });
};

filterArray();