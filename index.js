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