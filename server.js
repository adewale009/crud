const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyparser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

const app = express();

// port and dotenv
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

// log requests
app.use(morgan('tiny'))

//  mongodb connection
connectDB();

//  parse request to body parser
app.use(bodyparser.urlencoded({extended: true}))

//  set view engine
app.set("view engine", "ejs")
app.use(express.static('public'))
// app.use('/public', express.static(path.join(__dirname, "public")));

// when ejs is in diff folder or subfolder
// app.set('views'.path.resolve(__dirname, "views/ejs"));
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// load assests
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));
app.use('/img', express.static(path.join(__dirname, 'public/img')));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, ()=> {console.log(`Server is running on http://localhost:${PORT}`)});