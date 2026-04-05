const API_URL = "http://localhost:3000/api/expenses";

const form = document.getElementById("expense-form");
const list = document.getElementById("expense-list");

// Load expenses
async function loadExpenses() {
  const res = await fetch(API_URL);
  const data = await res.json();

  list.innerHTML = "";

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

  const category = "General"; // temporary since no input field yet

  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, amount, category })
  });

  form.reset();
  loadExpenses();
});

// Delete expense
async function deleteExpense(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  loadExpenses();
}

// Initial load
loadExpenses();
