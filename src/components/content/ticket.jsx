import Context from "../../../utils/context"
import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios"
import swalert from "../../../utils/swalert"

import "./ticket.css"
import { Navigate, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const Ticket = () => {

    const navigate = useNavigate();
    const endpoint = import.meta.env.VITE_API;
    const context = useContext(Context);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [update, setUpdate] = useState(false);
    const [query, setQuery] = useState("");

    const getData = async () => {
        if (!context.token) return false;
        try {
            const response = await axios.get(`${endpoint}/tickets/${page}`)
            response.data.data && setData(response.data.data)
        } catch (error) {
            return false;
        }
    }

    const deleteTicket = async (idcode) => {
        const res = await Swal.fire({
            icon                : "info",
            text                : "apakah kamu yakin ingin menghapus?",
            iconColor           : "var(--yellow)",
            color               : 'var(--yellow)',
            background          : 'var(--primary)',
            customClass         : { container: "alertext" },
            allowOutsideClick   : false,
            showDenyButton      : true,
            confirmButtonText   : "Batalkan",
            confirmButtonColor  : "var(--prime)",
            denyButtonText      : "Hapus",
        })
        if (res.isDenied) {
            try {
                const response = await axios.post(`${endpoint}/delete/ticket`, { idcode })
                response.data.data && swalert(response.data.data, 'success', 2000);
                return setUpdate(true);
            } catch (error) {
                error.response && swalert(error.response.data, 'error', 2000)
                return false;
            }
        } 
        return false;
    }

    const donwloadFile = async (url) => {
        try {
            const response = await axios.get(url, { responseType: 'blob' });
            const blobUrl = URL.createObjectURL(new Blob([response.data]));

            const parts = url.split('/');
            const dynamicName = parts[parts.length - 1];

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = blobUrl;
            a.download = `${dynamicName}.pdf`; 

            document.body.appendChild(a);
            a.click();

            document.body.removeChild(a);
        } catch (error) {
            return false;
        }
    }

    const previewTicket = async (data) => {
        const res = await Swal.fire({
            iconHtml            : `<div class="fa-solid fa-ticket fa-sm" style="font-size: 2.5rem;"><div/>`,
            iconColor           : "var(--yellow)",
            color               : 'var(--yellow)',
            background          : 'var(--primary)',
            customClass         : { container: "alertext" },
            showDenyButton      : true,
            showCloseButton     : true,
            allowOutsideClick   : false,
            confirmButtonText   : "Donwload",
            denyButtonText      : "Hapus",
            reverseButtons      : true,
            confirmButtonColor  : 'var(--prime)',
            html                : `
            <div style="width: 100%; overflow: scroll;">
                <table style="border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 10px; font-size: 1rem;">Nama</th>
                            <th style="padding: 10px; font-size: 1rem;">Code</th>
                            <th style="padding: 10px; font-size: 1rem;">Event</th>
                            <th style="padding: 10px; font-size: 1rem;">Tanggal dibuat</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding: 10px; color: var(--text); font-size: 1rem;">${data.name}</td>
                            <td style="padding: 10px; color: var(--text); font-size: 1rem;">${data.idcode}</td>
                            <td style="padding: 10px; color: var(--text); font-size: 1rem;">${data.event}</td>
                            <td style="padding: 10px; color: var(--text); font-size: 1rem;">${data.date}</td>
                        </tr>
                    </tbody>
                </table>
            </div>`
        })
        if (res.isConfirmed) {
            donwloadFile(data.file);
            return;
        }
        if (res.isDenied) {
            deleteTicket(data.idcode);
            return
        }
    }

    const searchData = async () => {
        try {
            if (!query) return;
            const response = await axios.get(`${endpoint}/search/tickets/${query}`)
            response.data.data && setData(response.data.data)
        } catch (error) {
            return false;
        }
    }

    useEffect(() => { 
        !query && getData();
        update && getData(); 
        update && setUpdate(false);
    }, [page, update, query])


    return (
        <div className='scroll-content' style={{display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '10px'}}>
            <form onSubmit={(e) => { e.preventDefault(); searchData() }} className="box-ticket" style={{ border: "1px solid var(--primary)", backgroundColor: 'unset', justifyContent: 'space-between', height: '50px', marginBottom: '10px', borderRadius: '30px' }}>
                <input className="input-search-ticket" onChange={(e) => setQuery(e.target.value)} type="text" placeholder="Cari ticket..." style={{width: '100%', height: '100%', backgroundColor: 'unset', color: 'var(--primary)',fontSize: '1rem', fontFamily: 'var(--mono)'}} />
                <div className="fa-solid fa-search fa-md" style={{ color: 'var(--primary)' }}></div>
                <button type="submit" style={{display: 'none'}}></button>
            </form>
            <div onClick={() => navigate('/create/ticket')} className="box-ticket" style={{ fontFamily: 'var(--poppins)', alignItems: 'center', border: "1px solid var(--primary)", cursor: "pointer", backgroundColor: 'var(--primary)', justifyContent: 'center', gap: '10px', color: 'var(--yellow)', height: '35px',  borderRadius: '30px' }}>
                <div className="fa-solid fa-circle-plus fa-lg"></div>
                <div style={{fontSize: '0.8rem'}}>Buat tiket</div>
            </div>
            {(!data.length) ? 
                <div className="box-ticket" style={{justifyContent: 'center', alignItems: 'center'}}>
                    <div className="box-ticket-event">Tidak ada data ticket</div>
                </div>
            : 
                (data.map((data, key) => {
                    return(
                        <div className="box-ticket" onClick={() => previewTicket(data)} key={key}>
                            <div className="box-ticket-number">{key + 1}</div>
                            <div className="box-ticket-wrapper">
                                <div className="box-ticket-event">{data.name}</div>
                                <div className="box-ticket-user">{data.event} - {data.idcode}</div>
                            </div>
                            <div className="download-button" onClick={() => donwloadFile(data.file)}>
                                <div className="fa-solid fa-download fa-lg"></div>
                            </div>
                        </div>
                    )
                }))
            }
        </div>
    )
}

export default Ticket;