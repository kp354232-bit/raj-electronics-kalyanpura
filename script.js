let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price){
cart.push({name,price});
localStorage.setItem("cart",JSON.stringify(cart));
alert("Added to cart");
}

/* LOAD CART */
function loadCart(){
let list=document.getElementById("cartList");
if(!list)return;

let total=0;
list.innerHTML="";

cart.forEach((item,i)=>{
total+=item.price;

list.innerHTML+=`
<div class="card">
<h3>${item.name}</h3>
<p>₹${item.price}</p>
<button onclick="removeItem(${i})">Remove</button>
</div>`;
});

document.getElementById("total").innerText="Total: ₹"+total;
}

function removeItem(i){
cart.splice(i,1);
localStorage.setItem("cart",JSON.stringify(cart));
loadCart();
}

/* ORDER */
function sendOrder(){
if(cart.length==0){
alert("Cart empty");
return;
}

let name=prompt("Name");
let phone=prompt("Phone");
let address=prompt("Address");

let msg="🔥 ORDER - RAJ ELECTRONIC 🔥\n\n";
let total=0;

cart.forEach((i,k)=>{
msg+=(k+1)+". "+i.name+" - ₹"+i.price+"\n";
total+=i.price;
});

msg+="\n💰 Total: ₹"+total;

window.open("https://wa.me/919752144747?text="+encodeURIComponent(msg));

cart=[];
localStorage.setItem("cart",JSON.stringify(cart));
}

/* SEARCH */
function searchProduct(){
let input=document.getElementById("searchBox").value.toLowerCase();
let cards=document.getElementsByClassName("card");

for(let i=0;i<cards.length;i++){
let title=cards[i].getElementsByTagName("h3")[0].innerText.toLowerCase();

cards[i].style.display=title.includes(input)?"block":"none";
}
}
