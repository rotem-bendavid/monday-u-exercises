const express = require('express');
var bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const todoRouter = require('./server/routes/todo_router');
const port = parseInt(process.env.PORT) || 8000; //PORT FROM .ENV
const app = express();

app.use([express.json()]);
app.use(bodyParser.urlencoded({extended : true}));

app.listen(port, () => {
    console.log("Server started on port", port);
});

//app.use(express.static(__dirname + "/dist"));
app.get("/", (req, res) => {
    //res.sendFile(__dirname + "/dist/index.html");
  });

app.use('/', todoRouter);