import { MdDashboard, MdOutlineShoppingBag } from "react-icons/md";
import { BsCart2, BsLink45Deg } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";


const data = [
    {
        title: "לוח בקרה",
        icon: <MdDashboard className="icon" />,
        path: "/dashboard",
    },
    {
        title: "הזמנות",
        icon: <MdOutlineShoppingBag className="icon" />,
        path: "/orders",
    },
    {
        title: "מוצרים",
        icon: <BsCart2 className="icon" />,
        path: "/products",
    },
    {
        title: 'קטגוריות',
        icon: <BiCategory className="icon" />,
        path: '/categories'
    },
    {
        title: "לקוחות",
        icon: <FaUsers className="icon" />,
        path: "/customers",
    },
    {
        title: "החנות שלי",
        icon: <BsLink45Deg className="icon" />,
        path: "/",
    },
];

export default data;