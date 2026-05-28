let API_URL = "http://127.0.0.1:8000";

let isLogin = true;

function toggleForm() {
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");
  const title = document.getElementById("form-title");
  const toggleLabel = document.getElementById("toggle-label");
  const toggleBtn = document.querySelector(".toggle-btn");

  isLogin = !isLogin;

  if (isLogin) {
    // نمایش فرم ورود
    loginForm.style.display = "block";
    registerForm.style.display = "none";
    title.innerText = "ورود";
    toggleLabel.innerText = "حساب ندارید؟";
    toggleBtn.innerText = "ثبت نام";
  } else {
    // نمایش فرم ثبت نام
    loginForm.style.display = "none";
    registerForm.style.display = "block";
    title.innerText = "ثبت نام";
    toggleLabel.innerText = "حساب دارید؟";
    toggleBtn.innerText = "ورود";
  }
}

async function register() {
  // گرفتن مقادیر از فرم ثبت نام
  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const username = document.getElementById("registerUsername").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const city = document.getElementById("city").value.trim();
  const password = document.getElementById("registerPassword").value.trim();

  if (!username || !password || !email || !firstName || !lastName) {
    alert("لطفاً تمام فیلدهای الزامی را پر کنید.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/users/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: Math.floor(Math.random() * 10000),
        name: firstName,
        lastname: lastName,
        password: password,
        username: username,
        email: email,
        city: city,
        phone: phone,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      alert(
        `${firstName} عزیز، خوش آمدی 🌟`
      );
    } else {
      // نمایش خطای دریافتی از بک‌اند
      alert(data.detail || "خطا در ثبت‌نام");
      location.href = "index.html";
    }
  } catch (error) {
    console.error("Register Error:", error);
    alert("خطای واقعی: " + error.message);
  }
}

async function login() {
  // گرفتن مقادیر از فرم ورود
  const username = document.getElementById("loginUsername").value.trim();
  const password = document.getElementById("loginPassword").value.trim();

  if (!username || !password) {
    alert("لطفاً نام کاربری و رمز عبور را وارد کنید");
    return;
  }

  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const data = await response.json();

    

    if (response.ok) {

      console.log('===>',data);
      
      // ذخیره توکن واقعی دریافتی از بک‌اند
      localStorage.setItem("token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      localStorage.setItem("username", username);
      alert(
        `خوش آمدی ${data.user.name} 🌹`
      );

      window.location.href = "index.html";
    } else {
      alert(data.detail || "نام کاربری یا رمز عبور اشتباه است");
    }
  } catch (error) {
    console.error("Login Error:", error);
    alert("سرور قطع است،لطفا کمی بعد امتحان کنید.")  
  }
}
