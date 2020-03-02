import express from 'express';

const router = express();

router.route('/')
	.get((req, res) => {
		res.send('Wake up Heroku');
	});

export default router;
