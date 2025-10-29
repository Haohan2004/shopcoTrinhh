import db from "../config/db.js";
export const getloai = async () =>{
    return await db.execute("SELECT * FROM kieudo");
}
