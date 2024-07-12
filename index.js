const express = require('express');
const app = express();



const { registerHelpers } = require('./helpers/handlebarHelpers');
const certificate_PrintingRoutes = require('./routes/certificate-printingRoutes');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));



const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

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

//helpers
registerHelpers();









const controllers = ['employee-tanod-lupon-routes']; //ung mga get eme nasa controller
for(var i=0; i<controllers.length; i++){
  const model = require('./controllers/'+controllers[i]);
  model.add(app);
}

//certofocate printing routes
app.use(certificate_PrintingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening at port '+ port);
});