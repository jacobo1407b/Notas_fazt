const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const  methodOverride  =  require ('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//inicializacion
const app = express();
require('./database');
require('./config/passport');

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
defaultLayout: 'main',
layoutsDir: path.join(app.get('views'),'layouts'),
partialsDir: path.join(app.get('views'), 'partials'),
extname: '.hbs'
}));
app.set('view engine', '.hbs');

//midelwares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecreatapp',
    resave: true,
    saveUninitialized :  true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//globalvariables
app.use((req, res, next) =>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  res.locals.user = req.user || null;
  next();
});
//routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
//statics files

app.use(express.static(path.join(__dirname, 'public')));
//server is listeng
app.listen(app.get('port'), () =>{
  console.log('server on port', app.get('port'));
});
