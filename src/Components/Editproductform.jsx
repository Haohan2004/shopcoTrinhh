import React, {useEffect, useState} from 'react';
import { UploadOutlined  } from '@ant-design/icons';
import {Input} from "./ui/input.tsx"
import {
    Button,
    Cascader,
    Checkbox,
    ColorPicker,
    DatePicker,
    Form,

    InputNumber,
    Radio,
    Rate,
    Select,
    Slider,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import {supabase} from "@/supabase-client.js";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const Editproductform= ({OnSend,reset,product}) => {
    const [productname, setproductname] = useState(product.cloth_name);
    const [img, setimg] = useState(product.hinh);
    const [color, setcolor] = useState(product.color);
    const [type, settype] = useState(product.kieu);
    const [size, setsize] = useState(product.size);
    const [quantity, setquantity] = useState(product.quantity);
    const [price, setprice] = useState(product.rental_price);
    const [srccolor, setsrccolor] = useState([]);
    const [srcloai, setsrcloai] = useState([]);
    const [srcsize, setsrcsize] = useState([[]]);
    const resetinfo = () =>{
       setproductname("");
       setimg(null);
       setcolor("");
       settype("");
       setsize("");
       setquantity("");
       setprice("");
    }
    useEffect(() => {
        setproductname(product.cloth_name);
        setimg(product.hinh);
        setcolor(product.color);
        settype(product.kieu);
        setsize(product.size);
        setquantity(product.quantity);
        setprice(product.rental_price);
    }, [product]);
    useEffect(()=> {
        console.log(product);
        console.log(product.cloth_name);
        console.log(productname);
        }
    ,[])

    useEffect( ()=> {
        const fetchData = async () => {
            const {data,error}= await supabase.from("mausac").select("*");
            if(error)
            {
                console.log(error)
                return;
            }
            setsrccolor(data);
        }
        fetchData();
    },[])
    useEffect( ()=> {
            const fetchData = async () => {
                const {data,error}= await supabase.from("kieudo").select("*");
                if(error)
                {
                    console.log(error);
                    return;
                }
                setsrcloai(data);
            }
            fetchData();
        }
    )
    useEffect( ()=> {
            const fetchData = async () => {
                const {data,error}= await supabase.from("kich_co").select("*");
                if(error)
                {
                    console.log(error);
                    return;
                }
                setsrcsize(data);
            }
            fetchData();
        }
    )

    const uploadpicture = async (e) => {
        const file = e.target.files[0];
        console.log(file)
        const filename=`${file.name}`;
        const {error}=await supabase.storage.from("image").upload(`uploads/${filename}`,file,{upsert:true});
        const {data} = await supabase.storage.from("image").getPublicUrl(`uploads/${filename}`);
        if(error) throw error;
        console.log();
        setimg(data.publicUrl);
        console.log(img);
    }
    // const addproduct = async (e) => {
    //     e.preventDefault();
    //     try{
    //         const response = await fetch("http://localhost:8080/product",{
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //
    //             },
    //             body: JSON.stringify({cloth_name: productname,hinh: img, color: color, kieu: type,size:size,quantity:quantity,rental_price:price }),
    //
    //         })
    //         if (!response.ok)
    //         {
    //             throw new Error("Thêm Sản Phẩm thất bại");
    //         }
    //         const newproduct = await response.json();
    //         upload(newproduct);
    //         resetinfo();
    //         OnSend();
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }
    const editproduct = async () =>{
        const {error}= await supabase.from("clothes").update({cloth_name:productname,hinh:img,color:color,kieu:type,size:size,quantity:quantity,rental_price:price}).eq("cloth_id",product.cloth_id);
        if(error)
        {
            console.log(error)
        }
        reset();
        resetinfo();
        OnSend();
    }

    return (
        <>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14  }}
                layout="horizontal"
                encType={"multipart/form-data"}
                style={{ maxWidth: 600 }}
            >
                <Form.Item label="Tên Sản Phẩm">
                    <Input placeholder="Tên Sản Phẩm...." value={productname} onChange={(e) => setproductname(e.target.value)} />
                </Form.Item>

                <Form.Item label="Hình Ảnh" valuePropName="fileList" getValueFromEvent={normFile}>
                   <Input type="file" onChange={(e) => {uploadpicture(e)}}  />
                </Form.Item>
                <Form.Item label="Màu Sắc">
                    <Select value={color} onChange={(value) => setcolor(value)}>

                        {srccolor.map((cl) => (
                            <Select.Option value={cl.ten_mau}  >{cl.ten_mau}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Loại Sản Phẩm">
                    <Select value={type} onChange={(value) => {settype(value)}}>
                        {srcloai.map((type)=>(
                            <Select.Option value={type.ten_kieu}  >{type.ten_kieu}</Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Kích Cỡ">
                    <Select value={size} onChange={(value) => setsize(value)} >

                        {srcsize.map((size)=>(
                            <Select.Option value={size.ten_kich_co}  >{size.ten_kich_co} </Select.Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Số Lượng">
                    <InputNumber min={1} value={quantity} onChange={(value) => setquantity(value)} />
                </Form.Item>
                <Form.Item label="Giá Thuê">
                    <Input placeholder="VND...." value={price} onChange={(e) => setprice(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit" className="mx-2" onClick={()=>{editproduct();}}>
                        Gửi
                    </Button>
                    <Button color="red" type="primary" htmlType="submit" onClick={()=> {resetinfo();OnSend()}} >
                        Hủy
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Editproductform;