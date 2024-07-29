import { useContext, useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import Context from "../../../utils/context"
import swalert from "../../../utils/swalert"
import axios from "axios"
import "./sidebar.css"

const Sidebar = () => {

    const navigate = useNavigate();
    const endpoint = import.meta.env.VITE_API;
    const context = useContext(Context)

    const logout = async () => {
        try {
            context.setLoading(true)
            const response = await axios.get(`${endpoint}/logout`)
            await swalert(response.data.data, "success", 2500)
            location.reload();
        } catch (error) {
            return Promise.reject(error);
        } finally {
            context.setLoading(false)
        }
    }

    return (
        <div>
            <div className="sidebar">
                <div>
                    <div className="top-sidebar" onClick={() => (!context.token) && navigate('/login')}>
                        <div className="fa-solid fa-circle-user fa-xl"/>
                        <div className="side-text">{(context.name) ? context.name : "Sign in"}</div>
                    </div>
                    <div className="mid-sidebar">
                        <NavLink className="mid-item" to="/review">
                            <div className="fa-solid fa-chart-simple fa-lg"></div>
                            <div className="side-text">Review</div>
                        </NavLink>
                        <NavLink className="mid-item" to="/events">
                            <div className="fa-solid fa-calendar-days fa-lg"></div>
                            <div className="side-text">Events</div>
                        </NavLink>
                        <NavLink className="mid-item" to="/tickets">
                            <div className="fa-solid fa-ticket fa-md"></div>
                            <div className="side-text">Tickets</div>
                        </NavLink>
                        <NavLink to="/scanner" className="mid-item">
                            <div className="fa-solid fa-expand fa-lg"></div>
                            <div className="side-text">QR Scan</div>
                        </NavLink>
                    </div>
                </div>
                {(context.token) ?
                    <div className="bot-sidebar" onClick={() => logout()}>
                        <div className="fa-solid fa-right-from-bracket fa-lg"></div>
                        <div className="side-text">Log out</div>
                    </div>
                    :
                    <div className="bot-sidebar" onClick={() => navigate('/login')}>
                        <div className="fa-solid fa-right-to-bracket fa-lg"></div>
                        <div className="side-text">Sign in</div>
                    </div>
                } 
            </div>
        </div>
    )
}

export default Sidebar