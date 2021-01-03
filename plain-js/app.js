let taskListId = 0;
const getNextTaskListId = () => `taskListContainer${taskListId++}`;
var popupScreen;
var popupTextBox;
var popupTaskContent;
var focusedTask;
var focusedText
var focusedTaskLikes;
var likeButton;
var likeCounter

const createTaskList = (taskListId, title = "", tasks = []) => {
  return {taskListId, title, tasks};
};

const createTask = (title, task, likes) => {
  return {title, task, likes};
};

const addElement = (containerId, element) => {
  if(!containerId) return;
  const container = document.getElementById(containerId);
  if (container && container.insertAdjacentHTML) {
    container.insertAdjacentHTML("beforeend", element);
  }
};

const taskLists = [
  createTaskList(
    getNextTaskListId(),
    `Title ${taskListId}`,
    [
      createTask("task1", "abc1", 10),
      createTask("task2", "abc2", 9),
      createTask("task3", "abc3", 3),
      createTask("task4", "abc4", 4)
    ]
  ),
  createTaskList(
    getNextTaskListId(),
    `Title ${taskListId}`,
    [
      createTask("xyz1", "pqrs", 10),
      createTask("xyz2", "pqrs2", 14)
    ]
  ),
  createTaskList(
    getNextTaskListId(),
    `Title ${taskListId}`,
    [
      createTask("lmn", "opq", 10)
    ]
  )
];

const addTaskLists = () => {
    popupScreen = document.getElementById("focusT");
    popupTextBox = document.getElementById("focusTT");
    popupTaskContent = document.getElementById("focusTC");
    likeButton = document.getElementById("likeB");

    taskLists.map((taskList) => {
        const { taskListId, title, tasks } = taskList;
        addElement("sectionContent", getTaskListComponent(taskListId, title, tasks));
    });
};



window.onclick = function (event) {
    if (event.target == popupScreen) {
        closePopup();
    }
}

function closePopup() {
    focusedText.innerText = popupTextBox.value;
    popupScreen.style.display = "none";
}

function deleteTask() {
    focusedTask.style.display = "none";
    closePopup();
}

function likePopup() {
    focusedTaskLikes += 1;
    var likeText = "+" + focusedTaskLikes;
    likeButton.innerText = likeText;
    likeCounter.innerText = likeText;
}

function openTaskPopup(task) {
    focusedTask = task;
    focusedText = focusedTask.getElementsByClassName("taskTextContent")[0];
    likeCounter = focusedTask.getElementsByClassName("likeCounter")[0];

    var likeCountText = likeCounter.innerText;
    focusedTaskLikes = parseInt(likeCountText.split('+')[1]);

    var bcolor = window.getComputedStyle(focusedTask).backgroundColor;

    likeButton.innerText = likeCountText;

    popupScreen.style.display = "block";

    popupTextBox.value = focusedText.innerText;
    popupTaskContent.style.backgroundColor = bcolor;
}


const addTask = (taskListId, taskTitle="TaskN", taskContent="abc", likes="0") => {
    const task = `
    <div class="taskContainer" id="${taskListId}0" onclick="openTaskPopup(this)">
      <div class="taskTilteBar">
      </div>
      <div class="taskTextContent"></div>
      <div class="likeCounter">+${likes}</div>
    </div>
  `;
  addElement(taskListId, task);
  return task;
};

const getTaskContent = (tasks = [], taskListId) => {
  return tasks.reduce(
    (taskList, task) => {
        const { taskTitle, taskContent, likes } = task;
        return taskList + addTask(taskListId, taskTitle, taskContent, likes);
    },
    ""
  );
};

const getTaskListComponent = (taskListId, title = "", tasks = []) => {
  const taskListComponent = `
    <div class="taskListContainer">
      <div class="taskListTitleBar">
        <span class="taskListTitle">
          ${title}
        </span>
        <button class="addButton" onclick="addTask('${taskListId}')">
          +
        </button>
      </div>
      <div class="taskListContent" id="${taskListId}">
        ${getTaskContent(tasks, taskListId)}
      </div>
    </div>
  `;

  return taskListComponent;
};
