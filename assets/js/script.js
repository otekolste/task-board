// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

let tasks = [];

const currentDate = new Date();

function init() {
  if(taskList!==null) {
    tasks = taskList;
  }

}


// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Date.now() * Math.random());
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    $("#" + task.taskProgress).append(
      $('<div class="card" id=' + task.taskID + '>').append(
        $('<div class="card-body">').append(
          $('<h3 class = "card-title">')
        )
      )
    );
    $("#" + task.taskID + " h3").html(task.taskName);
    $("#" + task.taskID + " h3").after('<div class= "card-text">');
    $("#" + task.taskID + " .card-text").html(task.taskDescription + '<br>' + task.taskDate);
    $("#" + task.taskID + " .card-text").after('<button class="delete">');
    $(".delete").text("Delete");
    $(".delete").on("click", handleDeleteTask(task));
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for(task of tasks) {
    let newTask = createTaskCard(task);
  }

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const newTask = {
        taskName:$('#title').val(),
        taskDate:$('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val(),
        taskDescription:$('#description').val(),
        taskID:generateTaskId(),
        taskProgress: "todo-cards"

    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    $('#formModal').modal('hide');

    renderTaskList();

}

$('#submitTask').click(function() {
  handleAddTask();
})

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  init();

  renderTaskList();

  console.log(tasks);


});

$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });




  
  
