window.addEventListener("load", () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_element = document.querySelector("#tasks");
  
    // Load tasks from local storage when page is loaded
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(savedTask => {
      const task_element = createTaskElement(savedTask);
      list_element.appendChild(task_element);
    });
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
  
      const task = input.value;
      if (!task) {
        alert("Please fill out task!");
        return;
      }
  
      const task_element = createTaskElement(task);
      list_element.appendChild(task_element);
  
      // Save tasks to local storage
      saveTasksToLocalStorage();
  
      input.value = "";
    });
  
    // Function to create a task element
    function createTaskElement(taskContent) {
      const task_element = document.createElement("div");
      task_element.classList.add("task");
  
      const task_el_content = document.createElement("div");
      task_el_content.classList.add("content");
  
      const task_input_el = document.createElement("input");
      task_input_el.classList.add("text");
      task_input_el.type = "text";
      task_input_el.value = taskContent;
      task_input_el.setAttribute("readonly", "readonly");
  
      task_el_content.appendChild(task_input_el);
      task_element.appendChild(task_el_content);
  
      const task_actions_el = document.createElement("div");
      task_actions_el.classList.add("actions");
  
      const task_edit_el = document.createElement("button");
      task_edit_el.classList.add("edit");
      task_edit_el.innerHTML = "Edit";
  
      const task_delete_el = document.createElement("button");
      task_delete_el.classList.add("delete");
      task_delete_el.innerHTML = "Delete";
  
      task_actions_el.appendChild(task_edit_el);
      task_actions_el.appendChild(task_delete_el);
      task_element.appendChild(task_actions_el);
  
      task_edit_el.addEventListener("click", () => {
        if (task_edit_el.innerText.toLowerCase() == "edit") {
          task_input_el.removeAttribute("readonly");
          task_input_el.focus();
          task_edit_el.innerText = "Save";
        } else {
          task_input_el.setAttribute("readonly", "readonly");
          task_edit_el.innerText = "Edit";
          // Update the task content in local storage
          saveTasksToLocalStorage();
        }
      });
  
      task_delete_el.addEventListener("click", () => {
        list_element.removeChild(task_element);
        // Update tasks in local storage after deletion
        saveTasksToLocalStorage();
      });
  
      return task_element;
    }
  
    // Function to save tasks to local storage
    function saveTasksToLocalStorage() {
      const tasks = Array.from(list_element.querySelectorAll(".text")).map(task => task.value);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  });
  