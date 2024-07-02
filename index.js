const express = require('express');
const app = express();
const admin_loginRoutes = require('./routes/admin-loginRoutes');

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

//This is a new library called Body Parser. This system will parse the data
//from its internal JSon system to make request messages simpler.
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));



const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

app.get('/', function(req, res){
    res.render('index',{
        layout: 'layout',
        title: 'Barangay Parang - Initial Login Page',
        cssFile1: 'index',
        cssFile2: null,
        javascriptFile1: null,
        javascriptFile2: null,
    });
});

app.get('/index', function(req, res){
    res.render('index',{
        layout: 'layout',
        title: 'Barangay Parang - Initial Login Page',
        cssFile1: 'index',
        cssFile2: null,
        javascriptFile1: null,
        javascriptFile2: null,
    });
});


//login route
app.use(admin_loginRoutes);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening at port '+ port);
});