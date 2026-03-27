// ToDo List App

// Selectors
const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task-button');
const taskList = document.getElementById('task-list');

// Events
addTaskButton.addEventListener('click', addTask);
taskList.addEventListener('click', manageTask);

// Functions
function addTask() {
    const task = taskInput.value;
    if (task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
        taskInput.value = '';
    }
}

function manageTask(e) {
    if (e.target.classList.contains('delete-task')) {
        const taskIndex = e.target.parentElement.dataset.index;
        deleteTask(taskIndex);
    }
}

function deleteTask(index) {
    let tasks = getTasksFromLocalStorage();
    tasks.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function getTasksFromLocalStorage() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks;
}

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = getTasksFromLocalStorage();
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${task} <button class='delete-task'>Delete</button>`;
        li.dataset.index = index;
        taskList.appendChild(li);
    });
}

// Initial render
renderTasks();

