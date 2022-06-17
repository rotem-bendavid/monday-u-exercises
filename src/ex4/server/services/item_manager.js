const fs = require('fs').promises;
const todoFile = 'todo_list.json';
const pokemonAPI = require("../clients/pokemon_client.js");


async function readTodoFile() {
    try {
        const data = await fs.readFile(todoFile);
        return JSON.parse(data.toString());
    } catch (error) {
        console.error(`Got an error trying to read the file: ${error.message}`);
    }
}

async function writeTodoFile(content) {
    try {
        await fs.writeFile(todoFile, JSON.stringify(content));
    } catch (error) {
        console.error(`Failed to write to file ${error.message}`);
    }
}

async function getAll() {
    return await readTodoFile();
}

async function addTodo(newTodo) {
    let data = await readTodoFile();
    if (!data) {
        data = [];
    }

    var regex=/^[0-9,]+$/;
    const pokemonsName = ['bulbasaur','ivysaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie'];
    if (newTodo.match(regex) || pokemonsName.indexOf(newTodo)!=-1) { //if input is nums & ',' or pokemon name from pokemonsName list
        const pokemonsCatched = await pokemonFetch(newTodo);
        if (pokemonsCatched) {
            const allValues = await getAll();
            pokemonsCatched.map(value => {
                const alreadyExist = checkIfExist(value,allValues);
                if (!alreadyExist) {
                    data.push('Catch '+value)}
                else { console.error(`err: Pokemon ${value} already exist in list`) }
            });
        }
        else {
            data.push(`At least one of the Pokemons ID ${newTodo} not found`);
        }
    }
    else { //if input is text
        data.push(newTodo);
    }

    await writeTodoFile(data);
}

function checkIfExist(value,getAll) {
    if (Object.values(getAll).includes('Catch '+value)) { //prevents adding the same Pokemon
        return true;
    }
    return false;
}

async function pokemonFetch(item){
    try {
        return await pokemonAPI.pokemonCatch(item);
    }
    catch (err) {
        console.error('err: wasn\'t able to catch pokemon');
    }
}

async function deleteTodo(todoContent) { 
    const data = await getAll();
    const index = data.indexOf(todoContent);
    const deletedTodo = data[index];
    data.splice(index, 1);
    await writeTodoFile(data);
    return deletedTodo;
}

module.exports = {
    getAll,
    addTodo,
    deleteTodo,
};