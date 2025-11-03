import db from '../config/db.js';
export const getProduct = ()=>{
    return db.execute("SELECT * FROM clothes where status =1");

}
export const addProduct = async(product)=>{
    await db.execute("INSERT INTO clothes(cloth_name,hinh,color,kieu,size,quantity,rental_price) VALUES (?,?,?,?,?,?,?)",[product.cloth_name,product.hinh,product.color,product.kieu,product.size,product.quantity,product.rental_price]);
}
export const deleteProduct= async (id)=>{
    await db.execute("UPDATE clothes SET status=3 WHERE cloth_id=?",[id]);
}
export const getproductwithid = async (id)=> {
    const [row] = await db.execute("SELECT cloth_name,hinh,color,kieu,size,quantity,rental_price from clothes where cloth_id=?",[id]);
    return row;
}
export const getproductwithname = async(name) =>{
    const [rows] = await db.execute("SELECT * from clothes where cloth_name like ? and status=1",[`%${name}%`]);
    return rows;
}