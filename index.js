const express = require('express');
const app = express();
const admin_loginRoutes = require('./routes/admin-loginRoutes');
const admin_tanodRoutes = require('./routes/admin-tanodRoutes');
const admin_luponRoutes = require('./routes/admin-luponRoutes');
const certificate_PrintingRoutes = require('./routes/certificate-printingRoutes');
const accounts_Routes = require('./routes/account-ManageRoutes');
const { registerHelpers } = require('./helpers/handlebarHelpers');

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

//helpers
registerHelpers();

//login route
app.use(admin_loginRoutes);

//admin tanod routes
app.use(admin_tanodRoutes);

//admin lupon routes
app.use(admin_luponRoutes);

//certofocate printing routes
app.use(certificate_PrintingRoutes);

//manage accounts
app.use(accounts_Routes);

const controllers = ['employee-tanod-lupon-routes']; //ung mga get eme nasa controller
for(var i=0; i<controllers.length; i++){
  const model = require('./controllers/'+controllers[i]);
  model.add(app);
}

const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening at port '+ port);
});