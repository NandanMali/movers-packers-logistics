import express from "express";

import {
  createPaymentSession,
  getPaymentReceipt,
  getCustomerPayments,
  getCompletePaymentReceipt,
  getPartnerPayments,
  getAllPayments,
} from "../controller/paymentController.js";
const router = express.Router();

router.post("/create-session", createPaymentSession);
router.get("/receipt/:bookingId", getPaymentReceipt);

router.get("/customer/:customerId", getCustomerPayments);
router.get("/partner/:partnerId", getPartnerPayments);
router.get("/all", getAllPayments);

router.get("/completereceipt/:bookingId", getCompletePaymentReceipt);
export default router;
