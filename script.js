let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* ======================
   CART SYSTEM
====================== */

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " cart me add ho gaya!");
}

function loadCart() {
    let cartList = document.getElementById("cartList");
    let total = 0;

    if (!cartList) return;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        cartList.innerHTML += `
        <div class="card">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
        </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

function sendOrder() {
    if (cart.length === 0) {
        alert("Cart empty hai!");
        return;
    }

    let name = prompt("Apna Naam likho:");
    let address = prompt("Apna Address likho:");

    let msg = "🛒 NEW ORDER - Raj Electronic\n\n";
    msg += "👤 Name: " + name + "\n";
    msg += "📍 Address: " + address + "\n\n";

    let total = 0;

    cart.forEach(item => {
        msg += "✔ " + item.name + " - ₹" + item.price + "\n";
        total += item.price;
    });

    msg += "\n💰 Total: ₹" + total;

    let phone = "919752144747";

    window.open("https://wa.me/" + phone + "?text=" + encodeURIComponent(msg));
}

/* ======================
   SEARCH SYSTEM
====================== */

function searchProduct() {
    let input = document.getElementById("searchBox").value.toLowerCase();
    let cards = document.getElementsByClassName("card");

    for (let i = 0; i < cards.length; i++) {
        let title = cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

        if (title.includes(input)) {
            cards[i].style.display = "block";
        } else {
            cards[i].style.display = "none";
        }
    }
}

/* ======================
   ADMIN PANEL
====================== */

function addProduct() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;

    if (!name || !price) {
        alert("Name aur price fill karo!");
        return;
    }

    products.push({ name: name, price: parseInt(price) });
    localStorage.setItem("products", JSON.stringify(products));

    alert("Product add ho gaya!");
    loadAdmin();
}

function loadAdmin() {
    let list = document.getElementById("adminList");
    if (!list) return;

    list.innerHTML = "";

    products.forEach((p, i) => {
        list.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="deleteProduct(${i})">Delete</button>
        </div>
        `;
    });
}

function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    loadAdmin();
}
function loadProducts() {
    let list = document.getElementById("productList");
    if (!list) return;

    let products = JSON.parse(localStorage.getItem("products")) || [];

    list.innerHTML = "";

    products.forEach((p, i) => {
        list.innerHTML += `
        <div class="card">
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <button onclick="addToCart('${p.name}',${p.price})">
                🛒 Add to Cart
            </button>
        </div>
        `;
    });
}
