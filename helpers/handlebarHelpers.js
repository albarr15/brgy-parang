const handlebars = require('handlebars');

// Registering a custom helper to check the status
const registerHelpers = () => {
    handlebars.registerHelper('checkStatus', function(status, options) {
        if (status === 'Resolved') {
            return options.fn(this); // Executes the {{#if}} block
        } else {
            return options.inverse(this); // Executes the {{else}} block
        }
    });

    handlebars.registerHelper('unless_checkStatus', function(status, options) {
        if (status !== 'Resolved') {
            return options.fn(this); // Executes the {{#unless}} block
        } else {
            return options.inverse(this); // Executes the {{else}} block
        }
    });
    
    handlebars.registerHelper('fullName', function(firstName, middleInitial, lastName) {
        return `${firstName} ${middleInitial}. ${lastName}`;
    });

    handlebars.registerHelper('checkRole', function(role, options) {
        if (role === 'admin') {
            return options.fn({ roleText: 'Administrator' });
        } else if (role === 'employee') {
            return options.fn({ roleText: 'Employee' });
        } else if (role === 'tanod') {
            return options.fn({ roleText: 'Tanod' });
        } else {
            return options.fn({ roleText: 'Lupon' });
        }
    });
};




module.exports = {
    registerHelpers
};