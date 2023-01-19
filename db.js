const mongoose=require('mongoose');
const mongoURI="mongodb://localhost/todopost";


const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('Connected to Mongo Succesfully')
    })
}

module.exports=connectToMongo;