class ItemManager {
    constructor() {
        this.tasks = [];
    }

    add(item) {
        if (item == '') {
            alert("You can't add an empty task");
        }
        else {
            var regex=/^[0-9,]+$/;
            const pokemonsName = ['bulbasaur','ivysaur','charmander','charmeleon','charizard','squirtle','wartortle','blastoise','caterpie'];
            if (item.match(regex) || pokemonsName.indexOf(item)!=-1) { //if input is nums & ',' or pokemon name from pokemonsName list
                this.pokemonFetch(item);
            }
            else { //if input is text
                this.tasks.push(item);
                render();
            }
        }
    }

    remove(index) {
        this.tasks.splice(index, 1);
        render();
    }

    removeAll() {
        this.tasks.length = 0;
        render();
    }

    pokemonFetch(item){
        pokemon.pokemonCatch(item)
                    .then(res => {
                        if (this.tasks.includes('Catch '+res)) { //prevents adding the same Pokemon
                            alert(res+' Pokemon is already in array');
                        }
                        else {
                            res.map(value => this.tasks.push('Catch '+value));
                            render();
                        }
                    })
                    .catch(err => {
                        this.tasks.push('At least one of the Pokemons ID '+item+' not found');
                        render();
                    });
    }

    sort() {
        this.tasks.sort();
        render();
    }

    alert(index) {
        alert(this.tasks[index]);
    }
}