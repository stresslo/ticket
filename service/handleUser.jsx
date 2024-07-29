import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HandleUser = () => {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => { window.onresize = () => setWidth(window.innerWidth); }, [])

    return (
        <div id='handle-user' className='fix-content'>
            <img src="/img/auth.png" style={(width <= 700) ? {width: '70%', marginTop: '5px', margin: '0 auto'} : {width: '300px'}} loading="lazy" alt="" className="auth-img" />
            <div className="ititle" style={(width <= 335) ? {fontSize: '0.95rem', textAlign: "center"} : {fontSize: '1.2rem', textAlign: "center"}}>Buat, Atur, dan Verifikasi tiket dengan Mudah!</div>
            <div style={(width <= 700) ? {font: "0.85rem var(--quicksand)",lineHeight: "23px", color: 'var(--primary)' ,marginTop: '20px', textAlign: 'left'} :  {font: "0.9rem var(--quicksand)", color: 'var(--primary)' ,marginTop: '20px', textAlign: 'center', width: '400px'}}>
                <div style={{fontWeight: 'bold'}}>
                    Hi, Stresser!
                </div>
                <div style={{marginTop: '10px'}}>
                    buat kamu yang suka bikin event dan pengen verifikasi tiket dengan cepat sekarang bisa pake Stresslo Ticket.
                    Kamu bisa buat tiket, atur eventnya, sampai verifikasi tiket di depan pintu masuk lewat Smartphone mu.
                </div>
            </div>
            <div onClick={() => navigate('/login')} className='button' style={(width <= 700) ? {width: '100%', marginTop: '25px'} : { width: '300px', marginTop: '25px' }}>
                <div style={{fontSize: '0.8rem', fontFamily: 'var(--poppins)'}}>Coba sekarang</div>
                <div className='fa-solid fa-arrow-right fa-md'></div>
            </div>
        </div>
    )
}

export default HandleUser