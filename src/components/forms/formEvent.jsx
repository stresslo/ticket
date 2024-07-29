import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { BarLoader } from 'react-spinners';
import DatePicker from 'react-datepicker';
import swalert from '../../../utils/swalert';
import samplePDF from "../../../utils/samplePDF"
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"

const FormEvent = () => {

    const endpoint = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const pdfRef = useRef(null);

    const [ loading, setLoading ] = useState(false)
    const [ startDate, setStartDate ] = useState(null);
    const [ endDate, setEndDate ] = useState(null);

    const [ name, setName ] = useState("");
    const [ pdf, setPdf ] = useState("");

    const createEvent = async () => {
        try {
            setLoading(true);
            let data = new FormData();
            startDate && data.append('start', startDate.toISOString());
            endDate && data.append('end', endDate.toISOString());
            name && data.append('event', name);
            pdf && data.append('pdf', pdf);
            const response = await axios.post(`${endpoint}/events`, data);
            const res = await swalert(response.data.data, "success", 3000)
            res.isDismissed && navigate('/events')
        } catch (error) {
            error.response && await swalert(error.response.data, "info", 3000);
            return Promise.reject(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="back-container" onClick={() => navigate(-1)}>
                <div className="fa-solid fa-arrow-left fa-lg"></div>
                <div className="ititle" style={{fontSize: '0.9rem'}}>Kembali</div>
            </div>
            <div className="auth-container" style={{gap: '20px'}}>
                {/* <img src="/img/auth.png" loading="lazy" alt="" className="auth-img" /> */}
                {(loading) && <BarLoader width={200}/>}
                <div className="input-container" style={{ marginTop: '30px' }}>
                    <div className="input-title">Nama Event :</div>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" className="input"/>
                </div>
                <div className="input-container">
                    <div className="input-title">Tanggal Mulai :</div>
                    <DatePicker showMonthDropdown className='input' selected={startDate} onChange={date => { setStartDate(date) }} dateFormat="d MMM YYYY"/>
                </div>
                <div className="input-container">
                    <div className="input-title">Tanggal Berakhir :</div>
                    <DatePicker showMonthDropdown className='input' selected={endDate} onChange={date => { setEndDate(date) }} dateFormat="d MMM YYYY"/>
                </div>
                <div className='input-container' style={{marginTop: "20px", position: 'relative'}}>
                    <div onClick={() => pdfRef.current.click()} className='box' style={{ background: 'unset', border: "1px dashed var(--primary)", justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
                        {(pdf) ? 
                        <div className='fa-solid fa-check fa-xl'></div>
                        : 
                        <div className='fa-solid fa-file fa-xl'></div>
                        }
                        <div style={{fontSize: "0.8rem"}}>PDF Template</div>
                    </div>
                    <input type="file" onChange={(e) => setPdf(e.target.files[0])} hidden ref={pdfRef}/>
                    <div onClick={() => samplePDF()} style={{position: 'absolute', bottom: "-5px", right: '-5px'}}>
                        <div className='fa-solid fa-circle-info fa-xl'></div>
                    </div>
                </div>
                <div className="auth-button-container">
                    <div style={{ width: '100%', gap: '10px' }} className="button" onClick={() => createEvent()}>
                        <div className='fa-solid fa-circle-plus fa-lg'></div>
                        <div>Tambahkan</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormEvent