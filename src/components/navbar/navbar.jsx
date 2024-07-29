import { NavLink } from "react-router-dom"
import "./navbar.css"
import { useContext, useState } from "react"
import Context from "../../../utils/context"

const Navbar = () => {

    const context = useContext(Context);

    const showSidebarMobile = () => {
        const sideMobile = document.querySelector('.mobileSidebar')
        const content = document.querySelector('.content')
        sideMobile.classList.toggle('show')
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src="" alt="" className='img-logo'/>
                <div className='text-logo'>STRESSLO</div>
            </div>
            <div className='nav-item'>
                {/* <NavLink className="item">Pricing</NavLink> */}
                <NavLink to="/panduan" className="item">Guide</NavLink>
                <NavLink className="item">Report</NavLink>
                <NavLink className="item">Donate</NavLink>

                {(context.token) ? 
                <>
                    <NavLink className="item-mobile" to="/scanner">
                        <div className="fa-solid fa-expand fa-xl"/>
                    </NavLink>
                    <NavLink className="item-mobile" onClick={() => showSidebarMobile()}>
                        <div className="fa-solid fa-bars fa-xl"/>
                    </NavLink>
                </> :
                <>
                    <NavLink to="/panduan" className="item-mobile">
                        <div className="fa-solid fa-circle-info fa-xl"/>
                    </NavLink>
                </>
                }
                {/* <NavLink className="item-mobile">
                    <div className="fa-solid fa-map fa-lg"/>
                </NavLink>
                <NavLink className="item-mobile">
                    <div className="fa-solid fa-triangle-exclamation fa-lg"/>
                </NavLink> */}
            </div>
            <div className="nav-user">
                <NavLink to="/scanner" className="user">
                    <div className="fa-solid fa-expand fa-md"></div>
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar