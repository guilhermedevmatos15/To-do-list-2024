const $input = document.querySelector('input');
const $btnAdd = document.querySelector('form .btn');
const $tasks = document.querySelector('.tasks');

const $editMenu = document.querySelector('body > .edit');
const $editInput = $editMenu.querySelector('form input');
const $editBtnConf = $editMenu.querySelector('[data-func="edit"]');
const $editClose = $editMenu.querySelector('[data-func="cancel"]');
const $editSpan = $editMenu.querySelector('p span');

const closeEditMenu = () => {
   $editMenu.classList.remove('active');
   $editInput.value = '';
   $editSpan.innerHTML = '';
};

let tasksArr = [];

const renderTasks = () => {
   $tasks.innerHTML = '';

   tasksArr.forEach((task) => {
      $tasks.innerHTML += `
         <div class="task" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <i class="task-icon fa-solid fa-pen" title="Edit" onClick="editTask(${task.id})"></i>
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

const editTask = (id) => {
   $editMenu.classList.add('active');

   const $task = document.querySelector(`[data-id="${id}"]`);
   const $taskText = $task.querySelector('.task-text');

   $editInput.value = $taskText.textContent;
   $editSpan.innerHTML = $taskText.textContent;

   const newClickHandler = () => {
      if ($editInput.value) {
         tasksArr = tasksArr.map((task) => {
            if (task.id === id) {
               return { id, text: $editInput.value };
            }
            return task;
         });
         renderTasks();
         closeEditMenu();
      } else {
         alert('Preencha o campo de edição!');
         $editInput.focus();
      }
      
      // Remove o listener após a confirmação para evitar múltiplas execuções
      $editBtnConf.removeEventListener('click', newClickHandler);
   };

   // Certifique-se de que o evento anterior seja removido
   $editBtnConf.removeEventListener('click', newClickHandler);
   $editBtnConf.addEventListener('click', newClickHandler);
};

$btnAdd.addEventListener('click', () => {
   if ($input.value) {
      createTask($input.value.trim());
      $input.focus();
      $input.value = '';
   } else {
      alert('Preecha o campo!');
      $input.focus();
   }
});

$editClose.addEventListener('click', () => closeEditMenu());
