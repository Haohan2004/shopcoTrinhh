import db from "../config/db.js";
import {getloai} from "../model/loaimodel.js";
export const getallloai = async (req,res) =>{
    try{
        const [rows]=await getloai();
        res.json(rows);

    }
    catch(error){
        res.status(500).json({error:error});
    }
}