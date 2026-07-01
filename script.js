let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = JSON.parse(localStorage.getItem("products")) || [];

/* =========================
   CART SYSTEM
========================= */

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " cart me add ho gaya!");
}

function loadCart() {
    let cartList = document.getElementById("cartList");
    if (!cartList) return;

    let total = 0;

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

/* =========================
   ORDER SYSTEM (WHATSAPP + SAVE)
========================= */

function sendOrder() {
    if (cart.length === 0) {
        alert("Cart empty hai!");
        return;
    }

    let name = prompt("👤 Apna Naam likho:");
    let phoneUser = prompt("📱 Mobile Number likho:");
    let address = prompt("📍 Address likho:");

    let msg = "🔥 NEW ORDER - RAJ ELECTRONIC 🔥\n\n";

    msg += "👤 Name: " + name + "\n";
    msg += "📱 Phone: " + phoneUser + "\n";
    msg += "📍 Address: " + address + "\n";
    msg += "----------------------\n";

    let total = 0;

    cart.forEach((item, i) => {
        msg += (i + 1) + ". " + item.name + " - ₹" + item.price + "\n";
        total += item.price;
    });

    msg += "----------------------\n";
    msg += "💰 TOTAL: ₹" + total + "\n";
    msg += "🙏 Thank you for order!";

    let shopNumber = "919752144747";

    window.open(
        "https://wa.me/" + shopNumber + "?text=" + encodeURIComponent(msg)
    );

    // SAVE ORDER
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    orders.push({
        name: name,
        phone: phoneUser,
        address: address,
        items: cart,
        total: total,
        date: new Date().toLocaleString()
    });

    localStorage.setItem("orders", JSON.stringify(orders));

    // CLEAR CART
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}

/* =========================
   SEARCH SYSTEM
========================= */

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

/* =========================
   ADMIN PANEL
========================= */

function addProduct() {
    let name = document.getElementById("pname").value;
    let price = document.getElementById("pprice").value;

    if (!name || !price) {
        alert("Fill all fields!");
        return;
    }

    products.push({
        name: name,
        price: parseInt(price)
    });

    localStorage.setItem("products", JSON.stringify(products));

    alert("Product add ho gaya!");

    document.getElementById("pname").value = "";
    document.getElementById("pprice").value = "";

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

/* =========================
   LOAD ORDERS DASHBOARD
========================= */

function loadOrders() {
    let list = document.getElementById("ordersList");
    if (!list) return;

    let orders = JSON.parse(localStorage.getItem("orders")) || [];

    if (orders.length === 0) {
        list.innerHTML = "<h3 style='text-align:center;'>No Orders Yet</h3>";
        return;
    }

    list.innerHTML = "";

    orders.forEach((o, i) => {
        list.innerHTML += `
        <div class="card">
            <h3>👤 ${o.name}</h3>
            <p>📱 ${o.phone}</p>
            <p>📍 ${o.address}</p>
            <p>💰 Total: ₹${o.total}</p>
            <p>🕒 ${o.date}</p>
        </div>
        `;
    });
}
