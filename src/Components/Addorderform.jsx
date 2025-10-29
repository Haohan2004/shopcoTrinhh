import {Button, Space, Table} from "antd";
import {useEffect, useState} from "react";

const Addorderform = () => {
    const [datasource,setDatasource] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/Product", {});
            const data = await response.json();
            setDatasource(data);
        }
        fetchData();
    })
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
                    <Button>Thêm</Button>
                </Space>
            ),
            key: 'action',

        }
    ];
    const columns2 = [
        {
            title: 'Họ Tên',
            dataIndex: 'full_name',
            key: 'full_name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Địa Chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Số Điện Thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Tiện Ích',
            render: (text, record) => (
                <Space size="small" >
                  <Button>Thêm</Button>
                </Space>
            ),
            key: 'action',

        }
    ];
    return(
        <>
            <div>
            <div className="w-[40vw] h-[1vh]">
                <Table  dataSource={datasource} columns={columns1} pagination={{pageSize: 5}} rowClassName={() => "text-center"} />

            </div>
            </div>

        </>
    )
}
export default Addorderform