import { MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { BsCart2 } from "react-icons/bs";
import { FaShopify, FaUsers } from "react-icons/fa";
import { BiCategory, BiLock } from "react-icons/bi";


const data = [
    {
        title: "לוח בקרה",
        icon: <MdDashboard className="icon" />,
        path: "/dashboard",
    },
    {
        title: 'קטגוריות',
        icon: <BiCategory className="icon" />,
        path: '/categories'
    },
    {
        title: "מוצרים",
        icon: <BsCart2 className="icon" />,
        path: "/products",
    },
    {
        title: "הזמנות",
        icon: <MdOutlineShoppingBag className="icon" />,
        path: "/orders",
    },
    {
        title: "לקוחות",
        icon: <FaUsers className="icon" />,
        path: "/customers",
    },
    {
        title: "הוספת משתמש אדמין",
        icon: <BiLock className="icon" />,
        path: "/addAdmin",
    },
    {
        title: "החנות שלי",
        icon: <FaShopify className="icon" />,
        path: "/",
    },
];

export default data;