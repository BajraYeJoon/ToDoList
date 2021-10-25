//defining all the variables

const form = document.querySelector("#task-form");
const taskInsert = document.querySelector("#task");
const taskList = document.querySelector("#collections");
const clearTask = document.querySelector(".clear-tasks");


//LOADING THE DOM FROM THE LOCAL STORAGE

document.addEventListener("DOMContentLoaded", (e) => {
  //Initialization of the tasks

  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  //Loop through each task from the LS
  tasks.forEach((task) => {
    const list = document.createElement("li");
    list.className = "list-added-items";
    list.appendChild(document.createTextNode(task));

    // Add added elements to the ul
    const link = document.createElement("a");
    link.className = "delete-items secondary-content";
    link.innerHTML = '<i class="fa fa-remove"></i>';

    list.appendChild(link);

    taskList.appendChild(list);
  });
});
// ADDING TASKS
form.addEventListener("submit", (e) => {
  if (taskInsert.value === "") {
    alert("Please Enter a Task :) ");
  }

  //create list element for the task to be added

  const list = document.createElement("li");
  list.className = "list-added-items";
  list.appendChild(document.createTextNode(taskInsert.value));

  // Add added elements to the ul
  const link = document.createElement("a");
  link.className = "delete-items secondary-content";
  link.innerHTML = '<i class="fa fa-remove"></i>';

  list.appendChild(link);

  taskList.appendChild(list);

  //Set the added item to the local storage
  setLocalStorage(taskInsert.value);

  taskInsert.value = "";

  e.preventDefault();
});

function setLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//REMOVING TASKS
taskList.addEventListener("click", (e) => {
  if (e.target.parentElement.classList.contains("delete-items")) {
    if (confirm("ARE YOU SURE")) {
      e.target.parentElement.parentElement.remove();

      removeFromLs(e.target.parentElement.parentElement);
    }
  }
});

function removeFromLs(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task, index) => {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//REMOVE ALL TASKS
clearTask.addEventListener("click", (e) => {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  clearTaskFromLs();
});

function clearTaskFromLs() {
  localStorage.clear();
}

