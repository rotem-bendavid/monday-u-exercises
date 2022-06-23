const axios = require('axios');
require('dotenv').config({ path: '../../.env' });

exports.pokemonCatch = async function (pokemonsId) {
    try {
        let pokemonIdArr = pokemonsId.split(',');
        pokemonIdArr = pokemonIdArr.filter(item=>item); //deletes empty fields
        const response = await Promise.all(
          pokemonIdArr.map(value =>axios.get(process.env.POKEMON_API+value))); //POKEMON_API FROM .ENV
        let results = await Promise.all(response.map(response=> response.data.name));
        return results;
    } catch (err) {
      console.log('err: wasn\'t able to catch pokemon in api');
    }
  }
 