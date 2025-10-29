import {getProduct, getproductwithid, addProduct, deleteProduct, getproductwithname} from "../model/Productmodel.js";

export const getproduct= async (req,res)=>{
    try{
        const [row]=await getProduct();
        res.json(row);
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
}
export const insert = async (req,res)=>{
    try{
        const product={cloth_name:req.body.cloth_name,hinh:req.body.hinh,color:req.body.color,kieu:req.body.kieu,size:req.body.size,quantity:req.body.quantity,rental_price:req.body.rental_price};
        await addProduct(product);
        res.json(product);
    }
    catch(err){
        console.log(err);
        res.status(400).send({error:err});
    }
}
export const deleteproduct = async (req,res)=>{
    try{
        const id = req.params.id;
        await deleteProduct(id);
    }
    catch(err){
        res.status(400).send({error:err});
    }
}
export const searchproduct = async (req,res)=>{
    try{
        const name = req.params.name;
        const rows=await getproductwithname(name);
        res.json(rows);
    }
    catch(err){
        res.status(400).send({error:err});

    }
}
export const getProductwithid = async (req,res)=> {
    try {
        const product = await getproductwithid(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400).send({error: err});
    }
}
