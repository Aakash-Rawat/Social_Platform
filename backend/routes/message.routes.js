import express from "express";
import { editProfile, followOrUnfollow, getProfile, login, logout, register } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticate.js";
import upload from "../middlewares/multer.js";
import {getMessage, sendMessages } from "../controllers/message.controller.js";

const router = express.Router();

router.route('/send/:id').post(isAuthenticated,sendMessages);
router.route('/all/:id').post(isAuthenticated, getMessage);




export default router;