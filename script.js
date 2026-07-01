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

    // WhatsApp open
    window.open(
        "https://wa.me/" + shopNumber + "?text=" + encodeURIComponent(msg)
    );

    // ✅ SAVE ORDER (PRO STEP 1)
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

    // clear cart after order
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
}
