const API_URL = "http://localhost:3000/api/expenses";

const token = localStorage.getItem("token");
const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");

// Redirect if not logged in
if (!token) {
  alert("You must be logged in to view expenses.");
  window.location.href = "login.html";
}

// Load expenses
async function loadExpenses() {
  const res = await fetch(API_URL, {
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();

  list.innerHTML = "";

  if (data.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No expenses yet.";
    list.appendChild(li);
    return;
  }

  data.forEach(expense => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${expense.title} - ₹${expense.amount}
      <span class="delete" onclick="deleteExpense('${expense._id}')">X</span>
    `;
    list.appendChild(li);
  });
}

// Add expense
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const amount = document.getElementById("amount").value;
  const category = "General";

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ title, amount, category })
  });

  form.reset();
  loadExpenses();
});

// Delete expense
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  loadExpenses();
}

// Initial load
loadExpenses();
