"use strict";

// Datu forma: { id: number, text: string, done: boolean }.
const STORAGE_KEY = "pd1-uzdevumi";
const taskInput = document.getElementById("task-input");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const emptyState = document.getElementById("emptyState");
const statusMessage = document.getElementById("statusMessage");
const clearAllBtn = document.getElementById("clearAllBtn");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

let tasks = loadTasks();
let currentFilter = "all";

// Ielādē tikai pareizas formas uzdevumus no pārlūka atmiņas.
function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter(item => item && Number.isSafeInteger(item.id) &&
      typeof item.text === "string" && typeof item.done === "boolean");
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

// Date.now() dublikāta gadījumā palielinām ID par vienu.
function newTaskId() {
  let id = Date.now();
  while (tasks.some(task => task.id === id)) id += 1;
  return id;
}

function addTask(rawText) {
  const text = rawText.trim();
  if (!text) return;
  tasks.push({ id: newTaskId(), text, done: false });
  saveTasks();
  taskInput.value = "";
  renderTasks();
  taskInput.focus();
}

function toggleTask(id) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  task.done = !task.done;
  saveTasks();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(item => item.id !== id);
  saveTasks();
  renderTasks();
}

// Papildfunkcija A: dubultklikšķis atver rediģēšanas lauku.
function startEdit(id, textElement) {
  const task = tasks.find(item => item.id === id);
  if (!task) return;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = task.text;
  input.maxLength = 200;
  input.setAttribute("aria-label", "Rediģēt uzdevumu");
  textElement.replaceWith(input);
  input.addEventListener("keydown", event => {
    if (event.key === "Enter" || event.key === "Escape") {
      event.preventDefault();
      finishEdit(id, input, event.key === "Enter");
    }
  });
  input.addEventListener("blur", () => finishEdit(id, input, false));
  input.focus();
  input.select();
}

function finishEdit(id, input, save) {
  if (!input.isConnected) return;
  const task = tasks.find(item => item.id === id);
  if (save && task) {
    const text = input.value.trim();
    if (text) {
      task.text = text;
      saveTasks();
    }
  }
  renderTasks();
}

function getVisibleTasks() {
  return tasks.filter(task => currentFilter === "all" ||
    (currentFilter === "active" && !task.done) ||
    (currentFilter === "completed" && task.done));
}

function createTaskRow(task) {
  const li = document.createElement("li");
  li.className = `task-row${task.done ? " is-completed" : ""}`;
  li.dataset.taskId = String(task.id);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", `Atzīmēt: ${task.text}`);
  checkbox.addEventListener("change", () => toggleTask(task.id));
  const label = document.createElement("span");
  label.className = "task-text";
  label.textContent = task.text; // Drošs teksts, nevis HTML.
  label.title = "Dubultklikšķis, lai rediģētu";
  label.addEventListener("dblclick", () => startEdit(task.id, label));
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete-button";
  remove.textContent = "Dzēst";
  remove.setAttribute("aria-label", `Dzēst: ${task.text}`);
  remove.addEventListener("click", () => deleteTask(task.id));
  li.append(checkbox, label, remove);
  return li;
}

function renderTasks() {
  taskList.replaceChildren();
  const visible = getVisibleTasks();
  for (const task of visible) taskList.append(createTaskRow(task));
  counter.textContent = `Atlikuši ${tasks.filter(task => !task.done).length} uzdevumi`;
  emptyState.hidden = visible.length > 0;
  emptyState.textContent = tasks.length === 0
    ? "Pagaidām nav uzdevumu. Pievieno pirmo!"
    : "Šajā filtrā nav uzdevumu.";
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
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.warn("Neizdevās notīrīt atmiņu:", error);
  }
  renderTasks();
});

renderTasks();
