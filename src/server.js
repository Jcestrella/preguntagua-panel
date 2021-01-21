const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const uuid = require('uuid/v4');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const Handlebars = require('handlebars');
const bodyParser = require('body-parser');

//Initializations
const app = express();
require('./config/passport');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

//Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
const hbs = exphbs.create({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    extname: '.hbs',

    helpers: {
        list: function(value){
            if(value == 1){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Microorganismos acua." + "</p>"
            }else if(value == 2){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Calidad del agua" + "</p>" 
            }else if(value == 3){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Eco. Org. Acua." + "</p>"
            }else if(value == 4){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Ecología costera" + "</p>"
            }else if(value == 5){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Hidrogeología" + "</p>"
            }else if(value == 6){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Contaminantes" + "</p>"
            }else if(value == 7){
                return '<p style="background-color: rgba(206, 206, 9, 0.781);">' + "Comodín" + "</p>"
            }
        }
    }
});
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

//Middlewares
app.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));
const storage = multer.diskStorage({
    destination : path.join(__dirname, 'public/img/uploads'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({
    storage
}).single('image'));

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});

//Routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/notes.routes'));
app.use(require('./routes/users.routes'));
//app.use(require('./routes/apiquestions.routes'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;