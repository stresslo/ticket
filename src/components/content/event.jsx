import { useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router";
import Context from "../../../utils/context"
import axios from "axios";
import moment from "moment";
import "./event.css"
import swalert from "../../../utils/swalert";

const Event = () => {

    const navigate = useNavigate();
    const endpoint = import.meta.env.VITE_API;
    const context = useContext(Context)
    const [data, setData] = useState([])
    const [query, setQuery] = useState("");

    const searchData = async () => {
        try {
            if (!query) return;
            const response = await axios.get(`${endpoint}/search/events/${query}`);
            response.data.data && setData(response.data.data);
        } catch (error) {
            return false;
        }
    }
    
    useEffect(() => {
        if (context.token && !query) {
            axios.get(`${endpoint}/events`)
            .then((response) => response.data.data ? setData(response.data.data) : "")
            .catch((error) => { return Promise.reject(error) })
        }
    }, [query])

    return (
        <div className='scroll-content' style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
            <form onSubmit={(e) => { e.preventDefault(); searchData() }} className="box-ticket" style={{ border: "1px solid var(--primary)", backgroundColor: 'unset', justifyContent: 'space-between', height: '50px', marginBottom: '10px', borderRadius: '30px' }}>
                <input onChange={(e) => setQuery(e.target.value)} className="input-search-ticket" type="text" placeholder="Cari event..." style={{width: '100%', height: '100%', backgroundColor: 'unset', color: 'var(--primary)',fontSize: '1rem', fontFamily: 'var(--mono)'}} />
                <div className="fa-solid fa-search fa-md" style={{ color: 'var(--primary)' }}></div>
                <button type="submit" style={{display: 'none'}}></button>
            </form>
            <div onClick={() => navigate('/create/event')} className="box-ticket" style={{ fontFamily: 'var(--poppins)', alignItems: 'center', border: "1px solid var(--primary)", cursor: "pointer", backgroundColor: 'var(--primary)', justifyContent: 'center', gap: '10px', color: 'var(--yellow)', height: '35px',  borderRadius: '30px' }}>
                <div className="fa-solid fa-circle-plus fa-lg"></div>
                <div style={{fontSize: '0.8rem'}}>Buat event</div>
            </div>
            {(data.length != 0) && 
                (data.map((data, key) => {
                    return (
                        <div className="box" key={key} onClick={() => navigate('/detail/event', { state: { ...data } })}>
                            <div className="ititle">{data.event}</div>
                            <div className="total-event">Dibuat {moment(data.createdAt).format("DD MMM YYYY")}</div>
                            <div className="button-event">Tap untuk melihat</div>
                        </div>
                    )
                }))
            }
        </div>
    )
}

export default Event