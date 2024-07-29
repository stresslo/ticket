import axios from 'axios';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarLoader } from 'react-spinners';

const Register = () => {

    const api = import.meta.env.VITE_API;
    const navigate = useNavigate()

    const [otp, setOtp] = useState("")
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [wrong, setWrong] = useState("");
    
    const [success, setSuccess] = useState(localStorage.getItem('reg_success') || "");
    const [status, setStatus] = useState(localStorage.getItem('reg_status') || 0);
    const [count, setCount] = useState(parseInt(localStorage.getItem('reg_count')) || 1);
    const [name, setName] = useState(localStorage.getItem('reg_team') || "")
    const [email, setEmail] = useState(localStorage.getItem('reg_email') || "");
    const [password, setPassword] = useState(localStorage.getItem('reg_password') || "");
    const [confirmPassword, setConfirmPassword] = useState(localStorage.getItem('reg_confirmPassword') || "");

    const register = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${api}/register`, { name, email, password, confirmPassword });
            localStorage.setItem('reg_success', response.data)
            localStorage.setItem('reg_status', 200);
            setSuccess(response.data);
            setCount(count + 1);
            setStatus(200);
        } catch (error) {
            error.response && setMessage(error.response.data);
            return false;
        } finally {
            setLoading(false)
        }
    }

    const confirmRegister = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${api}/confirm`, { otp })
            localStorage.setItem('reg_success', response.data)
            localStorage.setItem('reg_status', 201);
            setSuccess(response.data);
            setStatus(201);
        } catch (error) {
            error.response && setWrong(error.response.data)
            return false;
        } finally {
            setLoading(false)
        }
    }

    const checkCredential = async (email, name) => {
        setLoading(true)
        try {
            if (email) {
                await axios.get(`${api}/check/email/${email}`);
                localStorage.setItem('reg_email', email);
                setCount(count + 1);
            } 
            if (name) {
                await axios.get(`${api}/check/name/${name}`);
                localStorage.setItem('reg_team', name)
                setCount(count + 1)
            }
            
        } catch (error) {
            error.response && setMessage(error.response.data);
            return false;
        } finally {
            setLoading(false)
        }

    }

    const handleNext = async () => {
        switch (true) {
            case email && count == 1 :
                await checkCredential(email)
                break;
            case name && count == 2 :
                await checkCredential("", name)
                break;
            case password && confirmPassword && count == 3 :
                if (password !== confirmPassword) return setError("password dan konfirmasi password tidak cocok")
                localStorage.setItem('reg_password', password);
                localStorage.setItem('reg_confirmPassword', confirmPassword);
                await register();
                break;
            case otp && count == 4 :
                await confirmRegister();
                break;
            default:
                setError("mohon lengkapi data")
                break;
        }
    }

    const clearData = () => {
        localStorage.removeItem('reg_team');
        localStorage.removeItem('reg_email');
        localStorage.removeItem('reg_count');
        localStorage.removeItem('reg_status');
        localStorage.removeItem('reg_success');
        localStorage.removeItem('reg_password');
        localStorage.removeItem('reg_confirmPassword');
    }

    const authGoogle = async () => {
        try {
            const response = await axios.get(`${api}/auth/google`)
            window.location.href = response.data
        } catch (error) {
            return false;
        }
    }

    useEffect(() => { localStorage.setItem('reg_count', count); setError(""); setMessage("") }, [count])

    return (
        <div className="auth-page">
            <div className="back-container" onClick={() => { clearData(); navigate('/review') }}>
                <div className="fa-solid fa-arrow-left fa-lg"></div>
                <div className="ititle" style={{fontSize: '0.9rem'}}>Kembali</div>
            </div>
            <div className="auth-container">
                {(error || message && status == 0) && <div style={{font: "0.9rem sans-serif", marginBottom: '30px'}}>ⓘ {error || message}</div>}
                {(wrong) &&  <div style={{font: "0.9rem sans-serif", marginBottom: '30px'}}>ⓘ {wrong}</div>}
                <img src="/img/auth.png" alt="" className="auth-img" />
                {(loading) ? <BarLoader width={200}/>
                : 
                (status == 200 || status == 201) ? 
                <>
                {(status == 200) && <div className="ititle" style={{fontSize: '1.4rem'}}>Verifikasi OTP</div>}
                {(status == 201) && <div className="ititle" style={{fontSize: '1.4rem'}}>Halo Stresser!</div>}
                {(success && status == 200) && <div style={{font: "0.85rem var(--quicksand)", color: 'var(--primary)' ,marginTop: '5px', textAlign: 'center'}}>{success}</div>}
                {(success && status == 201) && <div style={{font: "0.85rem var(--quicksand)", color: 'var(--primary)' ,marginTop: '5px', textAlign: 'center'}}>{success}</div>}
                </>
                :
                <>
                <div className="ititle" style={{fontSize: '1.4rem'}}>Sign up</div>
                {/* <div className='auth-button-container'>
                    <div onClick={() => authGoogle()} className='button' style={{borderRadius: '4px', backgroundColor: 'unset', border: '1px solid #ccc', width: "100%", gap: '10px'}}>
                        <img src="/img/google.png" width={18} alt="" />
                        <div style={{fontSize: '0.9rem', fontFamily: 'sans-serif', color: 'var(--primary)'}}>Lanjutkan dengan Google</div>
                    </div>
                </div> */}
                </>
                }
                {(count == 1) && 
                    <div className="input-container" style={{ marginTop: '30px' }}>
                        <div className="input-title">Email :</div>
                        <input onChange={(e) => {setEmail(e.target.value); setError(""); setMessage("")}} value={email} type="email" className="input"/>
                    </div>
                }
                {(count == 2) && 
                    <div className="input-container" style={{ marginTop: '30px' }}>
                        <div className="input-title">Nama Tim :</div>
                        <input onChange={(e) => {setName(e.target.value); setError(""); setMessage("")}} value={name} type="text" className="input"/>
                    </div>
                }
                {(count == 3) && 
                <>
                    <div className="input-container" style={{ marginTop: '30px' }}>
                        <div className="input-title">Password :</div>
                        <input onChange={(e) => {setPassword(e.target.value); setError(""); setMessage("")}} value={password} type="password" className="input"/>
                    </div>
                    <div className="input-container">
                        <div className="input-title">Konfirmasi Password :</div>
                        <input onChange={(e) => {setConfirmPassword(e.target.value); setError(""); setMessage("")}} value={confirmPassword} type="password" className="input"/>
                    </div>
                </>
                }
                {(count == 4 && status == 200) && 
                    <div className="input-container" style={{ marginTop: '30px' }}>
                        <div className="input-title">Kode OTP :</div>
                        <input onChange={(e) => {setOtp(e.target.value); setError(""); setMessage(""); setWrong("")}} value={otp} type="text" className="input"/>
                    </div>
                }
                {(count == 4 && status == 200) ? 
                <div className="auth-button-container" style={(count == 1) ? { justifyContent: 'space-between'} : { justifyContent: 'center' }}>
                    <div className="button" style={{width: '100%'}} onClick={() => handleNext()}>Konfirmasi</div>
                </div>
                : 
                (status != 201) &&
                <>
                <div className="auth-button-container" style={(count == 1) ? { justifyContent: 'space-between'} : { justifyContent: 'center' }}>
                    {(count != 1) && <div className="button" onClick={() => setCount(count - 1)} style={{backgroundColor: 'unset', border: '1px solid var(--primary)', color: 'var(--primary)'}}>Kembali</div>}
                    {(count == 1) && <div onClick={() => authGoogle()} className='button' style={{ backgroundColor: 'unset', border: '1px solid #ccc', borderRadius: '4px' }}> <img src="/img/google.png" width={18} alt="" /></div>}
                    <div className="button" style={{width: "100%", borderRadius: '4px'}} onClick={() => handleNext()}>Berikutnya</div>
                </div>
                <div style={{fontFamily: 'sans-serif', fontSize: '0.85rem', marginTop: '20px'}}>Sudah punya akun? <span onClick={() => navigate('/login')}>Sign in</span></div>
                </>
                }
                {(status == 201) &&
                <div className="auth-button-container" style={(count == 1) ? { justifyContent: 'space-between'} : { justifyContent: 'center' }}>
                    <div className="button" style={{width: '100%'}} onClick={() => {navigate('/login'); clearData()}}>Mulai sekarang</div>
                </div>
                }
            </div>
        </div>
    )
}

export default Register