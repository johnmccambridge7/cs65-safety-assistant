import express from 'express';
import * as firebase from 'firebase';
import * as notifications from '../services/send_push_notifications';
import computeDistance from '../constants/compute-distance';

const router = express();

router.route('/')
	.post((req, res) => {
		if (!(req.body.latitude && req.body.longitude)) {
			res.status(400).send({ output: 'Must provide latitude and longitude in body', failed: true });
		} else if (!(req.body.fallen_user_name)) {
			res.status(400).send({ output: 'Must provide name of fallen user in body (fallen_user_name)', failed: true });
		} else {
			const db = firebase.firestore().collection('user-data');

			db.get()
				.then((snapshot) => {
					const DISTANCE_THRESHOLD = 0.75;
					let numMessaged = 0;
					let closestUser = null;
					let closestDistance = DISTANCE_THRESHOLD + 1;

					snapshot.forEach((doc) => {
						const userData = doc.data();

						if (userData.last_known_location) {
							const distanceAway = computeDistance(req.body.latitude, req.body.longitude, userData.last_known_location._lat, userData.last_known_location._long, 'M');

							// determine if user is nearby and has opted into receiving messages about others in need
							if (distanceAway <= DISTANCE_THRESHOLD && userData.get_updates) {
								if (userData.message_token) {
									const title = 'Nearby SafetyAssistant user has fallen';
									const body = `${req.body.fallen_user_name} is ${distanceAway.toFixed(2)} miles away. Open for information.`;

									notifications.sendPushNotification(userData.message_token, title, body);

									numMessaged += 1;

									if (!closestUser || (distanceAway < closestDistance)) {
										closestUser = `${userData.first_name} ${userData.last_name}`;
										closestDistance = distanceAway;
									}
								}

								db.doc(doc.id).update({
									user_in_need: {
										name: req.body.fallen_user_name,
										lat: req.body.latitude,
										long: req.body.longitude,
										miles_away: distanceAway,
										timestamp: Date.now(),
									},
								});
							}
						}
					});

					res.send({
						output: {
							num_messaged: numMessaged,
							closest_user: closestUser,
							closest_distance: closestDistance,
						},
						failed: false,
					});
				})
				.catch((error) => {
					res.status(500).send(error);
				});
		}
	});

router.route('/test')
	.get((req, res) => {
		res.send(notifications.sendTestMessage());
	});

export default router;
