import {
    getallCustomers,
    getcustomerid,
    insertCustomer,
    deleteCustomer,
    updatecustomer,
    getcustomerwithname
} from '../model/Customermodel.js'
import customer from "../Routes/Customer.js";

export const getCustomers = async (req,res) => {
    try {


        const [row] = await getallCustomers();
        res.json(row);
    }
    catch (err) {
        console.error("❌ SQL Error:", err);

        res.status(400).send({error: err});
    }
}
export const insert = async (req,res) => {
    try{
    const customer= {name:req.body.name,address:req.body.address,email:req.body.email,phone:req.body.phone};
    await insertCustomer(customer);
    res.json(customer);
    }
    catch (err) {
        res.status(400).send({error: err});
    }
}
export const getCustomerwithid = async (req,res) => {
    try{
        const customer = await getcustomerid(req.params.id);
        res.json(customer);
    }
    catch (err) {
        res.status(400).send({error: err});
    }
}
export const deletecustomer = async (req,res) => {
    try{
        const customerid=req.params.id;
        await deleteCustomer(customerid);
        res.json(customer);
    }
    catch (err) {
        res.status(400).send({error: err});
    }
}
export const updateCustomer = async (req,res) => {
    try{
        const id = parseInt(req.params.id);
        const customer={full_name: req.body.full_name,address:req.body.address,email:req.body.email,phone:req.body.phone,id:id};
         await updatecustomer(customer);
         res.json(customer);
    }
    catch (err) {
        res.status(400).send({error: err});
    }
}
export const searchcustomer = async (req,res) => {
    try{
        const name=req.params.name;
        const rows=await getcustomerwithname(name)
        res.json(rows);
    }
    catch (err) {
        res.status(400).send({error: err});
    }
}




