let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
    cart.push({ name, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(name + " cart me add ho gaya!");
}

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

    let msg = "🛒 New Order:\n\n";
    let total = 0;

    cart.forEach(item => {
        msg += `✔ ${item.name} - ₹${item.price}\n`;
        total += item.price;
    });

    msg += "\nTotal: ₹" + total;

    let phone = "919752144747";

    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(msg)}`);
}

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
