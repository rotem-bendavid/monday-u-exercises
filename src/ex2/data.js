class PokemonClient {
    constructor() {
        this.API_BASE = 'https://pokeapi.co/api/v2/pokemon/'
    }

    async pcatch(pokemonId) {
        const response = await fetch(`${this.API_BASE}`+pokemonId+'/')
        const result = await response.json()
        return (result.name);
    }
}
