var express = require('express');
var router = express.Router();

const STRIPE_PUBLIC_KEY = "pk_test_HRr0GJHQNM2hxAAT7kYtGWWR";
const STRIPE_SECRET_KEY = "sk_test_gQzFE3e6cDoXEyHDwdRKQ43l";

let PAYPAl_Client_ID = "ATZATG4t7Yx7AbsVaDN9qVjNtZrLFMErsdfuWG6EFBP52t0Izpqb41e0CIWgtk0x1QfS3eSYzVtPUWLz"; // sandbox
PAYPAl_Client_ID = "AWERYEBk8TkDI_ZS8tGdBXdmY5jOsa9tNwDXylpJ0pUwbEzUGyHHYVkMRRdi_isIB132zv7N6EHWdEBE"; // live

let PAYPAl_Client_SECRET = "EMEZ94VttTURqBblKftZAgNhHVk_qZ_NxHJ0nsSQQnGnCAkyEJpMykREu6gTmjE-7jWTc9NXGy8DzaKr"; // sandbox
PAYPAl_Client_SECRET = "EKzPguIcTMP6d4DaMmyoSiFAhVG_S2Bt4W_Y9kMl1QM1zbf5ysviXIpxPkRYit4Osj33-LClnpWzYT_d"; // live 
const baseurl = "http://localhost:3000";
/* var testCard = {
  "number": '4000056655665556',
  "exp_month": 12,
  "exp_year": 2018,
  "cvc": '123'
}; */

const paypal = require('paypal-rest-sdk');

// paypal auth configuration
var config = {
  "port": 3000,
  "api": {
    "host": "api.sandbox.paypal.com",
    'mode': 'live', // sandbox', //sandbox or live
    "client_id": PAYPAl_Client_ID,  // your paypal application client id
    "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
  }
}
paypal.configure(config.api);


router.post('/api/paypal/payout', function (req, res, next) {

  console.log(" PAYPAL ");

  try {

    var sender_batch_id = Math.random().toString(36).substring(9);

    var create_payout_json = {
      "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payment"
      },
      "items": [
        {
          "recipient_type": "EMAIL",
          "amount": {
            "value": "1.00",
            "currency": "USD"
          },
          "note": "Thanks for your patronage!",
          "sender_item_id": "201403140001",
          "receiver": "tom.vidolov@gmail.com"
        }
      ]
    };

    var sync_mode = 'true';

    paypal.payout.create(create_payout_json, sync_mode, function (error, payout) {
      if (error) {
        console.log(error.response);
        res.json(error.response);
      } else {
        console.log("Create Payout Response");
        res.json(payout);
      }
    });

  } catch (err) {

    console.log(222222);
    console.log(err);
    res.json(err);

  }
});


router.get('/api/stripe/payout', function (req, res, next) {
  console.log(" STRIPE PAYOUT ", req.query);
  try {

    var stripe = require("stripe")(STRIPE_SECRET_KEY);


    stripe.accounts.create({
      country: "US",
      type: "custom",
      default_currency: "usd",
      external_account: req.query.token
    }).then((account) => {
      console.log(111111)
      stripe.charges.create({
        amount: req.query.amount, // * 100,
        currency: "usd",
        source: "tok_visa",  //req.query.token, 
        destination: {
          account: account.id
        }
      }).then(function (charge) {
        console.log(333333);
        res.json(charge);
      }, function (err) {
        console.log(444444);
        res.json(err);
      });
    });


  } catch (err) {

    console.log(222222);
    console.log(err);
    res.json(err);

  }
});


router.get('/api/stripe/charge', function (req, res, next) {
  console.log(" STRIPE CHARGE ", req.query);
  try {

    var stripe = require("stripe")(STRIPE_SECRET_KEY);

    stripe.accounts.create({
      country: "US",
      type: "custom"
    }).then((account) => {
      stripe.charges.create({
        amount: 818181 * 100,
        currency: "usd",
        source: req.query.token
      }).then(function (charge) {
        console.log(555555, charge);
        res.json(charge);
      }, function (err) {
        console.log(666666);
        res.json(err);
      });
    });

  } catch (err) {

    console.log(222222);
    console.log(err);
    res.json(err);

  }
});

router.get('/api/stripe/list', function (req, res, next) {
  var stripe = require("stripe")(STRIPE_SECRET_KEY);
  stripe.accounts.list((err, accounts) => {
    res.json(accounts);
    //console.log( " List all connected accounts ", accounts );
  });
});


router.get('/api/stripe/payout2', function (req, res, next) {
  var stripe = require("stripe")(STRIPE_SECRET_KEY);
  // Get the card details submitted by the form
  var token = req.query.token; // Using Express

  // Create a Recipient
  stripe.accounts.create({
    country: "US",
    type: "custom"
  }).then(function (acct) {
    console.log(" 000000 ", acct);
    // Create a payout to the specified recipient
    stripe.payouts.create({
      amount: 1000, // amount in cents
      currency: "usd",
      statement_descriptor: "JULY SALES"
    }, function (err, payout) {
      if (err) return res.json(err);
      res.json(payout);
      // recipient;
    });

  });
});


router.all('/*', function (req, res) {
  res.json("{ 'err' : 'Not Found' }");
});

module.exports = router;
