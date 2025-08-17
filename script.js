const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const trashContainer = document.getElementById("trash-container");

function addTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
  <label>
    <input type="checkbox">
    <span>${task}</span>
  </label>
  <span class="edit-btn">Edit</span>
  <span class="delete-btn">Delete</span>
  `;
    
    const checkbox = li.querySelector("input");
    const editBtn = li.querySelector(".edit-btn");
    const taskSpan = li.querySelector("span");
    const deleteBtn = li.querySelector(".delete-btn");

    checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    if (checkbox.checked) {
    alert("Success!! \nYou completed a task!");
    } else {
    alert("Success!! \nYou uncompleted a task!");
    }
    updateCounters();
    });

    editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
        taskSpan.textContent = update;
        li.classList.remove("completed");
        checkbox.checked = false;
        updateCounters();
    }
    });
  listContainer.appendChild(li);
  inputBox.value = "";
  updateCounters();

  deleteBtn.addEventListener("click", function () {
      const li2 = document.createElement("li");
      li2.innerHTML = `
      <label>
        <span>${taskSpan.textContent}</span>
      </label>
      <span class="recover-btn">Recover</span>
      <span class="delete4ever-btn">Delete Forever</span>
      `;
      const recoverBtn = li2.querySelector(".recover-btn");
      const delete4everBtn = li2.querySelector(".delete4ever-btn");

      recoverBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to recover?")) {
          trashContainer.removeChild(li2);
          listContainer.appendChild(li);
          updateCounters();
        }
      });

      delete4everBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task forever? \nYou will never be able to recover this again.")) {
          trashContainer.removeChild(li2);
        }
      });
      trashContainer.appendChild(li2);
      li.remove();
      updateCounters();
  });
}

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

updateCounters();

function deleteAllTasks() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    // Move each task to trash
    const tasks = Array.from(listContainer.querySelectorAll("li"));
    tasks.forEach(li => {
      const taskText = li.querySelector("label span").textContent;
      const li2 = document.createElement("li");
      li2.innerHTML = `
        <label>
          <span>${taskText}</span>
        </label>
        <span class="recover-btn">Recover</span>
        <span class="delete4ever-btn">Delete Forever</span>
      `;
      const recoverBtn = li2.querySelector(".recover-btn");
      const delete4everBtn = li2.querySelector(".delete4ever-btn");
      recoverBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to recover?")) {
          trashContainer.removeChild(li2);
          listContainer.appendChild(li);
          updateCounters();
        }
      });
      delete4everBtn.addEventListener("click", function () {
        if (confirm("Are you sure you want to delete this task forever? \nYou will never be able to recover this again.")) {
          trashContainer.removeChild(li2);
        }
      });
      trashContainer.appendChild(li2);
      li.remove();
    });
    updateCounters();
  }
}

function deleteAllTasks2() {
  if (confirm("Are you sure you want to delete all tasks?")) {
    trashContainer.innerHTML = "";
    updateCounters();
  }
}

