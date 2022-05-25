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
            if (item.match(regex)) { //if input is nums & ','
                if (item.indexOf(',')!=-1) { //if there are some pokemons
                    let arr = item.split(',');
                    arr = arr.filter(item=>item); //delete empty fields
                    arr.forEach(key => this.fetch(key))
                }
                else { //if there is only one pokemon
                    this.fetch(item);
                }
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

    fetch(item) {
        pokemon.pcatch(item)
                    .then(res => {
                        if (this.tasks.includes('Catch '+res)) { //prevents adding the same Pokemon
                            alert(res+' Pokemon is already in array');
                        }
                        else {
                            this.tasks.push('Catch '+res);
                            render();
                        }
                    })
                    .catch(err => {
                        this.tasks.push('Pokemon with ID '+item+' not found');
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