import express from "express";
const Router = express.Router();
import {
    getCustomers,
    insert,
    getCustomerwithid,
    deletecustomer,
    updateCustomer,
    searchcustomer
} from "../Controller/CustomerController.js";

Router.get('/',getCustomers).post('/',insert);
Router.get('/:id',getCustomerwithid).delete('/:id',deletecustomer).put('/:id',updateCustomer);
Router.get('/search/:name',searchcustomer);
export default Router;