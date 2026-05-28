const container =
document.getElementById("properties");

const properties =
(JSON.parse(localStorage.getItem("properties")) || [])

.sort((a,b)=> b.id - a.id);

const user =
JSON.parse(localStorage.getItem("user"));



// نمایش آگهی‌ها
if(container){

properties.forEach(p => {

let ownerButtons = "";


// فقط صاحب آگهی
if(user && user.id == p.userId){

ownerButtons = `

<button class="delete-btn"
onclick="deleteProperty(${p.id})">

حذف آگهی

</button>


<a href="edit-property.html?id=${p.id}"
class="edit-btn">

ویرایش آگهی

</a>

`;

}



container.innerHTML += `

<div class="property-card">

<div class="property-image">

<img src="${p.images?.[0] || p.image}">

</div>

<div class="property-info">

<h3 class="title">

${p.title}

</h3>

<p class="city">

${p.city} - ${p.type || ""}

</p>

<p>

${p.area} متر |
${p.rooms} اتاق

</p>

<span class="price">

${Number(p.price).toLocaleString()}
تومان

</span>

<a href="info.html?id=${p.id}"
class="details-btn">

جزئیات بیشتر...

</a>

<br>

${ownerButtons}

</div>

</div>

`;

});

}



// دکمه‌ها
const logoutBtn =
document.getElementById("logoutBtn");

const authBtn =
document.getElementById("authBtn");

const addBtn =
document.getElementById("addBtn");

const panelBtn =
document.getElementById("panelBtn");



// اگر کاربر وارد شده
if(user){

if(authBtn){

authBtn.style.display = "none";

}

}



// اگر مهمان
else{

if(logoutBtn){

logoutBtn.style.display = "none";

}

if(addBtn){

addBtn.style.display = "none";

}

if(panelBtn){

panelBtn.style.display = "none";

}

}



// حذف آگهی
function deleteProperty(id){

let properties =
JSON.parse(localStorage.getItem("properties")) || [];

properties =
properties.filter(p => p.id !== id);

localStorage.setItem(
"properties",
JSON.stringify(properties)
);

location.reload();

}



// خوش‌آمدگویی
const welcome =
document.getElementById("welcome");

if(user && welcome){

welcome.innerHTML =

`👋 خوش آمدی
${user.name || user.username}`;

}



// خروج
function logout(){

alert("با موفقیت خارج شدید 👋");

localStorage.removeItem("user");

localStorage.removeItem("token");

location.href = "index.html";

}



// سرچ
function liveSearch(){

const value =

document.querySelector(".what")
.value
.toLowerCase();

const cards =

document.querySelectorAll(".property-card");

const notFound =

document.getElementById("notFoundMessage");



let found = false;



cards.forEach(card => {

const text =

card.innerText.toLowerCase();



// پیدا شد
if(text.includes(value)){

card.style.display = "flex";

found = true;

}


// پیدا نشد
else{

card.style.display = "none";

}

});




// اگر چیزی نبود
if(found){

notFound.style.display = "none";

}
else{

notFound.style.display = "block";

}

}