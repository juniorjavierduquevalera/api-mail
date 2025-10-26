import express from "express";
import { sendMail } from "../controllers/mail.controller.js";

const router = express.Router();

// Ruta para enviar el correo (POST)
router.post("/enviar", sendMail);

export default router;
