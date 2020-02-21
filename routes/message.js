var express = require('express');
var router = express.Router();
const accountSid = 'AC9a877687ff66e2131252dcbc440cc0ed';
const authToken = '1448d4a13c3a8accee0168dcd97f743c';
const client = require('twilio')(accountSid, authToken);

/**
 * Route for sending SMS messages using the Twilio API.
 * @Twilio
 */

router.get('/', function(req, res, next) {
  const fromNumber = req.query.from;
  const toNumber = req.query.to;
  const message = req.query.message;

  var failed = false;

  if(message == null || toNumber == null || fromNumber == null) {
    failed = true;
  }


  if(!failed) {
    client.messages
    .create({
      body: message,
      from: '+12035948837',
      to: '+19206605119'
    })
    .then(message => {
      console.log('sending message');
      res.json({ output : message, failed : false });
    });
  } else {
    res.json({ output: null, failed: true });
  }
});

module.exports = router;