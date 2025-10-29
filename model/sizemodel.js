import db from "../config/db.js";
export const getsize = async () => {
    return await db.execute("Select * from kich_co");
}