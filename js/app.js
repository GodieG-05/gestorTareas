document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('task-form');
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    form.addEventListener('submit', function(event) {
      event.preventDefault();
      const task = document.getElementById('task').value;
      const startDate = document.getElementById('start-date').value;
      const endDate = document.getElementById('end-date').value;
      const difficulty = document.getElementById('difficulty').value;
      const description = document.getElementById('description').value;

      const newTask = {
        id: Date.now(),
        task,
        startDate,
        endDate,
        difficulty,
        description,
        state: "pendiente",
        completed: false
      };

      tasks.push(newTask);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      displayTask(newTask);
      form.reset();
    });

    function displayTask(task) {
      const li = document.createElement('li');
      li.innerHTML = `
        <label for="casilla" class="casilla">Marcar como completo:</label>
        <input type="checkbox" id="casilla" class="task-checkbox" data-id="${task.id}" ${task.completed ? 'checked' : ''}>
        <span id="detalle">| Tarea: ${task.task} | Fecha de inicio: ${task.startDate} | Fecha de fin: ${task.endDate} | Descripcion: ${task.description} | Nivel de dificultad: ${task.difficulty} | </span>
        <button class="delete-btn">Borrar</button>
      `;

      if (task.completed) {
        completedTasksList.appendChild(li);
      } else {
        pendingTasksList.appendChild(li);
      }

      li.querySelector('.task-checkbox').addEventListener('change', function() {
        const taskId = parseInt(this.getAttribute('data-id'));
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        tasks[taskIndex].completed = this.checked;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        if (this.checked) {
          completedTasksList.appendChild(li);
        } else {
          pendingTasksList.appendChild(li);
        }
      });

      li.querySelector('.delete-btn').addEventListener('click', function() {
        const taskId = parseInt(li.querySelector('.task-checkbox').getAttribute('data-id'));
        tasks = tasks.filter(task => task.id !== taskId);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        li.parentNode.removeChild(li);
      });
    }

    // Cargar tareas existentes al cargar la página
    tasks.forEach(task => {
      displayTask(task);
    });
  });