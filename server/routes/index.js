var express = require('express');

var router = express.Router();



const baseurl = "http://localhost:3000";

let PAYPAl_Client_ID = "AZmRj4HcRTwTtduwY6szT6ObAftuSeRjNzkXffGyXk8TsZvB5dwbT59swGUaaQMd6rbmPcOO_Obu8ufp"; // sandbox
//PAYPAl_Client_ID = "AWERYEBk8TkDI_ZS8tGdBXdmY5jOsa9tNwDXylpJ0pUwbEzUGyHHYVkMRRdi_isIB132zv7N6EHWdEBE"; // live

let PAYPAl_Client_SECRET = "EHorRh9gHPc6HdpfjEr3XIzsFLOkWgTdd83o3_80Qo3HfZ_vei42bLy84-tsE9cWWbwP5UXozG1cN5uw"; // sandbox
//PAYPAl_Client_SECRET = "EKzPguIcTMP6d4DaMmyoSiFAhVG_S2Bt4W_Y9kMl1QM1zbf5ysviXIpxPkRYit4Osj33-LClnpWzYT_d"; // live 


router.post('/api/paypal/user', function (req, res, next) {

  console.log(" ====== ");
  console.log(" User : ", req.body);
  console.log(" ====== ");

  const paypal = require('paypal-rest-sdk');

  //set configs for openid_client_id and openid_client_secret if they are different from your
  //usual client_id and secret. openid_redirect_uri is required
  // paypal auth configuration
  var config = {
    "port": 3000,
    "api": {
      // "host": "api.sandbox.paypal.com",
      'mode': 'sandbox', //sandbox or live
      "client_id": PAYPAl_Client_ID,  // your paypal application client id
      "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
    }
  }
  paypal.configure(config.api);

  paypal.authorization.get(req.body.token, function (error, authorization) {
    if (error) {
      console.error(error);
    } else {
      console.log(authorization);
    }
  });

});

router.post('/api/paypal/tokeninfo', function (req, res, next) {

  console.log(" ====== ");
  console.log(" User : ", req.body);
  console.log(" ====== ");

  const paypal = require('paypal-rest-sdk');

  var openIdConnect = paypal.openIdConnect;

  //set configs for openid_client_id and openid_client_secret if they are different from your
  //usual client_id and secret. openid_redirect_uri is required
  // paypal auth configuration
  var config = {
    "port": 3000,
    "api": {
      // "host": "api.sandbox.paypal.com",
      'mode': 'sandbox', //sandbox or live
      "client_id": PAYPAl_Client_ID,  // your paypal application client id
      "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
    }
  }
  paypal.configure(config.api);

  // Login url
  console.log(openIdConnect.authorizeUrl({ 'scope': 'openid profile' }));

  // With Authorizatiion code
  openIdConnect.tokeninfo.create(req.body.code, function (error, tokeninfo) {
    if (error) {
      console.log(" = > ", 1);
      console.log(error);
    } else {
      openIdConnect.userinfo.get(tokeninfo.access_token, function (error, userinfo) {
        if (error) {
          console.log(" = > ", 2);
          console.log(error);
        } else {
          console.log(" = > ", 3);
          console.log(tokeninfo);
          console.log(userinfo);
          res.json({ tokeninfo: tokeninfo, userinfo: userinfo });
          // Logout url
          //console.log(openIdConnect.logoutUrl({ 'id_token': tokeninfo.id_token }));
        }
      });
    }
  });

});

router.post('/api/paypal/verify', function (req, res, next) {

  console.log(" ====== ");
  console.log(" VERIFY : ", req.body);
  console.log(" ====== ");

  var request = require('request');

  paypal.authorization.get("99M58264FG144833V", function (error, authorization) {
    if (error) {
      console.error(error);
    } else {
      console.log(authorization);
    }
  });

});

router.post('/api/paypal/payout', function (req, res, next) {

  console.log(" PAYPAL : ");
  console.log(" ====== ");
  console.log(req.body);
  console.log(" ====== ");
  console.log(" access_token ", access_token);

  const paypal = require('paypal-rest-sdk');


  // paypal auth configuration
  var config = {
    "port": 3000,
    "api": {
      // "host": "api.sandbox.paypal.com",
      'mode': 'sandbox', //sandbox or live
      "client_id": PAYPAl_Client_ID,  // your paypal application client id
      "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
    }
  }
  paypal.configure(config.api);

  try {


    var sender_batch_id = Math.random().toString(36).substring(9);

    var create_payout_json = {
      "sender_batch_header": {
        "sender_batch_id": sender_batch_id,
        "email_subject": "You have a payout"
      },
      "items": [
        {
          "recipient_type": "EMAIL",
          "amount": {
            "value": req.body.amount,
            "currency": req.body.currency
          },
          "note": "Thank you",
          "sender_item_id": + new Date,
          "receiver": req.body.email  // "tilgaaleksandr-facilitator-3@gmail.com"
        }
      ]
    };

    paypal.payout.create(create_payout_json, function (error, payout) {
      console.log(error, payout);
      if (error) {
        console.log(error.response);
        res.json(error.response);
      } else {
        console.log("Create Payout Response");
        res.json(payout);
        //if( payout.links ) res.redirect(payout.links[0].href);
      }
    });


  } catch (err) {

    console.log(222222);
    console.log(err);
    res.json(err);

  }
});



router.all('/*', function (req, res) {
  res.json("{ 'err' : 'Not Found' }");
});

module.exports = router;
