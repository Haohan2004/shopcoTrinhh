import express from "express";
import {getallloai} from "../Controller/loaiController.js";
const router = express.Router();
router.get("/",getallloai);
export default router;