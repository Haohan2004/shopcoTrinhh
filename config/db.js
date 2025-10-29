import sql from 'mysql2/promise';
let db= sql.createPool({
    host: "localhost",
    user: "root",
    password: '',
    database: "qlcuahangquanao",
});

export default db