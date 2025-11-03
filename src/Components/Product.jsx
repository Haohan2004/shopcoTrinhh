import Navbar from "./Navbar.jsx";
import {Button, Select, Space, Table} from "antd";


import React, {useEffect, useRef, useState} from "react";
import Addproductform from "./Addproductform.jsx";
import Editproductform from "./Editproductform.jsx"
import {Input} from "@/Components/ui/input.js";
import {supabase} from "@/supabase-client.js";
const Product = () => {
    const [datasource,setDatasource] = useState([]);
    const [products,setProducts] = useState(null);
    const formRef = useRef(null);
    const backgroundRef= useRef(null);
    const EditformRef = useRef(null);
    const [searchValue, setSearchValue] = useState("");
    const [srccolor, setsrccolor] = useState([]);
    const [srcloai, setsrcloai] = useState([]);
    const [srcsize, setsrcsize] = useState([[]]);
    const [colorfilter, setcolorfilter] = useState("");
    const [typefilter, settypefilter] = useState("");
    const [sizefilter, setsizefilter] = useState("");
    const handleSubmit = (item) => {
        setDatasource((prev)=>[...prev,item]);
    }

    useEffect(() => {

        fetchData();
    },[])
    useEffect(() => {
        searchproduct();
    },[searchValue])
    useEffect( ()=> {
        if(colorfilter=="" && searchValue!="")
        {
            searchproduct();
            return;
        }
        else if(colorfilter=="")
        {
            return;
        }
        const temp =datasource.filter(p => p.ten_mau ===colorfilter);
        setDatasource(temp);


    },[colorfilter]);
    useEffect( ()=> {
        if(typefilter==null && searchValue!="")
        {
            searchproduct();
            return;
        }
        else if(typefilter==null)
        {
            fetchData();
        }



    },[typefilter]);
    useEffect( ()=> {
        if(sizefilter==null && searchValue!="")
        {
            searchproduct();
            return;
        }
        else if(sizefilter==null)
        {
            fetchData();
        }



    },[sizefilter]);

    // useEffect( ()=> {
    //         const fetchData = async () => {
    //             const response = await fetch("http://localhost:8080/Color", {});
    //             let data = await response.json();
    //             data=["",...data]
    //             setsrccolor(data)
    //         }
    //         fetchData();
    //     }
    // )
    // useEffect( ()=> {
    //         const fetchData = async () => {
    //             const response = await fetch("http://localhost:8080/loai", {});
    //             let data = await response.json();
    //             data=["",...data]
    //             setsrcloai(data);
    //         }
    //         fetchData();
    //     }
    // )
    // useEffect( ()=> {
    //         const fetchData = async () => {
    //             const response = await fetch("http://localhost:8080/size", {});
    //             let data = await response.json();
    //             data=["",...data]
    //             setsrcsize(data)
    //         }
    //         fetchData();
    //     }
    // )


    const fetchData = async () => {
      const {data,error}= await supabase.from("clothes").select("*").eq("status",1);
        setDatasource(data);
    }
    const openForm = () => {
        formRef.current.style.display = "block";
        formRef.current.style.border = "2px solid black"
        backgroundRef.current.style.filter = "blur(6px)";
        backgroundRef.current.style.display = "none"
        backgroundRef.current.style.pointerEvents = "none"; // ngăn click nền
    };

    const closeForm = () =>{
    formRef.current.style.display = "none";
    backgroundRef.current.style.display = "block";
    backgroundRef.current.style.filter = "blur(0)";
        backgroundRef.current.style.pointerEvents = "auto";

    }
    const deleteProduct = async (id) => {

        try{
            if(confirm("Bạn có chắc chắn muốn xóa không")==true) {
                const response = await fetch(`http://localhost:8080/product/${id}`, {
                    method: 'DELETE',
                })
                if (!response.ok) {
                    throw new Error("Xóa sản phẩm thất bại");
                }
            }
        }
        catch (err) {
            console.error(err);
        }
    }

    const getproductwithid = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/product/${id}`);
            const data = await response.json();
            setProducts(data);

        }
        catch (error) {
            console.log(error);
        }}
    const openEditForm = () => {
        EditformRef.current.style.display = "block";
        EditformRef.current.style.border = "2px solid black"
        backgroundRef.current.style.filter = "blur(6px)";
        backgroundRef.current.style.display = "none"
        backgroundRef.current.style.pointerEvents = "none"; // ngăn click nền
    };
    const closeEditForm = () => {

        EditformRef.current.style.display = "none";
        EditformRef.current.style.border = "none";
        backgroundRef.current.style.filter = "none";
        backgroundRef.current.style.display = "block";
        backgroundRef.current.style.pointerEvents = "auto";
    };
    // const searchproduct = async () => {
    //     if(searchValue==""){
    //         fetchData();
    //         return;
    //     }
    //     try{
    //         const response = await fetch(`http://localhost:8080/product/search/${searchValue}`);
    //         const data = await response.json();
    //         console.log(data);
    //         setDatasource(data);
    //
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    // }
    const searchproduct = async () => {
        if(searchValue==""){
            fetchData();
            return;
        }
        const {data,error} = await supabase.from("clothes").select("*").eq("status",1).ilike("cloth_name",`%${searchValue}%`);
        if(error)
        {
            console.error(error);
        }
            console.log(data);
            setDatasource(data);



    }

    const columns = [
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'cloth_name',
            key: 'cloth_name',
        },
        {
            title: 'Hình Ảnh',
            dataIndex: 'hinh',
            key: 'img',
            render:(text,record) => (
                <img src={`${record.hinh}` } className={"w-10 h-10 cursor-pointer"} onclick/>
            )
        },
        {
            title: 'Màu Sắc',
            dataIndex: 'color',
            key: 'color',
        },

        {
            title: 'Loại Sản Phẩm',
            dataIndex: 'kieu',
            key: 'kieu',
        },
        {
            title: 'Size',
            dataIndex: 'size',
            key: 'size',
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Giá Thuê',
            dataIndex: 'rental_price',
            key: 'rental_price',
        },
        {
            title: 'Tiện Ích',
            render: (text, record) => (
                <Space size="small" >
                    <Button  color="blue" variant="solid" onClick={() => {getproductwithid(record.cloth_id); openEditForm()}} > Sửa</Button>
                    <Button color="red" variant="solid" onClick={()=>{deleteProduct(record.cloth_id)}} >Xóa</Button>
                </Space>
            ),
            key: 'action',

        }
    ];

    return (
        <>
            <div className="w-250 ml-100 flex text-center justify-center flex-col" ref={backgroundRef} >
                <div className="flex text-left justify-between items-center">
                    <h2 className="font-sans font-bold text-2lg m-2">Sản Phẩm</h2>

                    <Button color="default" variant="solid" onClick={() =>{openForm()}}>Thêm Sản Phẩm</Button>
                </div>
                <div className="flex text-left m-2">
                    <Input type="email" className="w-[15vw] mr-[2vw]" value={searchValue} onChange={(e) => {setSearchValue(e.target.value) }}/>
                    <div className="w-[8vw] flex justify-between">
                    <Select  placeholder="Màu Sắc..." className="w-[8vw] max-w-[8vw] min-w-[8vw]" onChange={(value) =>{setcolorfilter(value)}}>
                        {srccolor.map((color) =>(

                            <Select.Option value={color.ten_mau}  >{color.ten_mau} </Select.Option>
                        ))}
                    </Select>
                        <Select className="w-[8vw] max-w-[8vw] min-w-[8vw]" placeholder="Kiểu Dáng...">
                            {srcloai.map((loai) =>(

                                <Select.Option value={loai.ten_kieu}   className="text-ellipsis">{loai.ten_kieu}</Select.Option>
                            ))}
                        </Select>
                        <Select className="w-[8vw] max-w-[8vw] min-w-[8vw]" placeholder="Kích Cỡ...">
                            {srcsize.map((size) =>(
                                <Select.Option value={size.ten_kich_co}  >{size.ten_kich_co}</Select.Option>
                            ))}
                        </Select>
                    </div>

                </div>

                <Table dataSource={datasource} columns={columns} pagination={{pageSize: 5}} rowClassName={() => "text-center"} className=" " />

            </div>
            <div className="w-[45vw] h-[36vw] border-2 p-[2vw] rounded-2xl absolute top-[6vw] left-[32vw] hidden" ref={formRef}>

                <Addproductform OnSend={closeForm} upload={handleSubmit}/>

            </div>
            <div className="w-[45vw] h-[36vw] border-2 p-[2vw] rounded-2xl absolute top-[6vw] left-[32vw] hidden" ref={EditformRef}>

                {   products && <Editproductform OnSend={closeEditForm} product={products}/>}

            </div>

        </>
    )


};
export default Product;