const mongoose =require('mongoose');
const { Schema } = mongoose;

const TodoSchema=new Schema({
    todoTask:{
        type:String,
        require:true
    }

})

module.exports=mongoose.model('todos',TodoSchema)