import express from 'express';
const router = express.Router();
import {deleteproduct, getproduct, getProductwithid, insert, searchproduct} from '../Controller/ProductController.js';

router.get("/",getproduct).post("/", insert);
router.get("/:id",getProductwithid).delete("/:id",deleteproduct);


export default router;