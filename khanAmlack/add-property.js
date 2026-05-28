// گرفتن user
const currentUser = JSON.parse(localStorage.getItem("user"));

if (!currentUser) {
  alert("اول باید وارد شوید");

  location.href = "auth.html";
}

// مراحل فرم
let step = 0;

const steps = document.querySelectorAll(".step");

function showStep(i) {
  if (i < 0 || i >= steps.length) return;

  steps.forEach((s) => s.classList.remove("active"));

  steps[i].classList.add("active");

  step = i;
}

// next
document.querySelectorAll(".next").forEach(
  (btn) =>
    (btn.onclick = () => {
      showStep(step + 1);
      console.log("asdasd");
    }),
);

// prev
document
  .querySelectorAll(".prev")
  .forEach((btn) => (btn.onclick = () => showStep(step - 1)));

// preview تصویر
image.onchange = () => {
  const files =
image.files;

const images = [];

let loaded = 0;


for(let i = 0; i < files.length; i++){

const reader =
new FileReader();

reader.onload = () => {

images.push(reader.result);

loaded++;


if(loaded === files.length){

const property = {

id: Date.now(),

userId: currentUser.id,

title: title.value,

city: city.value,

type: type.value,

price: price.value,

area: area.value,

rooms: rooms.value,

facilities,

desc: desc.value,

images: images

};


const list =
JSON.parse(
localStorage.getItem("properties")
) || [];


list.push(property);

localStorage.setItem(
"properties",
JSON.stringify(list)
);


alert("آگهی ثبت شد ✅");

location.href = "index.html";

}

};

reader.readAsDataURL(files[i]);

}
}
// submit فرم
propertyForm.onsubmit = (e) => {
  e.preventDefault();

  // امکانات
  const facilities = [];

  document
    .querySelectorAll(".feature:checked")
    .forEach((c) => facilities.push(c.value));

  // خواندن عکس
  const reader = new FileReader();

  reader.onload = () => {
    const property = {
      id: Date.now(),

      // مهم — صاحب ملک
      userId: currentUser.id,

      title: title.value,

      city: city.value,

      type: type.value,

      price: price.value,

      area: area.value,

      rooms: rooms.value,

      facilities: facilities,

      desc: desc.value,

      image: reader.result,
    };

    // گرفتن لیست
    const list = JSON.parse(localStorage.getItem("properties")) || [];

    // اضافه کردن
    list.push(property);

    // ذخیره
    localStorage.setItem("properties", JSON.stringify(list));

    alert("ثبت شد");

    location.href = "index.html";
  };

  // خواندن فایل
  reader.readAsDataURL(image.files[0]);
};
