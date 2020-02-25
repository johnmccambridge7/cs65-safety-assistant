import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import * as admin from 'firebase-admin';
import * as firebase from 'firebase';

import messageRouter from './routes/message';
import broadcastRouter from './routes/broadcast';

require('dotenv').config(); // load environment variables

// initialize firebase account
firebase.initializeApp({
	apiKey: 'AIzaSyCK2Vb2o1y6LC8oJrGCNXDkh5Pno1WbKnw',
	authDomain: 'cs65-safetyassistant.firebaseapp.com',
	// databaseURL: 'https://cs65-safetyassistant.firebaseio.com',
	projectId: 'cs65-safetyassistant',
	// storageBucket: 'cs65-safetyassistant.appspot.com',
	// messagingSenderId: '824909863874',
	// appId: '1:824909863874:web:054dd687869962a35e545b',
	// measurementId: 'G-4GL744QSZ2',
});

// initialize firebase admin
const serviceAccount = {
	type: 'service_account',
	project_id: 'cs65-safetyassistant',
	private_key_id: '81ac8ea7b571ccadce8a347371c5c6389f552e03',
	private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4Morguw/pxs5V\noZYivAZQmew6t1yWhIZvoLmieLkgYpKQx1wu3nUNnsdSm+nEJq7QyJmFn8Cvaf28\nqTY9U+TNZYOoUX5j9GtOCk/kuy3sKDoXs5ixCTQjp3rZZhOUcJp2reg2rl3XWMvH\nF4OnIreW7Hlukwy3rYm7WyF2Ol3ppfZZntAm+tdDUc4JaBKgn1MOKEJb8SKp+ZVt\nRmCWaJi+MeAMDMizJREzzDSqfD5BnyJDU9TFOZsgdTmqV5UF0lL05CjTt5DEEN+V\n7DvMFMMHn+OUL1bLZFgi0Qa7WvxJ87DlePGuT++L7YLSxmpBesj2klQk4rMGfn4u\ni4r/zC/HAgMBAAECggEAVIV4vZuIt0yvFJMTmfeubCDdSaom9bh1GdbmJ7v+svIY\ncA/S6HzSuH/B1dHOaGAZups5+xttpvBbas04otaSuH9a9QsEFKis7oAD3iDX9zQU\nSBj0uVPQVYX99LEGzggHkOrHEgRb8juAMmjDVBe1p672H7uhS815VHwCNEafHl1s\nYlx7k053tFsnYeZeFta/RLepMirFzQUK0NrH3FqIhzxiplHCSB9Y/4crdjYJQ/Du\nzWRGSsS4kJYZbO/GVuxZg+mv0+RQqF684IyeJE4HwS+c/CgHyF8x6EyOCi0unxJT\nU1X3hpUjnD9Sy/IxEev/Z2jsqJ7PEEw7o/tHMkhITQKBgQD7qPOF/EnVhev6phXv\nNGOJAbqtf2jN26uyB+AMV1lZRb29QvOf732gu4EjdwRHQBir8fLh7x85KamDrh9b\nkPmQ/fsYXfw7JLMZu57nHcPKsB4fhuriKgGz+NHFEildpX6A+4Rre/Gx+cLxXRq+\nJxVZXzUgoh4qoCVx0xGk7I674wKBgQC7X8CPM+omC0PjOKPW9ZwQO3hdF3Ds+1Rf\nRCKiP2Nha99eKzeWVUFWFNZT2TU0KFZlparKfEjpHCpVmWSuE0fE06leqWT+TSJI\nmQjnUXHiWOZdKg/KurPUT/FrnTS6g+n3UdaRqKSdJiGjUBhqBZcpEW4U2POAGmuF\ngCdyZiRJzQKBgAZ/Sio/ZTiaCImkGBTg6WD0JnmsPGx0K26hPWuUJb5kSo3EWL3c\nVQX9UUw1GmssgHaP/JFQtyGmrbW0nSKkD41qwTzT0FtGi0kyytt0rUViXqS5uv6z\nzu9ykRfhbCf6ydVSqQyNWqQZqqrImJQoNijkiF6bUOQQ1mal6GK1qMm5AoGBAIMf\nQLt10veIjptluZHmEq5xT4ulqcrNHoAESFBOF5fHS2q0x5OWWcCJmGrY55h2We+L\n/XbxfnxSz3VTgNcoeuLMVAwAcsJa7BDttwNZRV7mY17y3lY6TTnYL9PlEU8snQAL\n7yHDaF7onkWQ+WTIQL3miqhgIhaVZoTn57Lws5hJAoGBALERTdhZF5SV7CwQZ93K\nxrYeHsI/edrcNFr4QBt1YSVuQ5P3M+36V8BdyH+Eaqvb9vrj6Iah/+GMp8714gdk\nRp1XEuX5S+I2Wpcsdugtz9333qYmPYSAunijqA1ZMpAAWG7qr+28rPRgmWxPqfw+\nsWLwrwPD9zvfd6LsXJDAPBuB\n-----END PRIVATE KEY-----\n',
	client_email: 'firebase-adminsdk-iz2si@cs65-safetyassistant.iam.gserviceaccount.com',
	client_id: '100318699231087321006',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-iz2si%40cs65-safetyassistant.iam.gserviceaccount.com',
};

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: 'https://cs65-safetyassistant.firebaseio.com',
});

// initialize server
const app = express();

// enable cross origin resource sharing
app.use(cors());

// enable/disable http request logging
app.use(morgan('dev'));

// enable json message body for posting data to API, extend default size limit
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// allow cors
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

// prefix API endpoints
app.use('/api/v1/message', messageRouter);
app.use('/api/v1/broadcast', broadcastRouter);

// // ping the server every 20 minutes so heroku stays awake
// setInterval(() => {
// 	axios.get('https://server-6amhealth.herokuapp.com/dev');
// }, 1200000); // every 5 minutes (300000)

// START THE SERVER
// =============================================================================
const port = process.env.PORT || 9090;
app.listen(port);

console.log(`\nlistening on port ${port}`);
