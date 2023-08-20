//require the library
const mongoose=require('mongoose');

//connect to the database
mongoose.connect('mongodb+srv://raunak2709:raunak18@cluster0.po4gdqp.mongodb.net/?retryWrites=true&w=majority');

//aquire the connection (to check if it is successful)
const db= mongoose.connection;

//error
db.on('error',console.error.bind(console,"Error in connecting to MongoDB"));

//up and running then print the message
db.once('open',function(){
    console.log('Connected to Database');
});

//exporting the database
module.exports=db;