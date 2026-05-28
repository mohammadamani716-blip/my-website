const user =
JSON.parse(localStorage.getItem("user"));


// اگر login نکرده
if(!user){

alert("ابتدا وارد شوید");

location.href = "auth.html";

}


// گرفتن id از url
const params =
new URLSearchParams(location.search);

const id =
Number(params.get("id"));


// گرفتن آگهی‌ها
let properties =
JSON.parse(localStorage.getItem("properties")) || [];


// پیدا کردن آگهی
const property =
properties.find(p => p.id === id);


// اگر آگهی نبود
if(!property){

alert("آگهی پیدا نشد");

location.href = "index.html";

}


// فقط صاحب آگهی
if(property.userId !== user.id){

alert("شما اجازه ویرایش این آگهی را ندارید");

location.href = "index.html";

}



// پر کردن فرم
title.value = property.title;

city.value = property.city;

price.value = property.price;

area.value = property.area;

rooms.value = property.rooms;

desc.value = property.desc || "";




// ذخیره تغییرات
editForm.onsubmit = e => {

e.preventDefault();

property.title = title.value;

property.city = city.value;

property.price = price.value;

property.area = area.value;

property.rooms = rooms.value;

property.desc = desc.value;


// ذخیره
localStorage.setItem(
"properties",
JSON.stringify(properties)
);


alert("آگهی با موفقیت ویرایش شد ✅");


// برگشت به صفحه اصلی
location.href = "index.html";

};