import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HandleMaintenance = () => {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => { window.onresize = () => setWidth(window.innerWidth); }, [])

    return (
        <div id='handle-user' className='scroll-content' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '50px'}}>
            <img src="/img/server.png" style={(width <= 700) ? {width: '60%', marginTop: '5px', margin: '0 auto'} : {width: '260px'}} loading="lazy" alt="" className="auth-img" />
            <div className="ititle" style={(width <= 335) ? {fontSize: '0.95rem', textAlign: "center"} : {textAlign: "center", fontSize: '1.2rem'}}>Server Maintenance!</div>
            <div style={(width <= 700) ? {font: "0.95rem var(--quicksand)",lineHeight: "23px", color: 'var(--primary)' ,marginTop: '40px', textAlign: 'left'} :  {font: "1rem var(--quicksand)", color: 'var(--primary)' ,marginTop: '40px', textAlign: 'center', width: '550px'}}>
                <div style={{fontWeight: "bold"}}>
                    Hi, Stresser!
                </div>
                <div style={{marginTop: '10px'}}>
                    Maaf atas ketidaknyamanannya. Saat ini kami sedang melakukan pengembangan pada server untuk meningkatkan layanan. Proses ini bertujuan untuk memperbaiki fitur dan memastikan pengalaman pengguna yang lebih baik.
                </div>
                <div style={{marginTop: "10px"}}>
                    Kami akan menyelesaikan pengembangan ini secepat mungkin agar kalian dapat kembali menggunakan semua fitur dengan lancar.
                </div>
            </div>
        </div>
    )
}

export default HandleMaintenance