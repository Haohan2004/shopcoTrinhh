import Addproductform from "@/Components/Addproductform.jsx";
import {Button, Space} from "antd";
import Addorderform from "@/Components/Addorderform.jsx";
import {useState} from "react";

const Order = () => {

    return (
        <>



            <div className="w-[60vw] h-[36vw] border-2 p-[2vw] rounded-2xl absolute top-[6vw] left-[28vw] " >

            <Addorderform />

            </div>
        </>
    )
}
export default Order;