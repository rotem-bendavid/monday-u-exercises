class Main {
    constructor() {
        this.itemClient = new ItemClient();
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        let todoInput = document.querySelector(".list-controls input");
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

    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        const items = await this.itemClient.getTodos(); 

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.classList.add('list-item');
            listItem.innerHTML = item;

            const listItemDeleteButton = this._createDeleteButton(item);
            listItem.appendChild(listItemDeleteButton);
            list.appendChild(listItem);
        })
    }

    _createDeleteButton = item => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add('list-item-delete-button');
        button.addEventListener("click", _ => this.deleteItem(item));

        return button
    }
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});