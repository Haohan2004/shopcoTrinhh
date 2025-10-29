import Navbar from "./Navbar.jsx";
import {Button, Space, Table} from "antd";


import {useEffect, useRef, useState} from "react";
import Addproductform from "./Addproductform.jsx";
import Editproductform from "./Editproductform.jsx"
const Product = () => {
    const [datasource,setDatasource] = useState([]);
    const [products,setProducts] = useState(null);
    const formRef = useRef(null);
    const backgroundRef= useRef(null);
    const EditformRef = useRef(null);
    const handleSubmit = (item) => {
        setDatasource((prev)=>[...prev,item]);
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/Product", {});
            const data = await response.json();
            setDatasource(data);
        }
        fetchData();
    })
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
                <img src={`/imgs/${record.hinh}` } className={"w-10 h-10 cursor-pointer"} onclick/>
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