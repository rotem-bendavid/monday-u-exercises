class Main {
    constructor() {
        this.itemClient = new ItemClient();
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        let todoInput = document.querySelector(".newTask input");
        addItemButton.addEventListener("click", (event) => {
            this.handleItem(todoInput.value);
            todoInput.value = ""; //clears the input after adding task
        });

        todoInput.addEventListener('keypress', (event) => { //recognize pressing enter key
            if (event.keyCode === 13) {
                this.handleItem(todoInput.value);
                todoInput.value = ""; //clears the input after adding task
            }
        });

        await this.renderItems(); // render todos at the beggining
    }

    handleItem = async (todoInput) => {
        await this.itemClient.addTodo(todoInput);
        await this.renderItems();
    }

    deleteItem = async item => {
        await this.itemClient.deleteTodo(item);
        await this.renderItems();
    }

    changeCBStatus = async item => {
        await this.itemClient.changeStatus(item);
    }

    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        const items = await this.itemClient.getTodos(); 

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add('list-item');
            listItem.onclick = function() {
                (alert(item.todo)); //on to-do click shows alert
            }
            listItem.innerHTML = item.todo;

            const listItemCheckbox = this._createCheckbox(item);
            listItemCheckbox.classList.add('list-item-status');

            const listItemDeleteButton = this._createDeleteButton(item);
            listItemDeleteButton.classList.add('list-item-delete');
            listItem.appendChild(listItemDeleteButton);
            listItem.appendChild(listItemCheckbox);
            list.appendChild(listItem);
        })
    }

    _createCheckbox = item => {
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        if (item.status) {
            checkBox.checked = true;
        }
        checkBox.classList.add('list-item-status-checkbox');
        checkBox.addEventListener('change', _ => this.changeCBStatus(item.todo));
        checkBox.onclick = function() {
            event.stopPropagation();
        }
        
       return checkBox;
    }

    _createDeleteButton = item => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(item.todo));
        button.onclick = function() {
            event.stopPropagation();
        }
        return button;
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});