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
      $('<div class="card task" id=' + task.taskID + '>').append(
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
    $(".delete").click(handleDeleteTask);

    $(".task").draggable({
      revert:"invalid",
      stack:".task",
      helper:"clone",
      containment:"document"
    });
    
    renderTaskColor(task);


}

function renderTaskColor(task) {
  if(task.taskProgress == "done-cards") {
    $("#" + task.taskID).css("background-color", "white");
  }
  else if(dayjs().isAfter(task.taskDate)) {
    $("#" + task.taskID).css("background-color", "red");
  }
  else if(Math.abs(dayjs().diff(task.taskDate, 'day')) < 1){
    $("#" + task.taskID).css("background-color", "yellow");
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for(task of tasks) {
    let newTask = createTaskCard(task);
    renderTaskColor(task);
  }
  $(".task").draggable({
    revert:"invalid",
    stack:".task",
    helper:"clone",
    containment:"document"
  });

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

    createTaskCard(newTask);

}

$('#submitTask').click(function() {
  handleAddTask();
})

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const id = event.target.closest(".task").id;
  const index = tasks.findIndex(t => t.taskID == id);
  if(index>-1) {
    tasks.splice(index, 1);
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
  event.target.closest(".task").remove();


  
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let lane = event.target.querySelector("div");
  ui.draggable.detach().appendTo(lane);
  const id = ui.draggable.attr("id");
  const index = tasks.findIndex(function(task) {
    return task.taskID == id;
  });
  console.log(index);
  if(index > -1) {
    tasks[index].taskProgress = lane.id;
  }
  renderTaskColor(tasks.find(function(task) {
    return task.taskID == id;
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks));

  


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  init();

  renderTaskList();

  $('#datepicker').datepicker({
    changeMonth: true,
    changeYear: true,
  });

    $(".card-body").droppable({
      drop: function(event, ui) {
        handleDrop(event, ui);
      }
    });



});




  
  
