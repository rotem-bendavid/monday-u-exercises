/*const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});*/

let input = document.querySelector(".newTask input");
const add = document.querySelector(".newTask button");
const tasksView = document.querySelector(".tasks");
const howManyTasks = document.querySelector(".bottom .howMany");
const showClearAll = document.querySelector(".bottom .clear");
const showSort = document.querySelector(".bottom .sort");

const pokemon = new PokemonClient();
const myTasks = new ItemManager();

//defult massege displayed when there are no tasks
const defultMassage = 'Please add your TO-DO List!';
howManyTasks.innerHTML = defultMassage;

//add new tasks
add.addEventListener('click', () => { //recognize click on 'add' button
    myTasks.add(input.value);
    //render();
});

input.addEventListener('keypress', (event) => { //recognize pressing enter key
    if (event.keyCode === 13) {
        event.preventDefault();
        myTasks.add(input.value);
    }
});

function render() {
    showTasks();
    updateBottom();
}

//show the tasks
function showTasks() { //adds new task to tasks array and adds it to html
    let newLiTag = '';
    myTasks.tasks.forEach((element, index) => {
        newLiTag += '<li onClick="myTasks.alert('+index+')">'+element+'<span onClick="myTasks.remove('+index+');event.stopPropagation();render();"><img src="images/delete_icon.svg"></span></li>';
    });
    tasksView.innerHTML = newLiTag;
    input.value = ""; //clears the input after adding task
}

//updates the bottom
function updateBottom() { //modify the amount of tasks displayed
    if (myTasks.tasks.length >= 1) {
        let newSpan = '';
        newSpan = '<span>You have '+myTasks.tasks.length+' pending tasks</span>'
        howManyTasks.innerHTML = newSpan;
        if (myTasks.tasks.length === 1) { //display clear all button only when there are tasks
            showClearAll.style = 'display: block';
            showSort.style = 'display: block';
        }
    }
    else { //delete clear all button when there aren't tasks
        showClearAll.style = 'display: none';
        showSort.style = 'display: none';
        howManyTasks.innerHTML = defultMassage;
    }
}

