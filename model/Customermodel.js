import db from "../config/db.js";
export const getallCustomers=()=> {
    return db.execute("Select * from customers where status=1") ;

}
export const insertCustomer= async (customer)=>{
 await db.execute("INSERT into customers(full_name,address,email,phone) VALUES(?,?,?,?)",[customer.name,customer.address,customer.email,customer.phone]);

}
export const getcustomerid= async (id)=>{
    const [row]=    await db.execute(`SELECT customer_id ,full_name,address,email,phone FROM customers WHERE customer_id=?`,[id]);
    return row;
}
export const deleteCustomer= async (id)=>{
    await db.execute("UPDATE customers SET status=3 WHERE customer_id=?",[id]);
}
export const updatecustomer= async (customer)=>{
    await db.execute("UPDATE customers set full_name=?,address=?,email=?,phone=? WHERE customer_id=?",[customer.full_name,customer.address,customer.email,customer.phone,customer.id]);
}
export const getcustomerwithname = async (name)=>{
    const [rows] = await db.execute("SELECT * FROM customers WHERE full_name like ? AND status=1",[`%${name}%`]);
    return rows;
}