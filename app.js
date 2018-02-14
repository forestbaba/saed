var express = require('express');
var mongoose = require ('mongoose');
var app = express();
var port = process.env.PORT || 7720;
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

var RegisterSaed = require('./routes/register_saed_group');
mongoose.connect(process.env.MONGODB_URI );

// mongoose.connect( 'mongodb://localhost:27017/CW');
var saedgroup = require('./model/saed_group');





var app = express();
app.use(expressValidator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// var PORT = 9000;

app.get('/home', function (req, res)
{
    res.json("We are Live");

});
app.post('/api/registernewsaed', function (req, res)
{

    var companyname = req.body.companyname;
    var companycategory = req.body.companycategory;
    var company_address = req.body.companyaddress;
    var company_email = req.body.companyemail;
    var company_state = req.body.company_state;
    var company_localgovernment_locations = req.body.company_localgovernment_locations;



    // req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('companyname', 'Company Name is required').notEmpty();
    req.checkBody('companycategory', 'Category is required').notEmpty();
    // req.checkBody('username', 'Username is required').notEmpty();
    // req.checkBody('phone', 'phone is not valid').notEmpty();
    req.checkBody('companyemail', 'Email is not valid').isEmail();
    //req.sanitize('email').normalizeEmail({ remove_dots: false });


    var newsaedgroup = new saedgroup({
        companyname: companyname,
        companycategory: companycategory,
        company_address: company_address,
        company_state: company_state,
        company_localgovernment_locations: company_localgovernment_locations,
        company_email: company_email
    });

    // Check for validation errors
    var errors = req.validationErrors();
    if (errors)
    {
        return res.status(400).send(errors);
    }
    else
    {



        saedgroup.find({companyname: companyname}, function (err, sg)
        {

            console.log('inside critical now...');

            var len = sg.length;

            if (len === 0) {
                newsaedgroup.save(function (err) {
                    console.log('SAED group Sucessfully Registered');
                    res.json('Saved');


                    //callback({'response': "SAED group Sucessfully Registered"});

                });
            }
            else {
                res.json('Company name is already Associated with another Account.');
                console.log('Company name is already Associated with another Account.');
                //callback({'response': "Company name is already Associated with another Account."});

            }
        });



    }
})

app.get('/api/registeredsaed', function(req, res) {
    saedgroup.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.send(userMap);
    });
});



app.listen(process.env.PORT || 7720, function()
{
    console.log('listening on: 9000')
});
