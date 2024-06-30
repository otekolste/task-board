// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));

let tasks = [];

const currentDate = new Date();

function init() { // function to be called when document is loaded
  if(taskList!==null) { // checks if taskList from localStorage is empty; if not, copies its contents into local array
    tasks = taskList;
  }

}


// Todo: create a function to generate a unique task id
function generateTaskId() {
  return Math.floor(Date.now() * Math.random()); // Generates unique ID based on current date, multiplied by a random number, to ensure no duplicates
}

// Todo: create a function to create a task card
function createTaskCard(task) {
    $("#" + task.taskProgress).append( // Appends card to the appropriate lane based on progress status
      $('<div class="card task w-75 mb-3" id=' + task.taskID + '>').append( // Set up card class
        $('<div class="card-body mb-2 p-0">').append( // Set up card body
          $('<div class = "card-header pb-0 mb-2">').append(
            $('<h3 class = "card-title">')
          ) // Set up card title section
        )
      )
    );
    $("#" + task.taskID + " h3").html(task.taskName); // Sets text of header to task name
    $("#" + task.taskID + " .card-body").append('<div class= "card-text">'); // Adds section for card text
    $("#" + task.taskID + " .card-text").html(task.taskDescription + '<br>' + task.taskDate); // Adds task description and due date in text of card-body 
    $("#" + task.taskID + " .card-text").after('<button class="delete btn btn-danger" aria-label: "delete task">'); // Adds delete button
    $(".delete").text("Delete"); // Adds text to delete button
    $(".delete").click(handleDeleteTask); // Assigns click event to button

    $(".task").draggable({ // Sets up task as draggable
      revert:"invalid",
      stack:".task",
      helper:"clone",
      containment:"document"
    });
    
    renderTaskColor(task); // Renders the appropriate color for task based on current date and task due date


}

function renderTaskColor(task) {
  if(task.taskProgress == "done-cards") { // If task has been completed, sets it to white with black text
    $("#" + task.taskID).removeClass("bg-warning bg-danger");
    $("#" + task.taskID).addClass("bg-light");

    $("#" + task.taskID).removeClass("text-white");
    $("#" + task.taskID).addClass("text-dark");
  }
  else if(dayjs().isAfter(task.taskDate, 'day')) { // If task is overdue, sets it to red with white text
    $("#" + task.taskID).removeClass("bg-warning bg-light");
    $("#" + task.taskID).addClass("bg-danger");
  
    $("#" + task.taskID).removeClass("text-dark");
    $("#" + task.taskID).addClass("text-white");
  }
  else if(Math.abs(dayjs().diff(task.taskDate, 'day')) < 1){ // if task is due within 1 day, sets it to yellow with white text
    $("#" + task.taskID).removeClass("bg-light bg-danger");
    $("#" + task.taskID).addClass("bg-warning");  

    $("#" + task.taskID).removeClass("text-dark");
    $("#" + task.taskID).addClass("text-white");
  }
}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  for(task of tasks) { // Iterate through all of the tasks
    let newTask = createTaskCard(task); // Creates new task card in the HTML
    renderTaskColor(task); // Picks appropriate color for task card
  }
  $(".task").draggable({ // Sets task to be draggable
    revert:"invalid",
    stack:".task",
    helper:"clone",
    containment:"document"
  });

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
    const newTask = { // Creates a new task object
        taskName:$('#title').val(),
        taskDate:$('#datepicker').datepicker({ dateFormat: 'dd-mm-yy' }).val(),
        taskDescription:$('#description').val(),
        taskID:generateTaskId(),
        taskProgress: "todo-cards"

    };
    tasks.push(newTask); // Adds new task object to local array
    localStorage.setItem("tasks", JSON.stringify(tasks)); //  Update array in local storage 
    $('#formModal').modal('hide'); // Hides the modal

    $('#taskForm')[0].reset(); // Clear form input

    createTaskCard(newTask); // Creates the task card HTML

}

$('#submitTask').click(function() { // Adds click event to submit task button
  handleAddTask();
})

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){
  const id = event.target.closest(".task").id; // Finds the next parent object with the class 'task'
  const index = tasks.findIndex(t => t.taskID == id); // Finds the index in the local task array of the task matching the ID of the HTML task element
  if(index>-1) { // Checks to make sure task exists in the array
    tasks.splice(index, 1); // If it does, we splice it out
  }
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Update the array in local storage so it no longer contains the deleted task
  event.target.closest(".task").remove(); // Removes the HTML of the task card that was clicked on


  
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let lane = event.target.querySelector("div"); // Gets a reference to the div element within the section the task was dropped into
  ui.draggable.detach().appendTo(lane); // Appends the HTML card to the new section
  const id = ui.draggable.attr("id"); // Gets reference to the ID of the task card HTML element
  const index = tasks.findIndex(function(task) { // Finds the index of the task object matching the ID of the HTML task card in the local array
    return task.taskID == id;
  });
  console.log(index);
  if(index > -1) { // If the task exists in the array, changes the taskProgress attribute to reflect what lane it was dropped in
    tasks[index].taskProgress = lane.id;
  }
  renderTaskColor(tasks.find(function(task) { // Changes the color of the task accordingly
    return task.taskID == id;
  }));
  localStorage.setItem("tasks", JSON.stringify(tasks)); // Updates the local array to ensure the progress of the task is saved

  


}

// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {

  init(); // Initializes array

  renderTaskList(); // Renders task list

  $('#datepicker').datepicker({ // Assigns date picker 
    changeMonth: true,
    changeYear: true,
  });

    $(".card-body").droppable({ // Makes the card-body elements droppable
      drop: function(event, ui) {
        handleDrop(event, ui);
      }
    });



});




  
  
