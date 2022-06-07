import PokemonClient from "./PokemonClient.js";
const pokemon = new PokemonClient();

export default class ItemManager {
    constructor() {
        this.tasks = [];
    }

    async add(item) {
            var regex=/^[0-9,]+$/;
            const pokemonsName = ['bulbasaur','ivysaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie'];
            if (item.match(regex) || pokemonsName.indexOf(item)!=-1) { //if input is nums & ',' or pokemon name from pokemonsName list
                await (this.pokemonFetch(item));
            }
            else { //if input is text
                this.tasks.push(item);
            }
            return this.tasks;
    }

    async pokemonFetch(item){
        await pokemon.pokemonCatch(item)
                    .then(res => {
                            res.map(value => this.tasks.push('Catch '+value));
                    })
                    .catch(err => {
                        this.tasks.push('At least one of the Pokemons ID '+item+' not found');
                    });
    }
}