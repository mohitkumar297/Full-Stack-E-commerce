import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import Sidebardata from './Sidebardata';
import './sidebar.css';

function Sidebar() {
    const [sidebar, setsidebar] = useState(false)
    const showsidebar = () => {
        setsidebar(!sidebar)
    }
    return (
        <>
            <div className='sidebar'>
                <Link to='#' className='menu-bars'>
                    <FaIcons.FaBars onClick={showsidebar} />
                </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showsidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {Sidebardata.map((item,index) =>{
return (
    <li key={index} className={item.cName}>
        <Link to={item.path}>
            {item.icon}
            <span>{item.title}</span>
        </Link>
    </li>
)
                    })}
                </ul>
            </nav>
        </>
    )
}

export default Sidebar;
