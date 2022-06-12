import { Command } from "commander";
import { myLogger } from "./logger/logger.js";
import { readFile,writeFile,unlink } from 'fs';
import ItemManager from "./ItemManager.js";
const myTasks = new ItemManager();

function getCommanderProgram() {
  const program = new Command();

  program
    .name("todo-app")
    .description("Use the todo app to make to-do list + catch pokemons!")
    .version("1.0.0");

  program
    .command("add")
    .description("Add to-do to the list")
    .argument("<string>", "your TO-DO")
    .action(async (task) => {
      const tasks = await (myTasks.add(task));

      console.log(`New to-do add successfully `+JSON.stringify(tasks));
      tasks.map(value => myLogger.log(value));
    });

    program
    .command("get")
    .description("Get the to-do list")
    .action(async () => {
      readFile('./log.txt', 'utf8', (err, data) => {
        if (err || data==='') {
          console.log('err: No to-do tasks');
          return;
        }
        const dataArray = data.split('\n');
        dataArray.map(value => {if (value!='') console.log(value)});
      });
    });

    program 
    .command("delete")
    .description("Delete to-do from the list")
    .argument("<int>", "TO-DO number to delete")
    .action(async (index) => {
      readFile('./log.txt', 'utf8', function(err, data){
        if (err) throw err;
        const valuesArray = data.split('\n');
        if (valuesArray[index]!= undefined && valuesArray[index]!='') {
          const newData = data.replace(valuesArray[index]+'\n',"");
          writeFile('./log.txt', newData, 'utf8', function (err) {
            if (err) throw err;
            console.log('todo deleted successfully');
          });
        }
        else {
          console.log('err: Row value does not exist');
        }
      });
    });

    program
    .command("delete-all")
    .description("Delete all to-do from the list")
    .action(async () => {
        unlink('./log.txt', function (err) {
          if (err) throw err;
          console.log('All todo deleted successfully');
        })
    });

  return program;
}

const program = getCommanderProgram();
program.parse();