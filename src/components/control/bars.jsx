import React from 'react'
import { useLocation } from 'react-router-dom'

import "./bars.css"

const Bars = () => {

    const path = location.pathname;

    return (
        <div className='bars'>
            {(path == '/events') && 
                <div className='bars-menu'>
                    <div className='fa-solid fa-circle-plus fa-lg'></div>
                    <div className='bars-text'>Buat event</div>
                </div>

            }
            {(path == '/tickets') && 
                <div className='bars-menu'>
                    <div className='fa-solid fa-circle-plus fa-lg'></div>
                    <div className='bars-text'>Buat ticket</div>
                </div>

            }
        </div>
    )
}

export default Bars