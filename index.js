// testing
const { CertificateModel, UserModel, LuponCaseModel, TanodCaseModel } = require('./models/database/mongoose');

const express = require('express');
const app = express();

const certificate_PrintingRoutes = require('./routes/certificate-printingRoutes');

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

const bodyParser = require('body-parser');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

function errorFn(err){
    console.log('Error fond. Please trace!');
    console.error(err);
}

const { registerHelpers } = require('./helpers/handlebarHelpers');
//helpers
registerHelpers();

// Start the server
const mongoose = require('mongoose');

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

const controllers = ['employee-tanod-lupon-routes']; //ung mga get eme nasa controller
for(var i=0; i<controllers.length; i++){
  const model = require('./controllers/'+controllers[i]);
  model.add(app);
}

app.use(certificate_PrintingRoutes);

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening at port '+ port);
});