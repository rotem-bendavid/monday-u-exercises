import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

export default class PokemonClient {
    constructor() {
        this.API_BASE = process.env.API;//'https://pokeapi.co/api/v2/pokemon/'
    }

    async pokemonCatch(pokemonsId) {
        let pokemonIdArr = pokemonsId.split(',');
        pokemonIdArr = pokemonIdArr.filter(item=>item); //delete empty fields
        const response = await Promise.all(pokemonIdArr.map(value => fetch(`${this.API_BASE}`+value+'/')));
        let results = await Promise.all(response.map(response=> response.json()));
        results = results.map(value => value.name);
        return results;
    }
}