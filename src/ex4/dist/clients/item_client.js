class ItemClient {
    constructor() {
        this.API_BASE = 'http://localhost:8000'; 
    }

    async getTodos(){
        const response = await fetch(`${this.API_BASE}`+'/get');
        let result = await response.json();
        return result;
    }

    async addTodo(newTodoValue) {
        if (newTodoValue == '') {
            alert("You can't add an empty task");
        }
        else {
            const response = await fetch(`${this.API_BASE}`+`/`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({todoValue : newTodoValue})
            })
        }
    }

    async deleteTodo(todoContentToDelete) {
        const response = await fetch(`${this.API_BASE}`+`/`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({todoValue : todoContentToDelete})
        })
    }

}
