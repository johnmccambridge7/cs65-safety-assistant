import express from 'express';
import * as notifications from '../services/send_push_notifications';

const router = express();

router.route("/")
    .get((req, res) => {
        res.send("hi");
    });

router.route("/test")
    .get((req, res) => {
        res.send(notifications.sendTestMessage());
    });

export default router;