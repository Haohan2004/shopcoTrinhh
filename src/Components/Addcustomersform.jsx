import React, {useEffect, useState} from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {Button, Cascader, Checkbox, ColorPicker, DatePicker, Form, Input, InputNumber, Radio, Rate, Select, Slider, Switch, TreeSelect, Upload,} from 'antd';
import {supabase} from "@/supabase-client.js";
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const normFile = e => {
    if (Array.isArray(e)) {
        return e;
    }
    return e?.fileList;
};
const Addcustomersform= ({OnSend,upload}) => {
    // const [fullname, setFullname] = useState("");
    // const [email, setEmail] = useState("");
    // const [phone, setPhone] = useState("");
    // const [address, setAddress] = useState("");//"
    const [newcustomer, setNewcustomer] = useState({full_name: "", email: "", phone: "", address: ""});
    // const resetinfo = () =>{
    //     setFullname("");
    //     setEmail("");
    //     setPhone("");
    //     setAddress("");
    // }
const handlesubmit = async e => {
        e.preventDefault();
        const {error} = await supabase.from("customers").insert(newcustomer).single();
        if(error){
            console.log(error)

        }
        setNewcustomer({});
        upload(newcustomer);
    OnSend();
}
    // const addCustomer = async (e) => {
    //     e.preventDefault();
    //     try{
    //         const response = await fetch("http://localhost:8080/Customer",{
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //
    //         },
    //         body: JSON.stringify({name: fullname,address: address, email: email, phone: phone, })
    //
    //     })
    //         if (!response.ok)
    //         {
    //             throw new Error("Thêm Khách Hàng thất bại");
    //         }
    //         const newcustomer = await response.json();
    //         upload(newcustomer);
    //         resetinfo();
    //         OnSend();
    // }
    // catch (err) {
    //         console.error(err);
    //     }
    // }

    return (
        <>

            <Form
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"

                style={{ maxWidth: 600 }}
            >


                <Form.Item label="Họ Tên">
                    <Input placeholder="Họ Tên..."  onChange={(e) =>setNewcustomer((prev) =>({...prev,full_name: e.target.value}))} />
                </Form.Item>

                <Form.Item label="Email">
                    <Input placeholder="Email..."onChange={(e) =>setNewcustomer((prev) =>({...prev,email: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Địa Chỉ">
                    <Input placeholder="Địa Chỉ..."onChange={(e) =>setNewcustomer((prev) =>({...prev,address: e.target.value}))} />
                </Form.Item>
                <Form.Item label="Số Điện Thoại"    >
                    <Input placeholder="Số Điện Thoại..."onChange={(e) =>setNewcustomer((prev) =>({...prev,phone: e.target.value}))} />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 10, span: 16 }}>
                    <Button type="primary" htmlType="submit" onClick={handlesubmit} className="mx-2">
                        Gửi
                    </Button>
                    {/*<Button color="red" type="primary" htmlType="submit" onClick={()=> {resetinfo();OnSend()}} >*/}
                    {/*   Hủy*/}
                    {/*</Button>*/}
                </Form.Item>
            </Form>
        </>
    );
};
export default Addcustomersform;