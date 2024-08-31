const express = require('express');
const app = express(); //create application
const cors = require('cors');

// for different origins 
app.use(cors());

app.use(express.urlencoded({extended: true}));
app.use(express.json());

// define ports
// for how to respond to data from this port
// require: get the function from the file
// ./ => paths relative the the path of the file calling them, i.e. relative to location of server.js

// route “/api/auth” that will respond to a login request.
app.post('/api/login', require('./router/login'));

// route to create an account
app.post('/createAccount', require('./router/createAccount'));

// route to allow user who is loggied in to delete their account
app.post('/deleteAccount',require('./router/deleteAccount'));

// to send data.json to create dashboard
app.get('/dashboard', require('./router/dataToDashboards'));

const http = require('http').Server(app);
http.listen(3000, ()=>{
    console.log("Server listening on port 3000");
}
);
