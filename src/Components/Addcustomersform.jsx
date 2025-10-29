import React, {useEffect, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider, Switch, TreeSelect, Upload,} from 'antd';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const Addcustomersform= ({OnSend,upload}) => {
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const resetinfo = () =>{
        setFullname("");
        setEmail("");
        setPhone("");
        setAddress("");
    }

    const addCustomer = async (e) => {
        e.preventDefault();
        try{
            const response = await fetch("http://localhost:8080/Customer",{
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({name: fullname,address: address, email: email, phone: phone, })

        })
            if (!response.ok)
            {
                throw new Error("Thêm Khách Hàng thất bại");
            }
            const newcustomer = await response.json();
            upload(newcustomer);
            resetinfo();
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
                    <Button type="primary" htmlType="submit" onClick={addCustomer} className="mx-2">
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
export default Addcustomersform;