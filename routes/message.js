var express = require('express');
var router = express.Router();

/**
 * Route for sending SMS messages using the Twilio API.
 * @Twilio
 */
router.get('/', function(req, res, next) {
  res.json({users: [{name: 'Timmy'}]});
});

module.exports = router;
