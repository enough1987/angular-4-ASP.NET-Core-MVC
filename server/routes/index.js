var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/api/stripe/create', function (req, res, next) {
  console.log(" STRIPE ", req);
  try {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_live_AHGgGmJgpGyRDvLXgjftf07J");
    stripe.accounts.create({
      country: "US",
      type: "custom"
    }).then(function (acct) {
      res.json(acct);
    });
  } catch (err) {
    res.json(err);
  }
});
router.get('/api/stripe/process', function (req, res, next) {
  console.log(" STRIPE ", req.query.id, req);
  try {
    // Set your secret key: remember to change this to your live secret key in production
    // See your keys here: https://dashboard.stripe.com/account/apikeys
    var stripe = require("stripe")("sk_live_AHGgGmJgpGyRDvLXgjftf07J");
    stripe.charges.create({
      amount: 50,
      currency: "usd",
      source: "tok_visa",
      destination: {
        account: req.query.id,
      },
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
