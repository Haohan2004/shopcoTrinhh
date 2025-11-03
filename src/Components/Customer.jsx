import Navbar from "./Navbar.jsx";
import {Table, Button, Space} from "antd";
import {Input} from "@/components/ui/input.tsx"
import Addcustomersform from "./Addcustomersform.jsx";
import Editcustomersform from "./Editcustomersform.jsx";
import {useEffect, useRef, useState} from "react";
import {supabase} from "@/supabase-client.js";


const Customer = () => {
    const [datasource,setDatasource] = useState([]);
    const [cus, setCus] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const fetchDatacus = async () => {
        const {error,data} = await supabase.from("customers").select("* ").eq("status",1);
        if(error){
            console.log(error)
            return;
        }
        setDatasource(data);

    }





     const getcustomerwithid = async (id) => {

    const {error,data} = await supabase.from("customers").select("* where status =1").eq("customer_id",id);
    if(error){
        console.log(error)
    }
    setCus(data[0]);
    console.log(cus);

}

    // const deleteCustomer = async (id) => {
    //
    //     try{
    //         if(confirm("Bạn có chắc chắn muốn xóa không")==true) {
    //             const response = await fetch(`http://localhost:8080/Customer/${id}`, {
    //                 method: 'DELETE',
    //             })
    //             if (!response.ok) {
    //                 throw new Error("Xóa Khách Hàng thất bại");
    //             }
    //         }
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }
    const deleteCustomer = async (id) => {


            if(confirm("Bạn có chắc chắn muốn xóa không")==true) {
               const {error} = await supabase.from("customers").update({status:2}).eq("customer_id",id);
               setDatasource(prev => prev.filter(item=> item.customer_id != id));
            if(error){
                console.log(error)
            }
            }

            }


    // const searchcustomer = async () => {
    //         if(searchValue==""){
    //             fetchDatacus();
    //             return;
    //         }
    //     try{
    //         const response = await fetch(`http://localhost:8080/Customer/search/${searchValue}`);
    //         const data = await response.json();
    //         console.log(data);
    //         setDatasource(data);
    //
    //     }
    //     catch (error) {
    //         console.error(error);
    //     }
    const searchcustomer = async () => {
        if(searchValue==""){
            fetchDatacus();
            return;
        }

            const {error,data} = await supabase.from("customers").select("*").ilike("full_name",`%${searchValue}%`).eq("status",1);
            if(error)
            {
                console.log(error)
            }
            console.log(data);
            setDatasource(data);



    }
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
    const openEditForm = () => {
        EditformRef.current.style.display = "block";
        EditformRef.current.style.border = "2px solid black"
        backgroundRef.current.style.filter = "blur(6px)";
        backgroundRef.current.style.display = "none"
        backgroundRef.current.style.pointerEvents = "none"; // ngăn click nền
    };
    const closeForm = () => {

        formRef.current.style.display = "none";
        formRef.current.style.border = "none";
        backgroundRef.current.style.filter = "none";
        backgroundRef.current.style.display = "block";
        backgroundRef.current.style.pointerEvents = "auto";
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
               <Button  color="blue" variant="solid" onClick={   ()=>{   getcustomerwithid(record.customer_id);openEditForm();}}> Sửa</Button>
               <Button color="red" variant="solid" onClick={()=>deleteCustomer(record.customer_id) }>Xóa</Button>
               </Space>
           ),
            key: 'action',

        }
    ];
    useEffect(() => {
        fetchDatacus();
    },[] );
    useEffect(() =>{
        searchcustomer()
    },[searchValue]);
    return (
        <>
            <div className="w-250 ml-100 flex text-center justify-center flex-col" ref={backgroundRef}>
                <div className="flex text-left justify-between items-center">
                    <h2 className="font-sans font-bold text-2lg m-2">Khách Hàng</h2>

                    <Button color="default" variant="solid" onClick={() =>{openForm()}}>Thêm Khách Hàng</Button>
                </div>
                <div className="flex text-left m-2">
                <Input type="email" className="w-[15vw]" value={searchValue} onChange={(e) => {setSearchValue(e.target.value) }}/>

                </div>
                <Table dataSource={datasource} columns={columns} pagination={{pageSize: 5}} rowClassName={() => "text-center"} />

            </div>
            <div className="w-[45vw] h-[22vw] border-2 p-[2vw] rounded-2xl absolute top-[10vw] left-[32vw] hidden" ref={formRef}>

                 <Addcustomersform OnSend={closeForm} upload={handleSubmit}/>

            </div>
            <div className="w-[45vw] h-[22vw] border-2 p-[2vw] rounded-2xl absolute top-[10vw] left-[32vw] hidden" ref={EditformRef}>

                {   cus && <Editcustomersform OnSend={closeEditForm} customer={cus} reset={fetchDatacus}/>}

            </div>

        </>
    )

}
export default Customer;