import {Menu} from "antd";
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import HomeIcon from '@mui/icons-material/Home';
import {Link} from 'react-router-dom'
const Navbar = () => {
    const items = [
        {
            key: 'sub1',
            label: <Link to="/" >Trang Chủ</Link>,
            icon: <HomeIcon/> ,

        },
        {
            key: 'sub2',
            label: <Link to="/san-pham" >Sản Phẩm </Link>,
            icon: <ShoppingCartIcon />,

        },
        {
            key: 'sub3',
            label: <Link to="/khach-hang" >Khách Hàng</Link>,
            icon: <AppstoreOutlined />,

        },

        {
            key: 'sub4',
            label: <Link to="/don-hang" >Đơn Hàng</Link>,
            icon: <SettingOutlined />,

        },

    ];
    const onClick = e => {
        console.log('click ', e);
    };
    return (

        <Menu
            onClick={onClick}
            style={{ width: 300}}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}

        />
    );
}
export default Navbar;