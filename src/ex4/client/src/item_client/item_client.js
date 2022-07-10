export default class ItemClient {
    constructor() {
        this.API_BASE = 'http://localhost:8000'; 
    }

    static async getTodos(){
        const response = await fetch('/get');
        let result = await response.json();
        return result;
    }

    static async addTodo(newTodoValue) {
        if (newTodoValue == '') {
            alert("You can't add an empty task");
        }
        else {
            const response = await fetch(`/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({todoValue : newTodoValue})
            })
        }
    }

    static async deleteTodo(todoIdToDelete) {
        const response = await fetch(`/`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({todoValue : todoIdToDelete})
        })
    }

    static async changeStatus(todoIdToChangeStatus) {
        const response = await fetch(`/`, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({todoValue : todoIdToChangeStatus})
        })
    }

}
