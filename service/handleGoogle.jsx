import axios from 'axios';
import React from 'react'
import { BarLoader } from 'react-spinners';
import { useLocation } from 'react-router-dom'
import Context from '../utils/context';
import swalert from '../utils/swalert';
import Loader from '../utils/loader';

const HandleGoogle = () => {

    const [ loading, setLoading ] = React.useState(false)

    const location = useLocation();
    const width = window.innerWidth;
    const context = React.useContext(Context);
    const endpoint = import.meta.env.VITE_API;
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    
    const authGoogleCallback = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${endpoint}/auth/google/callback?code=${code}`)
            response.data.token && context.setToken(response.data.token);
            window.location.href = '/events';
        } catch (error) {
            if (error || error.response) {
                const res = await swalert(error.response.data, 'error', 2500);
                if (res.dismiss || res.isDismissed) return window.location.href = '/register';
            }
        } finally {
            setLoading(false);
        }
    }

    React.useEffect(() => { authGoogleCallback(); }, [])

    return (
        <> {(loading) && <Loader/>} </>
    )
}

export default HandleGoogle