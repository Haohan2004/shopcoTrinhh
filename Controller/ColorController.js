import {getcolor} from "../model/Colormodel.js";

export const getallcolor = async (req,res) =>{
    try {
        const [rows] = await getcolor();
        res.json(rows);
    }
    catch(err){
        res.status(400);
        res.json({error:err});
    }
}