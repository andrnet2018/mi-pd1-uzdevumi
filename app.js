"use strict";

// PD1 un PD2 lieto vienu un to pasu localStorage atslēgu.
// PD2 dati: { id: number, text: string, done: boolean, due?: string | null }.
const STORAGE_KEY = "pd1-uzdevumi";
const taskInput = document.getElementById("task-input");
const dueInput = document.getElementById("due-input");
const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("task-list");
const counter = document.getElementById("counter");
const emptyState = document.getElementById("emptyState");
const statusMessage = document.getElementById("statusMessage");
const clearAllBtn = document.getElementById("clearAllBtn");
const sortBtn = document.getElementById("sortBtn");
const filterButtons = Array.from(document.querySelectorAll("[data-filter]"));

let tasks = loadTasks();
let currentFilter = "all";

function isValidDue(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf()) && date.toISOString().slice(0, 10) === value;
}

function loadTasks() {
  try {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(data)) return [];
    return data.filter(item => item && Number.isSafeInteger(item.id) &&
      typeof item.text === "string" && typeof item.done === "boolean")
      .map(item => ({ ...item, due: isValidDue(item.due) ? item.due : null }));
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

function newTaskId() {
  let id = Date.now();
  while (tasks.some(task => task.id === id)) id += 1;
  return id;
}

function todayISO() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isOverdue(task) {
  return !task.done && isValidDue(task.due) && task.due < todayISO();
}

function formatDue(value) {
  if (!isValidDue(value)) return "";
  const [year, month, day] = value.split("-");
  return `${day}.${month}.${year}`;
}

function addTask(rawText) {
  const text = rawText.trim();
  if (!text) return;
  const due = isValidDue(dueInput.value) ? dueInput.value : null;
  tasks.push({ id: newTaskId(), text, done: false, due });
  saveTasks();
  taskInput.value = "";
  dueInput.value = "";
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

function createDueBadge(task) {
  const due = document.createElement("span");
  due.className = "due-badge";
  const overdue = isOverdue(task);
  if (overdue) due.classList.add("is-overdue");
  due.textContent = overdue
    ? `Nokavēts · ${formatDue(task.due)}` : `Termiņš: ${formatDue(task.due)}`;
  return due;
}

function createTaskRow(task) {
  const li = document.createElement("li");
  li.className = `task-row${task.done ? " is-completed" : ""}`;
  if (isOverdue(task)) li.classList.add("task-overdue");
  li.dataset.taskId = String(task.id);
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "task-checkbox";
  checkbox.checked = task.done;
  checkbox.setAttribute("aria-label", `Atzīmēt: ${task.text}`);
  checkbox.addEventListener("change", () => toggleTask(task.id));
  const content = createTaskContent(task);
  const remove = document.createElement("button");
  remove.type = "button";
  remove.className = "delete-button";
  remove.textContent = "Dzēst";
  remove.setAttribute("aria-label", `Dzēst: ${task.text}`);
  remove.addEventListener("click", () => deleteTask(task.id));
  li.append(checkbox, content, remove);
  return li;
}

function createTaskContent(task) {
  const content = document.createElement("div");
  content.className = "task-content";
  const label = document.createElement("span");
  label.className = "task-text";
  label.textContent = task.text;
  label.title = "Dubultklikšķis, lai rediģētu";
  label.addEventListener("dblclick", () => startEdit(task.id, label));
  content.append(label);
  if (isValidDue(task.due)) content.append(createDueBadge(task));
  return content;
}

function renderStats() {
  const total = tasks.length;
  const done = tasks.filter(task => task.done).length;
  const overdue = tasks.filter(isOverdue).length;
  const percent = total ? Math.round(done / total * 100) : 0;
  document.getElementById("statsTotal").textContent = String(total);
  document.getElementById("statsDone").textContent = String(done);
  document.getElementById("statsOverdue").textContent = String(overdue);
  document.getElementById("progressValue").textContent = `${percent}%`;
  const progress = document.getElementById("progressBar");
  progress.style.width = `${percent}%`;
  progress.setAttribute("aria-valuenow", String(percent));
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
  renderStats();
}

function sortTasks() {
  tasks.sort((a, b) => a.text < b.text ? -1 : a.text > b.text ? 1 : 0);
  saveTasks();
  renderTasks();
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

sortBtn.addEventListener("click", sortTasks);
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
