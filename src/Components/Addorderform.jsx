import {Button, InputNumber, Space, Table} from "antd";
import React, {useEffect, useState} from "react";
import {supabase} from "@/supabase-client.js";
import {Input} from "@/Components/ui/input.js";

const Addorderform = () => {
    const [datasource,setDatasource] = useState([]);
    const [dataorder,setDataorder] = useState([]);
    const [quantity,setQuantity] = useState({});
    useEffect(() => {
        const fetchData = async () => {
        const {data,error}= await supabase.from("clothes").select("*").eq("status",1);

            setDatasource(data);
        }
        fetchData();
    })
    useEffect(() => {
       console.log(dataorder)
    },[dataorder]);
    const deletecart = (record) =>{
        const del = dataorder.filter(product => product.cloth_id !==record.cloth_id);
        setDataorder(del);
    }

    const columns1 = [
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
            title: 'Giá Thuê',
            dataIndex: 'rental_price',
            key: 'rental_price',
        },
        {
            title: 'Số Lượng',
            render:(text, record) => (

                <InputNumber min={1} max={parseInt(record.quantity)} value={quantity[record.cloth_id]}  onChange={(value) => {setQuantity((prev) => ({...prev,[record.cloth_id]: value }))}} />

            ),
            key: 'quantity',
        },

        {
            title: 'Tiện Ích',
            render: (text, record) => (
                <Space size="small" >
                    <Button onClick={()=>{record.quantity=quantity[record.cloth_id];if(record.quantity==null){alert("Bạn cần nhập số lượng");return;}setDataorder(prev => [...prev,record])}}>
                        Thêm
                    </Button>
                </Space>
            ),
            key: 'action',

        }
    ];
    const columns3 = [
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
            title: 'Giá Thuê',
            dataIndex: 'rental_price',
            key: 'rental_price',
        },
        {
            title: 'Số Lượng',
            dataIndex:'quantity',
            key: 'quantity',
        },

        {
            title: 'Tiện Ích',
            render: (text, record) => (
                <Space size="small" >
                    <Button  color="red"onClick={()=>{deletecart()}}>Xóa</Button>
                </Space>
            ),
            key: 'action',

        }
    ];

    return(
        <>
            <div>
            <div className="w-[55vw] h-[0.5vh]">
                <Input type="email" className="w-[15vw] mb-[1vw]"   />

                <Table  dataSource={datasource} columns={columns1} pagination={{pageSize: 3}} rowClassName={() => "text-center"} />
                <div className="w-[55vw] h-[0.5vh] ">
                    <Table  dataSource={dataorder} columns={columns3} pagination={{pageSize: 3}} rowClassName={() => "text-center"} />
                </div>

            </div>
            </div>

        </>
    )
}
export default Addorderform