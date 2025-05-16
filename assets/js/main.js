// Sections
const todaySection = document.getElementById("today");
const menuSection = document.getElementById("menu");
const optionalSection = document.getElementById("task-optional");
const upcommingSection = document.getElementById("Upcomming");
const calendarSection = document.getElementById("calendar");
// Sections


// Task Menu
const todayTask = document.getElementById("today-task");
const upcommingTask = document.getElementById("upcomming-task");
const calendarTask = document.getElementById("calendar-task");
// Task Menu

// Inputs
const inputTask = document.getElementById("inp-task");
const inputOptional = document.getElementById("inp-optional");
const inputTaskToday = document.getElementById("inp-task-today");
const inputTaskTomorrow = document.getElementById("inp-task-tomorrow");
const inputTaskWeek = document.getElementById("inp-task-week");
// Inputs

// Ul
const tasks = document.getElementById("tasks");
const tasksToday = document.getElementById("today-tasks");
const tasksTomorrow = document.getElementById("tomorrow-tasks");
const tasksWeek = document.getElementById("Week-tasks");
// Ul

// btns
const newTaskNormal = document.getElementById("new-task-normal");
const newTaskOptional = document.getElementById("new-task-optional");
const btnDelete = document.getElementById("del-btn");
const btnSave = document.getElementById("save-btn");
const newTaskNormalToday = document.getElementById("new-task-normal-today");
const newTaskNormalTomorrow = document.getElementById("new-task-normal-tomorrow");
const newTaskNormalWeek = document.getElementById("new-task-normal-week");
const calendarDay = document.getElementsByClassName("calendar-link-day")
const calendarWeek = document.getElementsByClassName("calendar-link-week")
// btns

// calendar wrapper
const calendarDayWrapper = document.getElementById("calendar-day-wrapper")
const calendarWeekWrapper = document.getElementById("calendar-week-wrapper")
// calendar wrapper

// querySelectorAll
const hamIcon = document.querySelectorAll(".ham-icon");
const closeMenu = document.querySelectorAll(".close-menu");
const links = document.querySelectorAll(".links>a")
// querySelectorAll

hamIcon.forEach((element) => {
  element.addEventListener("click", function () {
    todaySection.style.left = "-100%";
    upcommingSection.style.left = "-100%";
    calendarSection.style.left = "-100%"
    menuSection.style.left = "0";
  });
});

upcommingTask.addEventListener("click", () => {
  upcommingSection.style.left = "0";
  menuSection.style.left = "-100%";
});

todayTask.addEventListener("click", () => {
  todaySection.style.left = "0";
  menuSection.style.left = "-100%";
  inputTask.focus();
});


calendarTask.addEventListener("click", () => {
  calendarSection.style.left = "0";
  menuSection.style.left = "-100%";  
})




closeMenu.forEach((element) => {
  element.addEventListener("click", function () {
    todaySection.style.left = "0";
    menuSection.style.left = "-100%";
    optionalSection.style.left = "-100%";
  });
});

let currentEditingLink = null;
let isCreatingNewTask = false;


// Add New Task Normal
newTaskNormal.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTaskNormal(inputTask.value);
  inputTask.value = "";
});

function addNewTaskNormal(text) {
  if (text) {
    const newLi = createTaskLi(text);
    tasks.appendChild(newLi);
  }
}

// Add new Task Normal Today
newTaskNormalToday.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTaskNormalToday(inputTaskToday.value);
  inputTaskToday.value = "";
});

function addNewTaskNormalToday(text) {
  if (text) {
    const newLi = createTaskLi(text);
    tasksToday.appendChild(newLi);
  }
}


// Add new Task Normal Tomorrow
newTaskNormalTomorrow.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTaskNormalTomorrow(inputTaskTomorrow.value);
  inputTaskTomorrow.value = "";
});

function addNewTaskNormalTomorrow(text) {
  if (text) {
    const newLi = createTaskLi(text);
    tasksTomorrow.appendChild(newLi);
  }
}

// Add new Task Normal Week
newTaskNormalWeek.addEventListener("click", function (e) {
  e.preventDefault();
  addNewTaskNormalWeek(inputTaskWeek.value);
  inputTaskWeek.value = "";
});

function addNewTaskNormalWeek(text) {
  if (text) {
    const newLi = createTaskLi(text);
    tasksWeek.appendChild(newLi);
  }
}


