var express = require('express');
var router = express.Router();

var STRIPE_SECRET_KEY = "sk_live_AHGgGmJgpGyRDvLXgjftf07J";

/* GET home page. */
router.get('/api/stripe/create', function (req, res, next) {
  console.log(" STRIPE CREATE ");
  try {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")(STRIPE_SECRET_KEY);
    stripe.accounts.create({
      country: "GB",
      type: "custom"
        /*
  
  "external_account"
  "legal_entity.dob.day"
  "legal_entity.dob.month"
  "legal_entity.dob.year"
  "legal_entity.first_name"
  "legal_entity.last_name"
  "legal_entity.type"
  "tos_acceptance.date"
  "tos_acceptance.ip"
  
  */

      }).then(function (acct) {
        res.json(acct);
      });

      // Create a new customer and then a new charge for that customer:
stripe.customers.create({
  email: 'foo-customer@example.com'
}).then(function(customer){
  return stripe.customers.createSource(customer.id, {
    source: {
       object: 'card',
       exp_month: 10,
       exp_year: 2018,
       number: '4242 4242 4242 4242',
       cvc: 100
    }
  });
}).then(function(source) {
  return stripe.charges.create({
    amount: 1600,
    currency: 'usd',
    customer: source.customer
  });
}).then(function(charge) {
  // New charge created on a new customer
}).catch(function(err) {
  // Deal with an error
});

  } catch (err) {
    res.json(err);
  }
});
router.get('/api/stripe/process', function (req, res, next) {
  console.log(" STRIPE ", req.query.id);
  try {

    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")(STRIPE_SECRET_KEY);

    console.log(" ACCOUNTS : ", stripe.accounts);

    stripe.charges.create({
      amount: 55,
      currency: "gbp",
      source: req.query.id, //"tok_visa", 
      destination: {
        account: req.query.id,
      }

    }).then(function (charge) {
      res.json(charge);
    });
  } catch (err) {
    res.json(err);
  }

});
router.all('/*', function (req, res) {
  res.json("{ 'err' : 'Not Found' }");
});

module.exports = router;
