const user =
JSON.parse(localStorage.getItem("user"));


// اگر login نکرده
if(!user){

location.href = "auth.html";

}



// پر کردن فرم
name.value =
user.name || "";

lastname.value =
user.lastname || "";

cityInput.value =
user.city || "";

emailInput.value =
user.email || "";

phoneInput.value =
user.phone || "";




// ذخیره
editProfileForm.onsubmit = e => {

e.preventDefault();

user.name =
name.value;

user.lastname =
lastname.value;

user.city =
cityInput.value;

user.email =
emailInput.value;

user.phone =
phoneInput.value;



localStorage.setItem(
"user",
JSON.stringify(user)
);


alert("اطلاعات ذخیره شد ✅");

location.href = "user.html";

}