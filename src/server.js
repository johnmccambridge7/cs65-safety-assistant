import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
// import * as admin from 'firebase-admin';
// import * as firebase from 'firebase';

import messageRouter from './routes/message';
import broadcastRouter from './routes/broadcast';

require('dotenv').config(); // load environment variables

// // initialize firebase account
// firebase.initializeApp({
// 	apiKey: 'AIzaSyAouxtAu6-lOTYZGY9XZI81mjju5XpRr44',
// 	authDomain: 'dali-6amhealth.firebaseapp.com',
// 	projectId: 'dali-6amhealth',
// });

// // initialize firebase admin
// const serviceAccount = {
// 	type: 'service_account',
// 	project_id: 'dali-6amhealth',
// 	private_key_id: '8d94d06383418ae09e4464685dedda2f80a3f7bd',
// 	private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDV0nOBbAjavrnt\nlmkuz6c7ApqPbHEfj3OwBkGr+N7YEhzL2IChO4M+lz71UU4n7Svhy2l0JySrTAuA\nYYw8Ymt8xtj2/3Roo0RY8b23oNpFtWYp6Zo/njdw0IAwdsuJPZBvByLOHmF7U9hj\n54OtGq2WGVBrh6CRK00XH4i0U03FeYmc8pklejLh7Hb39C6lCA2o3g32nl9SY42X\nXty7VPCUUufRASjHTwjlMS/09mrNFpRZ0NFDvKktqOPnKWUNNqcoq8TtP/14nxOW\n3BjQ7y5KvrTVE+bvAkqvCPugF2+gtyRJJirL2mbHlxQkREn/w96Vxmsp55WHa23o\npeB9/4+JAgMBAAECggEAEoZvN3FSuxD3LtxvNH0NMhGhrndovaFCFqgUHIAtXm8D\nS63wRwfO8SdNbxeiO9dSi/eBpWyWwriN7ouFCN5GDcN0nMG5Ji+vBj27gCNRheSX\ne14f3Q8qIn4N/STtsXBCCTyHCXCcZYD4KH+watj63RxIWWigwrMLtMsonubwwAEF\nHsGc71rNi8zH4yVk3oWOPQKZPRR1Pgaei24W4UYnrJjLh5oh54a9shb2uuUGUYvC\n6RdszwXfxLdprP+zGWH9+6+YDO+OinVlhMXtlV5o+9k91pm8AgImgoNlNCAp2Zsk\nuyTY/yldDpZk6mfOtXHGoOPzRMVAeik4hmHbuwokmQKBgQDqQwff4sXFT7fvO/ot\ndHWPVmuFmPJbd95qA+jLo9E9NUHv9qGA4FnZJTxnLSAJr0uEj5kkfKXD9XEk+6W0\nOPugLbO2UEmhAox8Hir36ucf72Z56A/4ZLvEpH4+j/8Z48TSupCP9dQr69rYOfCC\n7tSWE+whtURY6eN570M1MDMD7wKBgQDpqd3u3qACJfu8TuZvvsFZU2bMjQa20wq/\nwLMCbCPN8DkW2r/kbGJUl8y18OCDoHMfcQWLH4SZicVMkARz6em4XUazEGamT9ee\nrXfDPa31L98NZVMqhDoOcUC4NxQB+mZD7Y4dOaYYmE+ZNTpjjKEwwwV48a7+Pg1J\nkNus+gjMBwKBgATgKEXMnnkg058zDF3t0pSNI+e/6ytkL0jdk/bJDg3MEfdAltPr\n13Lhh4ROOCB7eYLkyjcsMPcHILe4VRaPKQ2IZfkhaqbjOrFKn3JRfUX44ZUf81Uk\nI5RQKCB9Nr3/M5V/NIsKfsP7QK7HZe4TsnD9MSjycN244HclN6zft/AZAoGAYaFn\nKKJ+asdiGnlBEVm7wc32OuuF7afaaupiIVX709VWlTULTq72mu/eSfr+ZCELWQzJ\nSyr9JYYKGQZnxeLrk+vtWW415bGgnx1N2BcSc0rwQNGgYThkZZpud0oUIwtz5VgB\ntDZdLxOc1qAF6Ihe5VfnFnStMG/O73kGQI0sVcsCgYEAriOrV/ZS2RLI9KP/+KGc\n+skl0gAsIezhD9VHqIpnHpnQGpyQDEOySYyTT9IbczvIppKu3OsebNqeS4cdkTEq\nySlHy4cn0F82k5YxYOFT0AbQk0AF0BcDrmVIzpLUBsiAwsFt9jj+/yKM3JmlAxtE\n38ILLWwLzaECGxaCtn9PXMk=\n-----END PRIVATE KEY-----\n',
// 	client_email: 'firebase-adminsdk-1i6wz@dali-6amhealth.iam.gserviceaccount.com',
// 	client_id: '114453036626647824768',
// 	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
// 	token_uri: 'https://oauth2.googleapis.com/token',
// 	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
// 	client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-1i6wz%40dali-6amhealth.iam.gserviceaccount.com',
// };

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: 'https://dali-6amhealth.firebaseio.com',
// });

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
