const express = require('express');
const Todo = require('../models/todo');
const router=express.Router();
const { body, validationResult } = require("express-validator");

router.post('/addTask', [
  body('todoTask', 'Enter a valid todoTask').isLength({ min: 1 }),
 ],(req,res)=>{ 
    try{
         const errors = validationResult(req);
          if (!errors.isEmpty()) {
              return res.status(400).send({ errors: errors.array() });
          }
      const todo =Todo(req.body);
      todo.save()
      res.send(req.body)
    }
    catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
       
       
  
})

router.get("/getallTodo",  async (req, res) => {
    const data = await Todo.find({}, {__v:0});
    res.send(data);
  });

  router.delete("/deletetodo/:id",async (req, res) => {
    try {
      let todo =await Todo.findById(req.params.id);
      if(!todo){return res.status(401).send("Not found")};
      todo = await Todo.findByIdAndDelete(req.params.id);
      res.json({"Succes":"Note has been deleted",todo:todo});
    } catch (error) {
      console.log(error)
      res.status(500).send("Internal Server Error");
    }

});


module.exports=router