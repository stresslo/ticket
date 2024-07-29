import React from 'react'
import { BarLoader } from 'react-spinners'

const Loader = () => {

    const width = window.innerWidth;

    return (
        <div id='handle-user' className='fix-content'>
            <img src="/img/auth.png" style={(width <= 700) ? {width: '70%', marginTop: '5px', margin: '0 auto'} : {width: '300px'}} loading="lazy" alt="" className="auth-img" />
            <div className="ititle" style={(width <= 335) ? {fontSize: '0.95rem', textAlign: "center"} : {fontSize: '1.2rem'}}>Memuat konten</div>
            <div style={{width: '100%', height: 'max-content', display: 'flex', justifyContent: 'center'}}>
                <BarLoader color='var(--primary)' width={500}/>
            </div>
        </div>
    )
}

export default Loader;