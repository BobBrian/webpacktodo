// This is the Main Server for my Own Stuff.

const express = require("express");
const cors = require("cors");
const app = express();
const pool = require("./db"); 
const PORT  = process.env.PORT || 5000; // 5000 is the dedicated number of the port, its used in all the
//url for the RESTful Api functions GET, POST, PUT


//http://localhost:8081/
//http://localhost:8080 - This is the url created by the webpack development server so it is similar to the url provided
//by a deployment site

// The trick is that both the server and client have different origins so I need to call the origin of the client
// In the server side In order to make it work.

app.use(cors({
  origin: 'http://localhost:8080', // This origin will be the deployment url when moving to production
  optionsSuccessStatus: 200 
}))



app.use(express.json());

app.post("/todos",  async (req, res) => {
    try {
      const { description } = req.body;
      const newTodo = await pool.query( "INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);
     
      //res.json(newTodo.rows[0]);
      res.json({msg: 'This is CORS-enabled for all origins!'})
      
    } catch (err) {
      console.error(err.message);
    }
});
  
//get all todos
app.get("/todos", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM todo");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
});

//test cors
app.get("/todos/fake", async (req, res) => {
  try {
    res.json({msg: 'This is Not a CORS-enabled for all origins!'})
    
  } catch (err) {
    console.error(err.message);
  }
});
  
//get a todo
app.get("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);
      //res.json(todo.rows[0]);
      res.json({msg: 'This is CORS-enabled for all origins!'})
    } catch (err) {
      console.error(err.message);
    }
});
  
//update a todo 
app.put("/todos/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { description } = req.body;
      const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2",[description, id]);
      //res.json("Todo was updated!");
      res.json({msg: 'This is CORS-enabled for all origins!'})

    } catch (err) {
      console.error(err.message);
    }
});
  
//delete a todo
app.delete("/todos/:id",  async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);
      res.json("Todo was deleted!");
      //res.json({msg: 'This is CORS-enabled for all origins!'})
    } catch (err) {
      console.log(err.message);
    }
});

app.listen(PORT, () => {

 console.log(`Server is starting on port ${PORT}`);

});