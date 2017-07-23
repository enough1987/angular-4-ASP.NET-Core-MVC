var express = require('express');

var router = express.Router();


let STRIPE_PUBLIC_KEY = "pk_test_HRr0GJHQNM2hxAAT7kYtGWWR";
STRIPE_PUBLIC_KEY = "pk_live_8lalIH22Uy2EuumE8x6aQfsW";

let STRIPE_SECRET_KEY = "sk_test_gQzFE3e6cDoXEyHDwdRKQ43l";
STRIPE_SECRET_KEY = "sk_live_AHGgGmJgpGyRDvLXgjftf07J";


const baseurl = "http://localhost:3000";
/* var testCard = {
  "number": '4000056655665556',
  "exp_month": 12,
  "exp_year": 2018,
  "cvc": '123'
}; */



////////////// WS 

//const server = require('http').createServer();


console.log(' WS ');


function getSession(sessionId, mult ) {
  let sessions = inMemoryDB.sessions.filter((session) => {
    if (session.sessionId == sessionId) return true;
  });
  if ( mult ) return sessions;
  let latest = 0, timeStamp = 0 ;
  sessions.forEach( (session, idx) => {
    if( session.timeStamp > timeStamp ) {
      letest = idx;
      timeStamp = session.timeStamp;
    }
  });
  return sessions[latest];
}

function getSessionProp(sessionId, prop) {
  let session = getSession(sessionId);
  console.log(  sessionId, prop, session )
  if (!session) return [];
  if (!session[prop]) session[prop] = []
  return session[prop];
}

let inMemoryDB = [];
inMemoryDB.sessions = [];
for (let i = 0; i < 10; i++) {
  inMemoryDB.sessions.push({ 
    sessionId: Math.random().toString(36).substring(10) , 
    type: Math.round(Math.random() * 100) + 1 > 50 ? 'active' : 'closed' , 
    timeStamp: + new Date() ,
  });
}
for (let i = 0; i < 5; i++) {
  for (let j = 0; j < 10; j++) {
    let value = " rend <span style='color:red' > " + Math.random().toString(36).substring(9) + " </span>";
    let value2 = " test <span style='color:blue' > " + Math.random().toString(36).substring(9) + " </span";
    if ( !inMemoryDB.sessions[j].logs ) inMemoryDB.sessions[j].logs = [];
    if ( !inMemoryDB.sessions[j].states ) inMemoryDB.sessions[j].states = [];
    inMemoryDB.sessions[j].logs.push({ sessionId: inMemoryDB.sessions[j].sessionId, value: value });
    inMemoryDB.sessions[j].states.push({ sessionId: inMemoryDB.sessions[j].sessionId, value: value2 });
  }
}

const io = require('socket.io')(3001, {
  path: '/',
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
});

io.on('connection', (socket) => {
  
  try {

    console.log(" - connection - ", inMemoryDB.sessions.length );
    socket.emit('sessions', { sessions: inMemoryDB.sessions });

    socket.on('session', (sessions) => {
      if (!sessions || !Array.isArray(sessions)) return;
      sessions.forEach((session) => {
        let _sessions = getSession(session.sessionId, true);
        _sessions.forEach((_session) => {
          if ( _session.type == 'active' ) _session.type = 'closed';
        });
        session.timeStamp = +new Date();
        console.log( " NEW session : ", session );
        if( session.sessionId ) inMemoryDB.sessions.unshift(session);
      });
      console.log(" sessions : " , inMemoryDB.sessions.length);
      socket.emit('update', { update: 'sessions', items: sessions });
    });

    socket.on('log', (logs) => {
      console.log(' log ', logs );
      if (!logs || !Array.isArray(logs) || !logs[0]) return;
      console.log(" ---> ", logs[0]);
      session = getSession(logs[0].sessionId);
      console.log(" session ", session);
      if (!session) return;
      if (!session.logs) session.logs = [];
      session.logs.unshift(...logs);
      console.log(' logs: ', session.logs.length);
      // socket.emit('logs', { logs: inMemoryDB.logs });
      socket.emit('update', { update: 'logs', sessionId: logs[0].sessionId , items: logs });
    });

    socket.on('state', (states) => {
      console.log(' state ', states);
      if (!states || !Array.isArray(states) || !states[0]) return;
      session = getSession(states[0].sessionId);
      console.log(" session ", session);
      if (!session) return;
      if (!session.states) session.states = [];
      session.states.unshift(...states);
      console.log(' state: ', session.states.length);
      // socket.emit('states', { states: inMemoryDB.states });
      socket.emit('update', { update: 'states', sessionId: states[0].sessionId , items: states });
    });

  } catch (err) {
    console.log(err);
  }

});

