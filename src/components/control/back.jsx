import React from 'react'
import { useNavigate } from 'react-router-dom'

const Back = ({ to, state }) => {

    const navigate = useNavigate();

    return (
        <div className="back-control">
            <div className='back-control-wrapper' onClick={() => navigate(-1)}>
                <div className='fa-solid fa-arrow-left fa-lg'/>
                <div className='ititle' style={{fontSize: "0.9rem"}}>Kembali</div>
            </div>
            {(to) && 
                <div className='create-control-wrapper' onClick={() => navigate(to, { state })}>
                    <div className='fa-solid fa-circle-plus fa-lg'></div>
                </div>
            }
        </div>
    )
}

export default Back