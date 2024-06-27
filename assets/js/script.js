// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

let tasks = [];

function init() {
  if(taskList!==null) {
    tasks = taskList;
  }

}

init();

// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Date.now() * Math.random());
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    const taskCard = $("<div>");
    taskCard.addClass('card');
    taskCard.attr('id', task.taskID);


}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const newTask = {
        taskName:$('#title').val(),
        taskDate:$('#datepicker').datepicker('getDate'),
        taskDescription:$('#description').val(),
        taskID:generateTaskId()

    };
    tasks.push(newTask);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    $('#formModal').modal('hide');

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

});

$(function () {
    $('#datepicker').datepicker({
      changeMonth: true,
      changeYear: true,
    });
  });




  
  