// Create li in all Tasks Ul
function createTaskLi(text) {
  const newLi = document.createElement("li");
  newLi.innerHTML = `
      <div>
          <div>
              <input type="checkbox" onclick="done(this)">
              <a class="link" href="#">
                  <p>${text}</p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                      viewBox="0 0 24 24" fill="none" stroke="currentColor"
                      stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M9 6l6 6l-6 6" />
                  </svg>
              </a>
          </div>
      </div>
  `;
  return newLi;
}

// Add New Task with Enter
inputTask.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNewTaskNormal(inputTask.value);
    inputTask.value = "";
  }
});

// Add New Task Today with Enter
inputTaskToday.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNewTaskNormalToday(inputTaskToday.value);
    inputTaskToday.value = "";
  }
});
 
// Add New Task Tomorrow with Enter 
inputTaskTomorrow.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNewTaskNormalTomorrow(inputTaskTomorrow.value);
    inputTaskTomorrow.value = "";
  }
});

// Add New Task Week with Enter
inputTaskWeek.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    addNewTaskNormalWeek(inputTaskWeek.value);
    inputTaskWeek.value = "";
  }
});

document.addEventListener("click", function (e) {
  if (e.target.closest(".link")) {
    e.preventDefault();
    const link = e.target.closest(".link");
    openEditMode(link);
  }
});

// Add New Task Optional
newTaskOptional.addEventListener("click", function (e) {
  e.preventDefault();
  openOptionalCreate();
});

// Open Optional Section
function openOptionalCreate() {
  isCreatingNewTask = true;
  currentEditingLink = null;

  optionalSection.style.left = "0";
  todaySection.style.left = "-100%";
  inputOptional.value = "";
  inputOptional.focus();
}

// We have two modes:
btnSave.addEventListener("click", function (e) {
  e.preventDefault();
  if (isCreatingNewTask) {
    // either the save button is pressed for to create a new element.
    creatTaskOptional();
  } else {
    // or editing mode
    if (todaySection.style.left = "0") {
      editTask();
    } else {
      editTaskUpcomming();
    }
  }
});

// Add Task Optional Li in End line
function creatTaskOptional() {
  const text = inputOptional.value;
  if (text) {
    const newLi = createTaskLi(text);

    tasks.appendChild(newLi);
    closeEditMode();
  }
}

function openEditMode(link) {
  // if this variable was true , create element in new line
  isCreatingNewTask = false;
  currentEditingLink = link;

  const text = link.querySelector("p").textContent;

  optionalSection.style.left = "0";
  todaySection.style.left = "-100%";
  upcommingSection.style.left = "-100%"
  inputOptional.value = text;
  inputOptional.focus();
}

function editTask() {
  if (currentEditingLink) {
    const editedText = inputOptional.value;
    if (editedText) {
      currentEditingLink.querySelector("p").textContent = editedText;
    }
    closeEditMode();
  }
}

function editTask() {
  if (currentEditingLink) {
    const editedText = inputOptional.value;
    if (editedText) {
      currentEditingLink.querySelector("p").textContent = editedText;
    }
    closeEditModeUpcomming();
  }
}

function closeEditMode() {
  optionalSection.style.left = "-100%";
  menuSection.style.left = "-100%";
  todaySection.style.left = "0";
  currentEditingLink = null;
  isCreatingNewTask = false;
}

function closeEditModeUpcomming() {
  optionalSection.style.left = "-100%";
  menuSection.style.left = "-100%";
  todaySection.style.left = "-100%";
  upcommingSection.style.left = "0";
  currentEditingLink = null;
  isCreatingNewTask = false;
}

// Done Tasks
function done(element) {
  if (element.checked) {
    element.nextElementSibling.children[0].style.textDecoration =
      "line-through";
  } else {
    element.nextElementSibling.children[0].style.textDecoration = "none";
  }
}


function showWrapperWeek () {
  calendarDayWrapper.style.left = "-120%";
  calendarWeekWrapper.style.left = "0";
  calendarDay.classList.remove("active-tab")
}

function showWrapperDay () {
  calendarWeekWrapper.style.left = "-120%";
  calendarDayWrapper.style.left = "0";
}

document.addEventListener('DOMContentLoaded', function() {

  const linksCalendar = document.querySelectorAll('a');

  linksCalendar.forEach(link => {

    link.addEventListener('click', function(e) {
      
      linksCalendar.forEach(tab => tab.classList.remove('active-tab'));
      
      this.classList.add('active-tab');
    });
  });
});