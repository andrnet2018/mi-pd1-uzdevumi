"use strict";

// Datu forma: { id: string, text: string, completed: boolean }.
const STORAGE_KEY = "mi-pd1-tasks-v1";
const taskInput = document.getElementById("taskInput");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const remainingCount = document.getElementById("remainingCount");
const emptyState = document.getElementById("emptyState");
const statusMessage = document.getElementById("statusMessage");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

let tasks = loadTasks();
let currentFilter = "all";

function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter(item => item && typeof item.id === "string" &&
      typeof item.text === "string" && typeof item.completed === "boolean");
  } catch (error) {
    console.warn("Saglabātos uzdevumus nevarēja nolasīt:", error);
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.warn("Uzdevumus nevarēja saglabāt:", error);
    statusMessage.textContent = "Brīdinājums: saglabāšana nav pieejama.";
  }
}

function addTask(rawText) {
  // Neļauj pievienot tukšu vai tikai no atstarpēm veidotu ierakstu.
  const text = rawText.trim();
  if (!text) return;
  tasks.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    text,
    completed: false
  });
  saveTasks();
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
}

function toggleTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(item => item.id !== id);
  saveTasks();
  renderTasks();
}

// Rediģēšana: dubultklikšķis atver ievadi tieši uzdevuma rindā.
function startEdit(id, textElement) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.className = "edit-input";
  editInput.value = task.text;
  editInput.maxLength = 200;
  editInput.setAttribute("aria-label", "Rediģēt uzdevumu");
  textElement.replaceWith(editInput);

  editInput.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      event.preventDefault();
      finishEdit(id, editInput, true);
    } else if (event.key === "Escape") {
      event.preventDefault();
      finishEdit(id, editInput, false);
    }
  });
  // Noklikšķinot ārpus lauka, izmaiņas tiek atceltas.
  editInput.addEventListener("blur", () => finishEdit(id, editInput, false));
  editInput.focus();
  editInput.select();
}

function finishEdit(id, editInput, save) {
  if (!editInput.isConnected) return;
  const task = tasks.find(item => item.id === id);
  if (save && task) {
    const newText = editInput.value.trim();
    if (newText) {
      task.text = newText;
      saveTasks();
    }
  }
  renderTasks();
}

function renderTasks() {
  taskList.replaceChildren();
  const visible = tasks.filter(task =>
    currentFilter === "all" ||
    (currentFilter === "active" && !task.completed) ||
    (currentFilter === "completed" && task.completed)
  );
  remainingCount.textContent = String(tasks.filter(task => !task.completed).length);
  emptyState.hidden = visible.length > 0;
  emptyState.textContent = tasks.length === 0
    ? "Pagaidām nav uzdevumu. Pievieno pirmo!"
    : "Šajā filtrā nav uzdevumu.";

  for (const task of visible) {
    const li = document.createElement("li");
    li.className = `task-row${task.completed ? " is-completed" : ""}`;
    li.dataset.taskId = task.id;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "task-checkbox";
    checkbox.checked = task.completed;
    checkbox.setAttribute("aria-label", `Atzīmēt: ${task.text}`);
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.className = "task-text";
    span.textContent = task.text; // Lietotāja tekstu nekad neievieto kā HTML.
    span.title = "Dubultklikšķis, lai rediģētu";
    span.addEventListener("dblclick", () => startEdit(task.id, span));

    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete-button";
    remove.textContent = "Dzēst";
    remove.setAttribute("aria-label", `Dzēst: ${task.text}`);
    remove.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, remove);
    taskList.append(li);
  }
}

taskForm.addEventListener("submit", event => {
  event.preventDefault();
  addTask(taskInput.value);
});

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    for (const other of filterButtons) {
      const active = other === button;
      other.classList.toggle("is-active", active);
      other.setAttribute("aria-pressed", String(active));
    }
    renderTasks();
  });
}

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  saveTasks();
  renderTasks();
});

renderTasks();
