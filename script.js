const list = document.querySelector('.list');
const cancelBtn = document.querySelector('.cancel');
const [addForm, editForm] = document.forms;

const users = [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }];

showUsers();

addForm.addEventListener('submit', handleAdd);
editForm.addEventListener('submit', handleSave);
cancelBtn.addEventListener('click', handleCancel);
list.addEventListener('click', handleListClick);

function handleAdd(event) {
  event.preventDefault();

  const name = addForm.elements.name.value;

  addUser(name);
  showUsers();
}

function handleListClick(event) {
  const target = event.target;

  if (target.classList.contains('edit')) {
    handleEdit(event);
  } else if (target.classList.contains('delete')) {
    handleDelete(event);
  }
}

function handleDelete(event) {
  const item = event.target.closest('li');
  const id = +item.dataset.id;

  deleteUser(id);
  showUsers();
}

function handleEdit(event) {
  addForm.hidden = true;
  editForm.hidden = false;

  const item = event.target.closest('li');
  const id = +item.dataset.id;
  const user = users.find(user => user.id === id);

  editForm.elements.id.value = user.id;
  editForm.elements.name.value = user.name;
}

function handleSave(event) {
  event.preventDefault();

  const id = +editForm.elements.id.value;
  const name = editForm.elements.name.value;

  updateUser(id, name);
  showUsers();

  addForm.hidden = false;
  editForm.hidden = true;
}

function handleCancel() {
  addForm.hidden = false;
  editForm.hidden = true;
}

function showUsers() {
  const items = users.map(buildItem);

  list.replaceChildren(...items);
}

function buildItem(user) {
  const item = document.createElement('li');
  const editBtn = document.createElement('button');
  const deleteBtn = document.createElement('button');

  editBtn.textContent = 'Edit';
  deleteBtn.textContent = 'Delete';
  editBtn.classList.add('edit');
  deleteBtn.classList.add('delete');
  item.append(user.name, editBtn, deleteBtn);
  item.dataset.id = user.id;

  return item;
}

function addUser(name) {
  const id = users.length + 1;

  users.push({ id, name });
}

function deleteUser(id) {
  const index = users.findIndex(user => user.id === id);

  users.splice(index, 1);
}

function updateUser(id, name) {
  const user = users.find(user => user.id === id);

  user.name = name;
}