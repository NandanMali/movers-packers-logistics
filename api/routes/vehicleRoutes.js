import express from "express";
import { 
    save,
    fetch,
    update,
    deleteVehicle
 } from "../controller/vehicleController.js";

const router = express.Router();

router.post("/save", save);
router.get("/fetch",fetch);
router.put("/update",update);
router.delete("/delete",deleteVehicle);

export default router;