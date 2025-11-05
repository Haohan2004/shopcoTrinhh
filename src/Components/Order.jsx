import Addproductform from "@/Components/Addproductform.jsx";
import {Button, Space, Table} from "antd";
import Addorderform from "@/Components/Addorderform.jsx";
import React, {useRef, useState} from "react";

const Order = () => {
    const [datasource, setDatasource] = useState([]);
    const columns2 = [
        {
            title: 'Tên Khách Hàng',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Ngày Thuê',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày Trả',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tổng Tiền',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Tiền Cọc',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Trạng Thái',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Chi Tiết',
            render: (text, record) => (
                <Button>Xem </Button>
            ),
            key: 'phone',
        }
    ];
    const handleSubmit = (item) => {
        setDatasource((prev)=>[...prev,item]);
    }
    const formRef = useRef(null);
    const backgroundRef= useRef(null);
    const EditformRef = useRef(null);
    const openForm = () => {
        formRef.current.style.display = "block";
        formRef.current.style.border = "2px solid black"
        backgroundRef.current.style.filter = "blur(6px)";
        backgroundRef.current.style.display = "none"
        backgroundRef.current.style.pointerEvents = "none"; // ngăn click nền
    };
    return (
        <>
            <div className="w-250 ml-100 flex text-center justify-center flex-col" ref={backgroundRef}>
                <div className="flex text-left justify-between items-center">
                    <h2 className="font-sans font-bold text-2lg m-2">Đơn Hàng</h2>

                    <Button color="default" variant="solid" onClick={() =>{openForm()}}>Thêm Đơn Hàng</Button>
                </div>
            <Table  dataSource={datasource} columns={columns2} pagination={{pageSize: 3}} rowClassName={() => "text-center"} />
            </div>

            <div className="w-[83vw] h-[50vw] border-2 p-[2vw] rounded-2xl absolute top-[0.5vw] left-[14vw]  hidden" ref={formRef}>

            <Addorderform  upload={handleSubmit} />

            </div>
        </>
    )
}
export default Order;