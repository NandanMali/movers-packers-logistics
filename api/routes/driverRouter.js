import express from "express";

import {
  save,
  getDriversByPartner,
  view,
  remove,
  update
} from "../controller/driverController.js";

const router = express.Router();

router.post("/save", save);

router.get( "/partner/:partnerId", getDriversByPartner);

router.get( "/view/:id", view );

router.delete("/delete/:id", remove);
router.put("/update",update);

export default router;
