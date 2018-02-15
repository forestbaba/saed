// var crypto = require('crypto');
// var rand = require('csprng');
var saedgroup = require('../model/saed_group');


//exports.register = function (email, password, callback)
exports.registerSaedGroup = function (companyname, companycategory, company_address, company_state, company_localgovernment_locations, company_email) {
    console.log('about to start something');

    // if (companyname != null && category != null) {
    if (companyname !== null && companycategory !== null) {

        console.log('staring---');

        console.log('stage 2....');
        var newsaedgroup = new saedgroup({
            companyname: companyname,
            companycategory: companycategory,
            company_address: company_address,
            company_state: company_state,
            company_localgovernment_locations:

            company_localgovernment_locations,
            company_email: company_email
        });

        console.log('stage 3....');

        saedgroup.find({companyname: companyname}, function (err, sg)
        {

            console.log('inside critical now...');

            var len = sg.length;
            if(err)
            {
                //response.jsonp(err);
               // callback(err);
                throw err;
            }

            if (len === 0) {
                newsaedgroup.save(function (err) {
                     console.log('SAED group Sucessfully Registered');


                    //callback({'response': "SAED group Sucessfully Registered"});

                });
            }
            else {
                console.log('Company name is already Associated with another Account.');
                //callback({'response': "Company name is already Associated with another Account."});

            }
        });

    } else {
        callback({'response': "Invalid Credentials"});
    }


}