////////////// WS 


router.get('/api/stripe/charge', function (req, res, next) {
  console.log(" STRIPE CHARGE ", req.query);
  try {

    var stripe = require("stripe")(STRIPE_SECRET_KEY);

    stripe.accounts.create({
      country: req.query.country,
      type: "custom"
    }).then((account) => {
      console.log(111111);
      stripe.charges.create({
        amount: 1000,
        currency: req.query.currency,
        source: req.query.token
      }).then(function (charge) {
        console.log(333333, charge);
        res.json(charge);
      }, function (err) {
        console.log(444444);
        res.json(err);
      });
    }, function (err) {
      console.log(222222);
      res.json(err);
    });

  } catch (err) {

    console.log(222222);
    console.log(err);
    res.json(err);

  }
});


router.get('/api/stripe/transfer', function (req, res, next) {
  console.log(" STRIPE transfer ", req.query);
  try {

    var stripe = require("stripe")(STRIPE_SECRET_KEY);

    let order = Math.random().toString(36).substring(9) + "!" + Math.random().toString(36).substring(9);
    console.log(" ORDER : ", order);
    // Create a Charge:


    stripe.accounts.create({
      country: req.query.country,
      type: "custom"
    }).then((account) => {
      console.log('eeee111111');

      stripe.charges.create({
        amount: 50,
        currency: req.query.currency,
        source: req.query.token,
        transfer_group: order,
      }).then(function (charge) {
        console.log(222222 + " ==== ! ==== ");
        // Create a Transfer to the connected account (later):
        stripe.transfers.create({
          amount: 50,
          currency: req.query.currency,
          destination: account.id,
          description: "Fabulive charge",
          transfer_group: order,
        }).then(function (transfer) {
          // asynchronously called
          console.log(444444);
          res.json(transfer);
        }, (err) => {
          console.log(555555);
          res.json(err);
        });
      }, (err) => {
        console.log(3333333);
        res.json(err);
      });

    }, (err) => {
      console.log('eeee222222');
      res.json(err);
    });


  } catch (err) {
    console.log(111111);
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


//////////////////


let PAYPAl_Client_ID = "ATZATG4t7Yx7AbsVaDN9qVjNtZrLFMErsdfuWG6EFBP52t0Izpqb41e0CIWgtk0x1QfS3eSYzVtPUWLz"; // sandbox
//PAYPAl_Client_ID = "AWERYEBk8TkDI_ZS8tGdBXdmY5jOsa9tNwDXylpJ0pUwbEzUGyHHYVkMRRdi_isIB132zv7N6EHWdEBE"; // live

let PAYPAl_Client_SECRET = "EMEZ94VttTURqBblKftZAgNhHVk_qZ_NxHJ0nsSQQnGnCAkyEJpMykREu6gTmjE-7jWTc9NXGy8DzaKr"; // sandbox
//PAYPAl_Client_SECRET = "EKzPguIcTMP6d4DaMmyoSiFAhVG_S2Bt4W_Y9kMl1QM1zbf5ysviXIpxPkRYit4Osj33-LClnpWzYT_d"; // live 

router.post('/api/paypal/payout', function (req, res, next) {

  console.log(" PAYPAL ");

  const paypal = require('paypal-rest-sdk');

  // paypal auth configuration
  var config = {
    "port": 3000,
    "api": {
      "host": "api.sandbox.paypal.com",
      'mode': 'sandbox', //sandbox or live
      "client_id": PAYPAl_Client_ID,  // your paypal application client id
      "client_secret": PAYPAl_Client_SECRET // your paypal application secret id
    }
  }
  paypal.configure(config.api);

  try {

    ///////////

    /*

    var capture_details = {
      "amount": {
        "total": "0.90",
        "currency": "USD"
      },
      "is_final_capture": true
    };

    paypal.authorization.capture("5JCCU2BXN9YZC", capture_details, function (error, capture) {
      console.log( " authorization " );
      if (error) {
        console.error(error);
      } else {
        console.log(capture);
      }
    });

    */

    ////////////


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
            "value": 0.90,
            "currency": "USD"
          },
          "note": "Thanks for your patronage!",
          // "sender_item_id": "201403140001",
          "receiver": "tom.vidolov@gmail.com"
        }
      ]
    };

    var sync_mode = true;

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


//////////////


router.all('/*', function (req, res) {
  res.json("{ 'err' : 'Not Found' }");
});

module.exports = router;
