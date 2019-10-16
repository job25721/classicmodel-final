const express = require('express')
const app = express();

const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Database = require('./config/database')

const Middleware =require('./middleware/loggerMiddleware')


//connect to database
Database.connect((err)=>{
    if(err) {
        throw err;
    }else{
        console.log("Connected to database!!");
    }
})

//session
app.use(session({
	secret: 'secret',
	resave: true,
    saveUninitialized: true
}));
app.use(cookieParser())

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(Middleware)
//use engine ejs to render page
app.set("view engine","ejs")


//routes
require('./routes/pages')(app) //pages routes
require('./routes/logger')(app) //logger

//serve static css bootstrap
app.use(express.static('style'))
app.use(express.static('public'))




//listen
const port = process.env.PORT || 3000
app.listen(port,(err)=>{
    if(err) throw err;
    console.log("server started on PORT "+port);
})