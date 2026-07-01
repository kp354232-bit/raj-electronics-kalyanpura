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
