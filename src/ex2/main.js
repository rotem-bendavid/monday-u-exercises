let todoInput = document.querySelector(".newTask input");
const addTodo = document.querySelector(".newTask button");
const tasksView = document.querySelector(".tasks");
const howManyTasks = document.querySelector(".bottom .howMany");
const clearAllButton = document.querySelector(".bottom .clear");
const sortButton = document.querySelector(".bottom .sort");

const pokemon = new PokemonClient();
const myTasks = new ItemManager();

//defult massege displayed when there are no tasks
const massageWhenNoTasks = 'Please add your TO-DO List!';
howManyTasks.innerHTML = massageWhenNoTasks;

//add new tasks
addTodo.addEventListener('click', () => { //recognize click on 'add' button
    myTasks.add(todoInput.value);
});

todoInput.addEventListener('keypress', (event) => { //recognize pressing enter key
    if (event.keyCode === 13) {
        event.preventDefault();
        myTasks.add(todoInput.value);
    }
});

//render tasks
function render() {
    showTasks();
    updateNumOfTasksAndButtons();
}

//show the tasks
function showTasks() { //adds new task to tasks array and adds it to html
    let todos_LiTags = '';
    myTasks.tasks.forEach((element, index) => {
        todos_LiTags += 
            '<li onClick="myTasks.alert('+index+')">'+element+'<span onClick="myTasks.remove('+index+');event.stopPropagation();render();"><img src="images/delete_icon.svg"></span></li>';
    });
    tasksView.innerHTML = todos_LiTags;
    todoInput.value = ""; //clears the input after adding task
}

//updates the bottom
function updateNumOfTasksAndButtons() { //modify the amount of tasks displayed
    if (myTasks.tasks.length >= 1) {
        let newSpan = '';
        newSpan = '<span>You have '+myTasks.tasks.length+' pending tasks</span>'
        howManyTasks.innerHTML = newSpan;
        //display clear all button only when there are tasks
            clearAllButton.style = 'display: block';
            sortButton.style = 'display: block';
    }
    else { //delete clear all button when there aren't tasks
        clearAllButton.style = 'display: none';
        sortButton.style = 'display: none';
        howManyTasks.innerHTML = massageWhenNoTasks;
    }
}

