const express = require('express')
const app = express();

const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const Database = require('./config/database')
const sequelize = require('./config/database')

// sequelize.authenticate().then(() => {
//     console.log("connection successful");
// }).catch(err => {
//     console.log('Unable to connect to the database', err);
// })

const adminRouter = require('./routes/admin')
const IndexRouter = require('./routes/index')
//connect to database
Database.connect((err) => {
    if (err) {
        throw err;
    } else {
        console.log("-----------------------------------------");
        console.log("Database connected Successful !");
        //session
        app.use(session({
            secret: 'secret',
            resave: true,
            saveUninitialized: true
        }));
        app.use(cookieParser())

        app.use(bodyParser.urlencoded({
            extended: true
        }));
        app.use(bodyParser.json());
        //app.use(Middleware)
        //use engine ejs to render page
        app.set("view engine", "ejs")

        //serve static css bootstrap
        app.use(express.static('style'))
        app.use(express.static('public'))
        //routes
        app.use('/admin',adminRouter) //adminPageRouter include auth middleware
        app.use('/',IndexRouter) //indexPageRouter
        require('./routes/logger')(app) //logger


        //listen
        const port = process.env.PORT || 3000
        app.listen(port, (err) => {
            if (err) throw err;
            else{
                console.log("-----------------------------------------");
                console.log("Server started on http://localhost:"+port);
                console.log("-----------------------------------------");
            }
            
        })
    }
})