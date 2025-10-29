import express from "express";
import {getallcolor} from "../Controller/ColorController.js";
const Router = express.Router();
Router.get("/",getallcolor)
export default Router;