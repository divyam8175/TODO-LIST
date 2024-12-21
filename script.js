document.addEventListener("DOMContentLoaded", loadTasks);
const btn = document.getElementById("button");
const taskList = document.getElementById("list");
const input = document.getElementById("input");
// const btn1 = document.getElementById("delete");
btn.addEventListener("click", () => {
  console.log("Button clicked");
  let inpt = input.value.trim();

  if (inpt !== "") {
    addTaskToList(inpt);
    saveTaskToLocalStorage(inpt);
    input.value = "";
  } else {
    alert("Please enter a task");
  }
});

function addTaskToList(taskText) {
  const li = document.createElement("li");
  // li.textContent = taskText;
  const taskSpan = document.createElement("span");
  taskSpan.textContent = taskText;
  // Add a delete button
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Remove";
  deleteButton.classList.add("delete");
  deleteButton.addEventListener("click", () => {
    li.remove(); // Remove from UI
    removeTaskFromLocalStorage(taskText); // Remove from localStorage
  });

  li.appendChild(deleteButton);
  li.appendChild(taskSpan);
  taskList.appendChild(li);
}

// Save task to localStorage
function saveTaskToLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push(taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach((task) => addTaskToList(task));
}

// Remove a task from localStorage
function removeTaskFromLocalStorage(taskText) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks = tasks.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
