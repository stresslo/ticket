import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import Context from '../../../utils/context'
import swalert from '../../../utils/swalert'
import "./mobileSidebar.css"
import axios from 'axios'

const MobileSidebar = () => {

    const navigate = useNavigate();
    const context = useContext(Context);
    const endpoint = import.meta.env.VITE_API;

    const logout = async () => {
        try {
            context.setLoading(true)
            const response = await axios.get(`${endpoint}/logout`)
            await swalert(response.data.data, "success", 2500)
            location.reload();
        } catch (error) {
            return false;
        } finally {
            context.setLoading(false)
        }
    }

    const hideSidebar = () => {
        const sidebar = document.querySelector('.mobileSidebar')
        if (sidebar.classList.contains('show')) {
            sidebar.classList.remove('show')
        }
    }

    return (
        <div className='mobileSidebar' onClick={() => hideSidebar()}>
            <div>
                <div onClick={() => context.token ? '' : navigate('/login') } style={{display: "flex", gap: "10px", alignItems: 'center', fontFamily: "var(--poppins)", fontSize: "0.9rem", color: "var(--primary)", cursor: 'pointer'}}>
                    <div className='fa-solid fa-circle-user fa-lg'/>
                    <div>{context.name ? context.name : "Sign In"}</div>
                </div>
                <div className='mid-mobile-sidebar-container'>
                    <NavLink to="/review" className="mid-mobile-sidebar">
                        <div className='fa-solid fa-chart-simple fa-lg'></div>
                        <div>Review</div>
                    </NavLink>
                    <NavLink to="/events" className="mid-mobile-sidebar">
                        <div className='fa-solid fa-calendar-days fa-lg'></div>
                        <div>Events</div>
                    </NavLink>
                    <NavLink to="/tickets" className="mid-mobile-sidebar">
                        <div className='fa-solid fa-ticket fa-md'></div>
                        <div>Tickets</div>
                    </NavLink>
                    <NavLink to="/scanner" className="mid-mobile-sidebar">
                        <div className='fa-solid fa-expand fa-lg'></div>
                        <div>QR Scan</div>
                    </NavLink>
                </div>
            </div>
            <div className='mid-mobile-sidebar-container'>
                {(context.token) &&
                    <NavLink className="mid-mobile-sidebar" onClick={() => logout()}>
                        <div className='fa-solid fa-right-from-bracket fa-lg'></div>
                        <div>Log Out</div>
                    </NavLink>
                }
                <NavLink to="/panduan" className="mid-mobile-sidebar">
                    <div className='fa-solid fa-circle-info fa-lg'></div>
                    <div>Panduan</div>
                </NavLink>
            </div>
        </div>
    )
}

export default MobileSidebar