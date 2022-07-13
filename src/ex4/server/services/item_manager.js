const fs = require('fs').promises;
const pokemonAPI = require("../clients/pokemon_client.js");
const { Items } = require('../db/models');

async function getAll() {
    const items = await Items.findAll({attributes: ['item_name', 'item_status', 'item_id']});
    const itemsMap = items.map(value => ({id: value.item_id, todo: value.item_name, status: value.item_status}));
    return itemsMap;
}

async function addTodo(newTodo) {
    var regex=/^[0-9,]+$/;
    const pokemonsName = ['bulbasaur','ivysaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie'];
    if (newTodo.match(regex) || pokemonsName.indexOf(newTodo)!=-1) { //if input is nums & ',' or pokemon name from pokemonsName list
        const pokemonsCatched = await pokemonFetch(newTodo);
        if (pokemonsCatched) {
            const allTodos = await getAll();
            let allPokemonTodos = await Promise.all(pokemonsCatched.map(async value => {
                const alreadyExist = checkIfExist(value,allTodos);
                if (!alreadyExist) { //prevents adding the same Pokemon - validation
                    return await add(('Catch '+value));
                }
                else { 
                    console.error(`err: Pokemon ${value} already exist in list`) 
                    return null;
                }
            }));
            allPokemonTodos=allPokemonTodos.filter(n => {return n!=null}); //remove null values from pokemons that are already exist
            return allPokemonTodos; 
        }
        else {
            console.error(`err: At least one of the Pokemons ID ${newTodo} not found`);
            return [];
        }
    }
    else {
        return await add(newTodo);
    }
}

async function add(todoToAdd) {
    await Items.create({item_name: todoToAdd});
    const todoCreatedId = await Items.findOne({attributes: ['item_id'],where: { item_name: todoToAdd }}); 
    return {id: await todoCreatedId.item_id, todo: todoToAdd, status:false};
}

function checkIfExist(value,allTodos) { 
    return allTodos.find(item => item.todo === 'Catch '+value);
}

async function pokemonFetch(item){
    try {
        return await pokemonAPI.pokemonCatch(item);
    }
    catch (err) {
        console.error('err: wasn\'t able to catch pokemon');
    }
}

async function deleteTodo(todoId) { 
    await Items.destroy({where: { item_id: todoId }})
    return;
}

async function changeStatus(todoId) { 
    const prevCBValue = await Items.findOne({attributes: ['item_status'], where: {item_id: todoId}});
    let newCBValue = true;
    let newTimeStampValue = Date.now();
    if (prevCBValue.item_status) {
        newCBValue = false;
        newTimeStampValue = null;
    }
    await Items.update({item_status: newCBValue, status_updatedAt: newTimeStampValue} , {where: { item_id: todoId }});
    return;
}

module.exports = {
    getAll,
    addTodo,
    deleteTodo,
    changeStatus,
};