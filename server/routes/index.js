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
    }).then(function (acct) {
      res.json(acct);
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

    console.log( " ACCOUNTS : ", stripe.accounts );

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
  res.json("{ 'err' : ''Not Found' }");
});

module.exports = router;
