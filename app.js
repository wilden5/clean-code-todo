const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskList = document.getElementById('incomplete-tasks');
const completedTasksList = document.getElementById('completed-tasks');

const createElement = (tagName, props = {}) => {
  const element = document.createElement(tagName);
  Object.assign(element, props);
  return element;
};

const createNewTaskElement = function (taskString) {
  const listItem = createElement('li');
  const checkBox = createElement('input', { type: 'checkbox' });
  const label = createElement('label', {
    className: 'task',
    innerText: taskString,
  });
  const editInput = createElement('input', { type: 'text', className: 'task' });
  const editButton = createElement('button', {
    innerText: 'Edit',
    className: 'edit',
  });
  const deleteButton = createElement('button', { className: 'delete' });
  const deleteButtonImg = createElement('img', { src: './remove.svg' });

  deleteButton.appendChild(deleteButtonImg);

  listItem.append(checkBox, label, editInput, editButton, deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');
  const containsClass = listItem.classList.contains('editMode');

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

function toggleTaskStatus() {
  const listItem = this.parentNode;

  this.checked
    ? completedTasksList.appendChild(listItem)
    : incompleteTaskList.appendChild(listItem);
}

addButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskStatus);
}

for (let i = 0; i < incompleteTaskList.children.length; i++) {
  bindTaskEvents(incompleteTaskList.children[i]);
}

for (let i = 0; i < completedTasksList.children.length; i++) {
  bindTaskEvents(completedTasksList.children[i]);
}
