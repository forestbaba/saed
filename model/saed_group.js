var mongoose = require('mongoose');
var schema = mongoose.Schema;
var mongodb = require('mongodb');

module.exports = mongoose.model('saed',
    {
        companyname: String,
        companycategory: String,
        company_address: String,
        company_state: String,
        company_localgovernment_locations: String,
        company_email: String,
        date: {type: Date, default: Date.now}
    });

