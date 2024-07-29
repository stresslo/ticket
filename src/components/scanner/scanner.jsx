import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import swalert from '../../../utils/swalert'
import QrScanner from 'qr-scanner'
import axios from 'axios'

import "./scanner.css"
import Back from '../control/back'
import Context from '../../../utils/context'

const Scanner = () => {
    const context = useContext(Context);
    const endpoint = import.meta.env.VITE_API;
    const navigate = useNavigate();

    const [code, setCode] = useState('');
    const [data, setData] = useState('');
    const [isScan, setIsScan] = useState(false);

    const getScan = async () => {
        const view = document.getElementById('scanview')
        const scanner = new QrScanner(view, async (result) => {
            try {
                setCode(result.data);
                scanner.destroy();
                const response = await axios.post(`${endpoint}/verify/ticket`, { idcode : result.data })
                response.data.data && setData(response.data.data);
                const alert = await swalert(response.data.message, "success", 3000)
                if (alert.dismiss || alert.isDismissed) return getScan();
            } catch (error) {
                if (error.response) {
                    const alert = await swalert(error.response.data, "error", 3000)
                    if (alert.dismiss || alert.isDismissed) return getScan();
                } 
                else {
                    return false;
                }
            }
        }, {
            maxScansPerSecond : 2,
            highlightScanRegion : true,
            returnDetailedScanResult : true,
        })
        await scanner.start()
    }

    return (
        <div className='global-page'>
            <Back/>
            <div className='global-container' style={{display: 'flex', justifyContent: "center", alignItems: "center", flexDirection: "column", gap: "30px", height: '100%'}}>
                <div className='box-scanner'><video id='scanview'></video></div>
                {(!context.token) && <div className='ititle'>Login untuk memulai</div>}
                {(!isScan && context.token) && <div className='button' onClick={() => {setIsScan(true); getScan();}} style={{width: "300px"}}>Scan QR</div>}
                {(data) && <div className='button' onClick={() => navigate('/scan/result', { state: data })} style={{width: "300px"}}>Hasil Scan</div>}
            </div>
        </div>
        // <div className='auth-page'>
        //     <div className="back-container" onClick={() => navigate('/review')}>
        //         <div className="fa-solid fa-arrow-left fa-lg"></div>
        //         <div className="ititle" style={{fontSize: '0.9rem'}}>Dashboard</div>
        //     </div>
        //     <div className='auth-container' style={{flexDirection: 'row', width: "max-content"}}>
        //         <div className="box-scanner">
        //             <video id='scanview'></video>
        //         </div>
        //         <div className="box-scanner"></div>
        //     </div>
        // </div>
    )
}

export default Scanner