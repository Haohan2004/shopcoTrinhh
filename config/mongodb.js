import {MongoClient,ServerApiVersion} from "mongodb";
const MONGO_URI="mongodb+srv://hangiahao2004:u9x1jIjRcqnndglK@quanlyquanao.gacp91c.mongodb.net/?retryWrites=true&w=majority&appName=quanlyquanao";
const DATABASENAME="quanlyquanaogacp91cmongodbnet";
let db=null;
const client = new MongoClient(MONGO_URI, {
        serverApi:
            {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true
            }
    })
export const CONNECT_DB= async () => {
    await client.connect();
    db=client.db(DATABASENAME);
}
export const GETDB= () =>{
    if(!db) throw new Error("Must connect to the DB");
    return db;

}

