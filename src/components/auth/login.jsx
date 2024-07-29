import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners";
import Context from "../../../utils/context";
import axios from "axios";
import "./login.css"

const Login = () => {

    const context = useContext(Context)
    const navigate = useNavigate();
    const api = import.meta.env.VITE_API;
    const [loading, setLoading] = useState(false)

    const [via, setVia] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("")

    const login = async () => {
        try {
            setLoading(true);
            if (!email || !password) return setMessage("mohon lengkapi data");
            const response = await axios.post(`${api}/login`, { email, password });
            response.data.token && context.setToken(response.data.token);
            window.location.href = '/events'
        } catch (error) {
            error.response && setMessage(error.response.data);
            return false;
        } finally {
            setLoading(false)
        }
    }


    const authGoogle = async () => {
        try {
            const response = await axios.get(`${api}/auth/google`)
            window.location.href = response.data
        } catch (error) {
            return false;
        }
    }

    return (
        <div className="auth-page">
            <div className="back-container" onClick={() => navigate('/review')}>
                <div className="fa-solid fa-arrow-left fa-lg"></div>
                <div className="ititle" style={{fontSize: '0.9rem'}}>Kembali</div>
            </div>
            <div className="auth-container">
                {(message) && <div style={{font: "0.9rem sans-serif", marginBottom: '30px'}}>ⓘ {message}</div>}
                <img src="/img/auth.png" loading="lazy" alt="" className="auth-img" />
                {(loading) ? <BarLoader width={200}/> :
                <div className="ititle" style={{fontSize: '1.3rem'}}>Sign in</div>
                // <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', gap: '40px'}}>
                //     <i style={{cursor: 'pointer'}} onClick={() => googleAuth()} className="fa-brands fa-google fa-xl"></i>
                // </div>
                }
                {(!via) && 
                <div className='auth-button-container' style={{ flexDirection: 'column', marginTop: '30px' }}>
                    <div onClick={() => authGoogle()} className='button' style={{borderRadius: '4px', backgroundColor: 'unset', border: '1px solid #ccc', width: "100%", gap: '10px'}}>
                        <img src="/img/google.png" width={18} alt="" />
                        <div style={{fontSize: '0.9rem', fontFamily: 'sans-serif', color: 'var(--primary)'}}>Lanjutkan dengan Google</div>
                    </div>
                    <div onClick={() => setVia("email")} className='button' style={{borderRadius: '4px', backgroundColor: 'unset', border: '1px solid #ccc', width: "100%", gap: '10px'}}>
                        <div className="fa-solid fa-envelope fa-lg" style={{color: 'var(--primary)'}}></div>
                        <div style={{fontSize: '0.9rem', fontFamily: 'sans-serif', color: 'var(--primary)'}}>Lanjutkan dengan Email</div>
                    </div>
                    <div style={{fontFamily: 'sans-serif', fontSize: '0.85rem', marginTop: '20px'}}>Belum punya akun? <span onClick={() => navigate('/register')}>Sign up</span></div>
                </div>
                }
                {(via == 'email') && 
                    <>
                    <div className="input-container" style={{ marginTop: '10px' }}>
                        <div className="input-title">Email :</div>
                        <input value={email} onChange={(e) => {setEmail(e.target.value); setMessage("")}} type="text" className="input"/>
                    </div>
                    <div className="input-container">
                        <div className="input-title">Password :</div>
                        <input value={password} onChange={(e) => {setPassword(e.target.value); setMessage("")}} type="password" className="input"/>
                    </div>
                    <div className="auth-button-container">
                        <div className="button" onClick={() => setVia("")} style={{backgroundColor: 'unset', border: '1px solid var(--primary)', color: 'var(--primary)'}}> <div className="fa-solid fa-arrow-left fa-lg"></div></div>
                        <div style={{ width: '100%' }} className="button" onClick={() => login()}>Masuk</div>
                    </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Login