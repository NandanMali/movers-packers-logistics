import express from "express";

import {

    sendQuote,
    getQuoteRequests,
    acceptQuote,
    showQuote,
    fetch,
    getById

} from "../controller/bookingQuoteController.js";

const router = express.Router();

router.post("/send", sendQuote);
router.get( "/requests/:partnerId", getQuoteRequests );
router.get( "/fetch/:partnerId",fetch );
router.get("/customer/:bookingId",showQuote);
router.get("/id",getById);
router.patch("/accept", acceptQuote);

export default router;