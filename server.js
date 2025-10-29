import express from "express";
import multer from "multer"
import path from "path"
import cors from 'cors';
import CustomerRouter from "./Routes/Customer.js";
import ProductRouter from "./Routes/Product.js";
import ColorRouter from "./Routes/Color.js";
import loaiRouter from "./Routes/loai.js";
import sizeRouter from "./Routes/size.js";
import imgRouter from "./Routes/img.js";
    const app = express();
    app.set("view engine", "ejs");
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use('/upload', express.static(`public/img`));
    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null,'public/imgs/'),
        filename: (req, file, cb) => cb(null, path.basename(file.originalname)  )

    });
    const upload = multer({ storage: storage });

    app.use("/Customer", CustomerRouter);
    app.use("/Product",ProductRouter);
    app.use("/Color",ColorRouter);
    app.use("/loai",loaiRouter);
    app.use("/size",sizeRouter);
    app.post("/upload",upload.single("image"),(req,res)=>{

        res.json({fileurl: `${req.file.filename}`});
    });
    app.get("/", async (req, res) => {
        res.send("hello world");
    })


    app.listen(8080, () => {
        console.log("Server running on port 8080");
    })


