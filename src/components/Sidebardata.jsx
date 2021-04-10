import React from 'react'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';

 const Sidebardata = [
    {
        title:'Products',
        path:'/allproducts',
        icon: <AiIcons.AiFillHome />,
        cName:'nav-text'
    },
    {
        title:'Categories',
        path:'/allcategories',
        icon: <AiIcons.AiFillCalculator/>,
        cName:'nav-text'
    },
    {
        title:'Users',
        path:'/users',
        icon: <AiIcons.AiFillProfile />,
        cName:'nav-text'
    },
    ,
    {
        title:'Orders',
        path:'/orders',
        icon: <AiIcons.AiFillProfile />,
        cName:'nav-text'
    },
    {
        title:'Add New Product',
        path:'/addnewproduct',
        icon: <AiIcons.AiFillProfile />,
        cName:'nav-text'
    }

]
export default Sidebardata;