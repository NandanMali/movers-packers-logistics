import express from "express";

import {

    savePartnerProfile,
    fetch,

} from "../controller/partnerProfileController.js";

const router = express.Router();

router.post("/save", savePartnerProfile);
router.get("/fetch/:userId",fetch);

export default router;