import express from 'express';

const router = express();

const accountSid = 'AC9a877687ff66e2131252dcbc440cc0ed';
const authToken = '1448d4a13c3a8accee0168dcd97f743c';
const client = require('twilio')(accountSid, authToken);

/**
 * Route for sending SMS messages using the Twilio API.
 * @Twilio
 */

router.post('/:id', (req, res) => {
	// grab values
	const fromNumber = '+12035948837';
	let toNumber = `+${req.params.id.replace(/\D/g, '')}`;
	const { message } = req.body;

	// add in the US country code if missing
	if (toNumber.length > 1 && toNumber[1] !== '1') {
		toNumber = `+1${toNumber.substring(1)}`;
	}

	// send message if possible
	if (message && toNumber && fromNumber) {
		client.messages
			.create({
				body: message,
				from: fromNumber,
				to: toNumber,
			})
			.then((msg) => {
				res.json({ output: msg, failed: false });
			})
			.catch((error) => {
				res.status(500).json({ output: error, failed: true });
			});
	} else {
		res.json({ output: null, failed: true });
	}
});

export default router;
