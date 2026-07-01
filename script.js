let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ADD TO CART
function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " cart me add ho gaya!");
}

// LOAD CART
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
        </div>
        `;
    });

    document.getElementById("total").innerText = "Total: ₹" + total;
}

// REMOVE ITEM
function removeItem(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCart();
}

// ORDER ON WHATSAPP
function sendOrder() {
    if (cart.length === 0) {
        alert("Cart empty hai!");
        return;
    }

    let msg = "🛒 New Order from Raj Electronic:\n\n";

    let total = 0;

    cart.forEach(item => {
        msg += `✔ ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    msg += "\nTotal: ₹" + total;

    // ✔ YOUR CORRECT NUMBER
    let phone = "919752144747";

    window.open(
        `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`
    );
} 
