import express from 'express';
import {getallsize} from "../Controller/sizeController.js";
const router = express.Router();
router.get('/',getallsize);
export default router;