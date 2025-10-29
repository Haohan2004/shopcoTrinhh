import {getsize} from "../model/sizemodel.js";

export const getallsize = async (req,res) =>{
    try{
        const [rows] = await getsize();
        res.json(rows);
    }
    catch(err){
        res.status(400);
        res.json({error:err});
    }
}