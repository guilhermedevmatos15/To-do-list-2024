const $input = document.querySelector('input');
const $btnAdd = document.querySelector('form .btn');
const $tasks = document.querySelector('.tasks');

const verifyInput = () => Boolean($input.value);

let tasksArr = [];

const renderTasks = () => {
   $tasks.innerHTML = '';

   tasksArr.forEach((task) => {
      $tasks.innerHTML += `
         <div class="task" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <i class="task-icon fa-solid fa-pen" title="Edit"></i>
            <i class="task-icon fa-solid fa-trash" title="Delete" onClick="deleteTask(${task.id})"></i>
         </div>
      `;
   });
};

const createTask = (text) => {
   tasksArr.push({
      id: tasksArr.length + 1,
      text,
   });
   renderTasks();
};

const deleteTask = (id) => {
   tasksArr = tasksArr.filter((task) => task.id !== id);
   renderTasks();
};

$btnAdd.addEventListener('click', () => {
   if (verifyInput()) {
      createTask($input.value.trim());
      $input.focus();
      $input.value = '';
   } else {
      alert('Preecha o campo!');
      $input.focus();
   }
});
