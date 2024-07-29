import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import bowser from 'bowser';

const HandleCookie = () => {

    const navigate = useNavigate();
    const [width, setWidth] = useState(window.innerWidth);
    
    const info = bowser.parse(window.navigator.userAgent)
    const name = info.browser.name;
    const version = info.browser.version;

    const os = {
        name : info.os.name,
        version : info.os.version,
        versionName : info.os.versionName
    }

    const endpoint = (name.toLowerCase() === 'safari') && 'https://support.apple.com/en-gb/guide/iphone/iphb01fc3c85/ios#:~:text=Control%20privacy%20and%20security%20settings,to%20allow%20cross%2Dsite%20tracking.' ||
                     (name.toLowerCase() === 'chrome') && 'https://support.google.com/accounts/answer/61416?hl=id&co=GENIE.Platform%3DDesktop&oco=1' ||
                     (name.toLowerCase() === 'firefox') && 'https://www-internetcookies-com.translate.goog/enable-cookies-firefox/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc' ||
                     (!name.toLowerCase().includes("safari" || "chrome" || "firefox")) && 'https://www-123formbuilder-com.translate.goog/docs/how-to-enable-third-party-cookies-in-your-web-browser/?_x_tr_sl=en&_x_tr_tl=id&_x_tr_hl=id&_x_tr_pto=tc'

    useEffect(() => { window.onresize = () => setWidth(window.innerWidth); }, [])

    return (
        <div id='handle-user' className='scroll-content' style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', marginTop: '50px'}}>
            <img src="/img/auth.png" style={(width <= 700) ? {width: '70%', marginTop: '5px', margin: '0 auto'} : {width: '300px'}} loading="lazy" alt="" className="auth-img" />
            <div className="ititle" style={(width <= 335) ? {fontSize: '1.2rem', textAlign: "center"} : {fontSize: '1.2rem', textAlign: "center"}}>Third-Party Cookie tidak Ditemukan!</div>
            <div style={(width <= 700) ? {font: "0.95rem var(--quicksand)",lineHeight: "24px", color: 'var(--primary)' ,marginTop: '40px', textAlign: "left"} :  {font: "1rem var(--quicksand)", color: 'var(--primary)' ,marginTop: '40px', textAlign: 'left', width: '500px'}}>
                <div style={{fontWeight: "bold"}}>
                    Hi, Stresser!
                </div>
                <div style={{marginTop: '10px'}}>
                    Stresslo Ticket membutuhkan Third-Party Cookies, kamu bisa aktifkan di pengaturan Browser-mu, atau kamu bisa coba menggunakan browser lain.
                </div>
                <div style={{marginTop: '30px'}}>
                    Device : {os.name} {os.version && "V." + os.version} <br />
                    Browser : {name} {version && "V." + version}
                </div>
                <div onClick={() => window.location.href = endpoint} className='button' style={(width <= 700) ? {width: '100%', marginTop: '25px'} : { width: '500px', marginTop: '25px' }}>
                    <div style={{fontSize: '0.8rem', fontFamily: 'var(--poppins)'}}>Pengaturan {name}</div>
                    <div className='fa-solid fa-arrow-right fa-md'></div>
                </div>
                <ul>
                    <div style={{fontFamily: 'var(--poppins)', color: 'var(--primary)', fontSize: "1rem", marginTop: '50px'}}>1. Mengapa Cookie Pihak Ketiga?</div>
                    <li><strong>Peningkatan Keamanan:</strong> Penggunaan cookie pihak ketiga membantu kami memastikan bahwa akses ke akunmu hanya dapat dilakukan oleh kamu sendiri. Ini menambah lapisan keamanan tambahan untuk melindungi data dan sesi Kamu dari akses yang tidak sah.</li>
                    <li><strong>Optimalisasi Kinerja:</strong> Penggunaan cookie pihak ketiga juga memungkinkan kami untuk mengoptimalkan kinerja situs. Dengan data yang dikumpulkan, kami dapat membuat penyesuaian untuk meningkatkan kecepatan dan responsivitas aplikasi, memberikan pengalaman pengguna yang lebih cepat dan lebih efisien.</li>
                    <li><strong>Pengalaman Pengguna yang Lancar:</strong> Dengan cookie pihak ketiga, Kamu tidak perlu sering memasukkan ulang informasi login atau pengaturan setiap kali Kamu berpindah halaman atau sesi. Ini menciptakan pengalaman yang lebih mulus dan nyaman, sehingga Kamu dapat fokus pada apa yang penting tanpa gangguan.</li>
                </ul>
            </div>
        </div>
    )
}

export default HandleCookie;