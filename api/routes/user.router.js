import express from 'express';

const router = express.Router();

//to link controller
import * as UserController from '../controller/user.controller.js';

router.post('/save',UserController.save);
router.get('/fetch',UserController.fetch);
router.delete('/delete',UserController.deleteUser);
router.patch('/update',UserController.update);
router.post('/login',UserController.login);
router.post('/verify-otp',UserController.verifyOTP);
router.post('/resend-otp',UserController.resendOTP);

export default router;