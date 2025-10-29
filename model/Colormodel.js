import db from '../config/db.js';
export  const getcolor = async () =>{
    return await db.execute("SELECT * FROM mausac");
}
