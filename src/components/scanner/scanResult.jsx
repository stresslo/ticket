import React from 'react'
import { useLocation } from 'react-router-dom'
import Back from '../control/back';

const ScanResult = () => {

    const location = useLocation();
    const data = location.state;
    console.log(data)

    return (
        <div className='global-page'>
            <Back/>
            <div className='global-container'>

            </div>
        </div>
    )
}

export default ScanResult