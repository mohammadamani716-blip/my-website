const user =
JSON.parse(localStorage.getItem("user"));


// اگر login نکرده
if(!user){

location.href = "auth.html";

}



// اطلاعات کاربر
fullName.innerText =
(user.name || "") + " " +
(user.lastname || "");


username.innerText =
"@" + (user.username || "");


city.innerText =
user.city || "---";


email.innerText =
user.email || "---";


phone.innerText =
user.phone || "---";



// عکس پروفایل
const profileImage =
document.getElementById("profileImage");


// عکس پیشفرض
profileImage.src =
user.profileImage ||
"https://cdn-icons-png.flaticon.com/512/149/149071.png";



// تغییر عکس
profileInput.onchange = () => {

const file =
profileInput.files[0];

const reader =
new FileReader();

reader.onload = () => {

profileImage.src =
reader.result;

user.profileImage =
reader.result;

localStorage.setItem(
"user",
JSON.stringify(user)
);

};

reader.readAsDataURL(file);

};




// گرفتن آگهی‌ها
const properties =
JSON.parse(localStorage.getItem("properties")) || [];



// فقط آگهی‌های خود کاربر
const myProperties =
properties.filter(p =>
p.userId == user.id
);



// نمایش آگهی‌ها
const container =
document.getElementById("myProperties");



if(myProperties.length === 0){

container.innerHTML = `
<p class="empty">
هنوز آگهی ثبت نکرده‌ای
</p>
`;

}



myProperties.forEach(p=>{

container.innerHTML += `

<div class="property-card">

<div class="property-image">

<img src="${p.image}">

</div>

<div class="property-info">

<h3>
${p.title}
</h3>

<p>
${p.city}
</p>

<p>
${p.area} متر
</p>

<span class="price">

${Number(p.price).toLocaleString()}
تومان

</span>


<div class="actions">

<a href="edit-property.html?id=${p.id}"
class="edit-btn">

ویرایش

</a>


<button
onclick="deleteProperty(${p.id})"
class="delete-btn">

حذف

</button>

</div>

</div>

</div>

`;

});




// حذف آگهی
function deleteProperty(id){

let properties =
JSON.parse(localStorage.getItem("properties")) || [];

properties =
properties.filter(p =>
p.id !== id
);

localStorage.setItem(
"properties",
JSON.stringify(properties)
);

location.reload();

}



// logout
function logout(){

localStorage.removeItem("user");

localStorage.removeItem("token");

location.href = "index.html";

}