let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Add to Cart function
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product Cart me add ho gaya!");
}

// Show Cart
function loadCart() {
    let cartList = document.getElementById("cartList");
    let total = 0;

    cartList.innerHTML = "";

    cart.forEach((item, index) => {
        total += item.price;

        cartList.innerHTML += `
        <div style="background:white;margin:10px;padding:10px;border-radius:10px;">
            <h3>${item.name}</h3>
            <p>₹${item.price}</p>
            <button onclick="removeItem(${index})">Remove</button>
        </div>`;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// Remove item
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// Send Order on WhatsApp
function sendOrder() {
    if (cart.length === 0) {
        alert("Cart empty hai!");
        return;
    }

    let msg = "🛒 New Order:\n\n";

    cart.forEach(item => {
        msg += `${item.name} - ₹${item.price}\n`;
    });

    llet phone = "919752144747";
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}
