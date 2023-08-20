//require express to set up express server
const express = require('express');
const mongoose=require('mongoose');
//set up the port
const port=8000;

const router = express.Router();

// importing the DataBase
const db=require('./config/mongoose');

// importng the Schema For tasks
const Task = require('./models/task');

//using express
const app=express();

//using static files
app.use(express.static("./views"));
//to use encrypted data
app.use(express.urlencoded());


//set up the view engine
app.set('view engine','ejs');
app.set('views','./views');


// app.get('/',function(req,res){
//     Task.find({},function(err,task){
//         if(err){
//             console.log('Error in fetching tasks from db');
//             return;
//         }
//         return res.render('home',{
//             title:'Home',
//             task:task
//         });
//     });
// });

// //create a new task
// app.post('/create-task',function(req,res){

//     Task.create({
//         description:req.res.body.description,
//         category:req.body.category,
//         date:req.body.date
//     },function(err,newtask){
//         if(err){
//             console.log('Error in creating task',err);
//             return;
//         }
//         return res.redirect('back');
//     });
// });

// // deleting Tasks
// app.get('/delete-task', function (req, res) {
//     // get the id from query
//     var id = req.query;

//     // checking the number of tasks selected to delete
//     var count = Object.keys(id).length;
//     for (let i = 0; i < count; i++) {

//         // finding and deleting tasks from the DB one by one using id
//         Task.findByIdAndDelete(Object.keys(id)[i], function (err) {
//             if (err) {
//                 console.log('error in deleting task');
//             }
//         })
//     }
//     return res.redirect('back');
// });


// Fetch tasks using promises
app.get('/', function (req, res) {
    Task.find()
      .then(tasks => {
        return res.render('home', {
          title: 'Home',
          task: tasks,
        });
      })
      .catch(err => {
        console.log('Error in fetching tasks from db:', err);
        return res.status(500).send('Internal Server Error');
      });
  });
  
  // Create a new task
  app.post('/create-task', function (req, res) {
    Task.create({
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
    })
      .then(newTask => {
        return res.redirect('back');
      })
      .catch(err => {
        console.log('Error in creating task:', err);
        return res.status(500).send('Internal Server Error');
      });
  });
  
  // Deleting Tasks
  app.get('/delete-task', async function (req, res) {
    try {
      const idsToDelete = Object.keys(req.query);
  
      for (const id of idsToDelete) {
        await Task.findByIdAndDelete(id);
      }
  
      return res.redirect('back');
    } catch (err) {
      console.log('Error in deleting tasks:', err);
      return res.status(500).send('Internal Server Error');
    }
  });
    


app.listen(port,function(err){
    if (err) {
        console.log(`Error : ${err}`);
    }
    console.log(`Server is running on port : ${port}`);
});