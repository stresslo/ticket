import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import swalert from '../../../utils/swalert';
import moment from 'moment';

const FormTicket = () => {

    const endpoint = import.meta.env.VITE_API;
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

    const [ loading, setLoading ] = useState(false);
    const [ event, setEvent ] = useState(state ? state.event : "");
    const [ name, setName ] = useState("");
    const [ data, setData ] = useState([]);

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

    const createTicket = async () => {
        try {
            setLoading(true);
            const response = await axios.post(`${endpoint}/tickets`, { name, event, date: moment().format("DD MMM YYYY") })
            await swalert(response.data.data, 'success', 3000);
            setName("");
            response.data.file && donwloadFile(response.data.file)
        } catch (error) {
            error.response && swalert(error.response.data, "info", 2500);
            return false;
        } finally {
            setLoading(false);
        }
    }

    const getData = async () => {
        try {
            setLoading(true)
            const response = await axios.get(`${endpoint}/events`)
            response.data.data && setData(response.data.data);
            return;
        } catch (error) {
            return false;
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {getData()}, [])

    return (
        <div className="auth-page">
            <div className="back-container" onClick={() => navigate(-1)}>
                <div className="fa-solid fa-arrow-left fa-lg"></div>
                <div className="ititle" style={{fontSize: '0.9rem'}}>Kembali</div>
            </div>
            <div className="auth-container" style={{gap: '20px'}}>
                <img src="/img/auth.png" loading="lazy" alt="" className="auth-img" />
                {(loading) && <BarLoader width={200}/>}
                <div className="input-container" style={{ marginTop: '30px' }}>
                    <div className="input-title">Nama :</div>
                    <input value={name} onChange={(e) => {setName(e.target.value)}} type="text" className="input"/>
                </div>
                <div className='input-container'>
                    <div className='input-title'>Event : </div>
                    <select style={{width: '100%', marginTop: "10px", padding: '10px 15px', boxSizing: 'border-box'}} value={state ? state.event : event} onChange={(e) => setEvent(e.target.value)} required>
                        <option value="" disabled>-- PILIH EVENT --</option>
                        {(data.map((data, key) => {
                        return( <option value={data.event} key={key}>{data.event}</option>)
                        }))}
                    </select>
                </div>
                <div className="auth-button-container">
                    <div style={{ width: '100%', gap: '10px' }} className="button" onClick={() => createTicket()}>
                        <div className='fa-solid fa-circle-plus fa-lg'></div>
                        <div>Buat ticket</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FormTicket