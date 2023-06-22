const express = require('express');
const app = express();
const expHbs = require('express-handlebars');
const path = require('path');
const methodOverride = require('method-override');

//db
require('./connectDB')


//settings
app.set('port', process.env.PORT || 3001);
const hbs = expHbs.create({
    defaultLayout: 'main', //archivo
    layoutsDir: path.join(__dirname, 'views', 'layouts'), //ruta
    extname: '.hbs' //ext.
})
app.set('view engine', '.hbs')


//middlewares
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'))
app.use(express.static(path.join(__dirname, 'public')))


//routes
app.use(require('./routes/notes'))




app.listen(app.get('port'), ()=>{
    console.log('server on port', app.get('port'));
})