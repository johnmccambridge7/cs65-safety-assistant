import express from 'express';

const router = express();

router.route("/")
    .get((req, res) => {
        res.send("hi");
    });

export default router;