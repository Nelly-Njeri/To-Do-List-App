const taskList = document.getElementById('taskList');
const newTaskInput = document.getElementById('newTask');
const addTaskButton = document.getElementById('addTask');

// Array to store tasks (modify for persistence if needed)
let tasks = [];

// Add task event listener
addTaskButton.addEventListener('click', () => {
  const newTaskValue = newTaskInput.value.trim();

  // Input validation (prevent empty tasks)
  if (!newTaskValue) {
    alert('Please enter a task');
    return;
  }

  // Update tasks array and DOM
  tasks.push({ text: newTaskValue, completed: false });
  renderTaskList();

  // Clear input field after adding
  newTaskInput.value = '';
});

// Render the to-do list based on the tasks array
function renderTaskList() {
  taskList.innerHTML = ''; // Clear existing tasks

  tasks.forEach((task, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('task-item');
    listItem.textContent = task.text;

    // Completion checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed; // Reflects completed state
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      listItem.classList.toggle('completed', checkbox.checked); // Reflects completion visually
    });
    listItem.appendChild(checkbox);

    // Edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit-button');
    editButton.addEventListener('click', () => editTask(listItem, index));
    listItem.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-button');
    deleteButton.addEventListener('click', () => deleteTask(index));
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);
  });
}

// Edit task function
function editTask(listItem, index) {
  const newTaskValue = prompt('Enter the new task:', listItem.textContent);

  // Input validation (prevent empty tasks)
  if (!newTaskValue) {
    alert('Please enter a task');
    return;
  }

  tasks[index].text = newTaskValue;
  renderTaskList();
}

// Delete task function
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTaskList();
}

// Initial rendering
renderTaskList();
