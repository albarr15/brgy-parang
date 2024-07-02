// testing
const { CertificateModel, UserModel, LuponCaseModel, TanodCaseModel } = require('./models/database/mongoose');

const express = require('express');

const app = express();

const handlebars = require('express-handlebars');
app.set('view engine', 'hbs');
app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}));

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log('Listening at port '+ port);
});