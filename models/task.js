//require the library
const mongoose=require('mongoose');

//creating Schema for Tasks
const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    }
});


const Task=mongoose.model('Task',taskSchema)

//exporting Task model to use it in other files
module.exports=Task;