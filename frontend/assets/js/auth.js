// assets/js/auth.js

const LOGIN_URL = "http://localhost:3000/api/auth/login";
const REGISTER_URL = "http://localhost:3000/api/auth/register";

// Handle login
async function login(email, password) {
  try {
    const res = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", data.token);
      return { success: true, message: "Login successful" };
    } else {
      return { success: false, message: data.message || "Login failed" };
    }
  } catch (error) {
    return { success: false, message: "Error connecting to server" };
  }
}

// Handle registration
async function register(name, email, password) {
  try {
    const res = await fetch(REGISTER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();

    if (res.ok) {
      return { success: true, message: "Registration successful" };
    } else {
      return { success: false, message: data.message || "Registration failed" };
    }
  } catch (error) {
    return { success: false, message: "Error connecting to server" };
  }
}

// Logout
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

// Utility: check if logged in
function isLoggedIn() {
  return !!localStorage.getItem("token");
}
