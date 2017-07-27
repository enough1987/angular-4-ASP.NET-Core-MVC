var express = require('express');

var router = express.Router();


const baseurl = "http://localhost:3000";


const PAYPAl_Client_ID = "AVJb36ZkKBvzz7cKx0e5gaW3bLEW76rOmy7iaOs4fJ05tUP6LzOHsagV1Nl9yQNVfThmVrDF_cw6EovR"; //  sandbox
//const PAYPAl_Client_ID = "AVJb36ZkKBvzz7cKx0e5gaW3bLEW76rOmy7iaOs4fJ05tUP6LzOHsagV1Nl9yQNVfThmVrDF_cw6EovR"; // sanbox
//const PAYPAl_Client_ID = "AWERYEBk8TkDI_ZS8tGdBXdmY5jOsa9tNwDXylpJ0pUwbEzUGyHHYVkMRRdi_isIB132zv7N6EHWdEBE"; // live

const PAYPAl_Client_SECRET = "EMZYaqV4VfiPfrBCVPZOsZAi17KJsLqIiQHRMiIRwd6MNEQnoCOlPItkfXEwk4ihxVMxdX3xC8TgYBts"; // sandbox
//const PAYPAl_Client_SECRET = "EMZYaqV4VfiPfrBCVPZOsZAi17KJsLqIiQHRMiIRwd6MNEQnoCOlPItkfXEwk4ihxVMxdX3xC8TgYBts"; // sandbox
//const PAYPAl_Client_SECRET = "EKzPguIcTMP6d4DaMmyoSiFAhVG_S2Bt4W_Y9kMl1QM1zbf5ysviXIpxPkRYit4Osj33-LClnpWzYT_d"; // live 

const paypalMode = "sandbox";

const paypal = require('paypal-rest-sdk');


const configureOpenid = () => {
  paypal.configure({
    'mode': paypalMode,
    'openid_client_id': PAYPAl_Client_ID,
    'openid_client_secret': PAYPAl_Client_SECRET,
    'openid_redirect_uri': 'http://localhost:4200/paypal/payout'
  });
};


// step 1
router.post('/api/paypal/authorizeUrl', function (req, res, next) {
  try {

    configureOpenid();
    const openIdConnect = paypal.openIdConnect;
    const authorizeUrl = openIdConnect.authorizeUrl({ 'scope': 'openid profile email https://uri.paypal.com/services/expresscheckout' });
    console.log( authorizeUrl );
    res.json({ authorizeUrl: authorizeUrl });

  } catch (err) {
    res.json(err);
  }
});

// step 2
router.post('/api/paypal/tokeninfoCreate', function (req, res, next) {
  try { 

    configureOpenid();
    const openIdConnect = paypal.openIdConnect;
    openIdConnect.tokeninfo.create(req.body.code, function (error, tokeninfo) {
      if (error) {
        res.json(error);
      } else {
        openIdConnect.userinfo.get(tokeninfo.access_token, function (error, userinfo) {
          if (error) {
            res.json(error);
          } else {
            res.json({ tokeninfo: tokeninfo, userinfo: userinfo });
          }
        });
      }
    });

  } catch (err) {
    res.json(err);
  }
});


router.post('/api/paypal/payout', function (req, res, next) {
  try {

    paypal.configure({
      'mode': paypalMode, //sandbox or live
      "client_id": PAYPAl_Client_ID,  // your paypal application client id
      "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
    });

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
            "currency": "USD"  // req.body.currency || "USD"
          },
          "note": "Thank you",
          "sender_item_id": + new Date,
          "receiver": req.body.email
        }
      ]
    };

    paypal.payout.create(create_payout_json, function (error, payout) {
      if (error) {
        res.json(error.response);
      } else {
        res.json(payout);
      }
    });

  } catch (err) {
    res.json(err);
  }
});



router.all('/*', function (req, res) {
  res.json("{ 'err' : 'Not Found' }");
});

module.exports = router;
