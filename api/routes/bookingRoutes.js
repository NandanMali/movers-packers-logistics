import express from "express";
import {
  saveBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getAvailableBookings,
  getBookingDetails,
  getAssignedJobs,
  assignDriverVehicle,
  getMyOrders,
  updatePartnerBookingStatus,
  getAllBookingsForAdmin
} from "../controller/bookingController.js";

const router = express.Router();

router.post("/save", saveBooking);
router.get("/all", getAllBookings);
router.get("/fetch", getBookingById);
router.patch("/status/:id", updateBookingStatus);
router.delete("/:id", deleteBooking);

router.get("/details/:bookingId", getBookingDetails);
router.get("/assignedjobs/:partnerId", getAssignedJobs);

router.post("/assign-driver", assignDriverVehicle);

router.get("/available", getAvailableBookings);

router.get("/my-orders/:partnerId", getMyOrders);

router.put("/update-status", updatePartnerBookingStatus);

router.get( "/admin/all", getAllBookingsForAdmin );

export default router;
