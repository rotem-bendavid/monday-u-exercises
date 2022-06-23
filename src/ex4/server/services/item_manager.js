const fs = require('fs').promises;
//const todoFile = 'todo_list.json';
const pokemonAPI = require("../clients/pokemon_client.js");
const { Items } = require('../db/models');

/*async function readTodoFile() {
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
}*/

async function getAll() {
    const items = await Items.findAll({attributes: ['item_name', 'item_status']});
    const itemsMap = items.map(value => ({todo: value.item_name, status: value.item_status}));
    return itemsMap;
}

async function addTodo(newTodo) {
    var regex=/^[0-9,]+$/;
    const pokemonsName = ['bulbasaur','ivysaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie'];
    if (newTodo.match(regex) || pokemonsName.indexOf(newTodo)!=-1) { //if input is nums & ',' or pokemon name from pokemonsName list
        const pokemonsCatched = await pokemonFetch(newTodo);
        if (pokemonsCatched) {
            const allValues = await getAll();
            await Promise.all(pokemonsCatched.map(async value => {
                const alreadyExist = checkIfExist(value,allValues);
                if (!alreadyExist) { //prevents adding the same Pokemon - validation
                    await add(('Catch '+value));
                }
                else { 
                    console.error(`err: Pokemon ${value} already exist in list`) 
                }
            }));
        }
        else {
            await add((`At least one of the Pokemons ID ${newTodo} not found`));
        }
    }
    else {
        await add(newTodo);
    }
}

async function add(todoToAdd) {
    await Items.create({ item_name: todoToAdd});
}

function checkIfExist(value,getAll) { 
    return getAll.find(item => item.todo === 'Catch '+value);
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
    await Items.destroy({where: { item_name: todoContent }})
    return;
}

async function changeStatus(todoContent) { 
    const prevCBValue = await Items.findOne({attributes: ['item_status'], where: {item_name: todoContent}});
    let newCBValue = true;
    let newTimeStampValue = Date.now();
    if (prevCBValue.item_status) {
        newCBValue = false;
        newTimeStampValue = null;
    }
    await Items.update({item_status: newCBValue, status_updatedAt: newTimeStampValue} , {where: { item_name: todoContent }});
    return;
}

module.exports = {
    getAll,
    addTodo,
    deleteTodo,
    changeStatus,
};