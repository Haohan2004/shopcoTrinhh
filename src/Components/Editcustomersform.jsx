import React, {useEffect, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider, Switch, TreeSelect, Upload,
} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};


const Editcustomersform= ({OnSend,customer,reset}) => {
    const [fullname, setFullname] = useState(customer.full_name);
    const [email, setEmail] = useState(customer.email);
    const [phone, setPhone] = useState(customer.phone);
    const [address, setAddress] = useState(customer.address);

    useEffect(() => {
        setFullname(customer.full_name);
        setEmail(customer.email);
        setPhone(customer.phone);
        setAddress(customer.address);
    }, [customer]);
    const editCustomer = async () => {
        try{
            const response = await fetch(`http://localhost:8080/Customer/${(customer.customer_id)}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({full_name: fullname,address: address, email: email, phone: phone, })

            })
            if (!response.ok)
            {
                throw new Error("Sửa Khách Hàng thất bại");
            }
            reset();
            OnSend();

        }
        catch (err) {
            console.error(err);
        }
    }
    return (
        <>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"

                style={{ maxWidth: 600 }}
            >


                <Form.Item label="Họ Tên">
                    <Input placeholder="Họ Tên..." value={fullname} onChange={(e) => setFullname(e.target.value)} />
                </Form.Item>

                <Form.Item label="Email">
                    <Input placeholder="Email..."value={email} onChange={(e) => setEmail(e.target.value)} />
                </Form.Item>
                <Form.Item label="Địa Chỉ">
                    <Input placeholder="Địa Chỉ..."value={address} onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>
                <Form.Item label="Số Điện Thoại"    >
                    <Input placeholder="Số Điện Thoại..."value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit"  className="mx-2" onClick={editCustomer}>
                        Gửi
                    </Button>
                    <Button color="red" type="primary" htmlType="submit" onClick={()=> {OnSend()}} >
                       Hủy
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
};
export default Editcustomersform;