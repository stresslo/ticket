import React, { useEffect, useState } from 'react'

const HandlePremium = () => {

    const [ width, setWidth ] = useState(window.innerWidth);
    useEffect(() => { window.onresize = () => setWidth(window.innerWidth) }, [])

    return (
        <div id='handle-user' className='fix-content' style={{height : '80%'}}>
            <img src="/img/auth.png" style={(width <= 700) ? {width: '70%', margin: '0 auto'} : {width: '300px'}} loading="lazy" alt="" className="auth-img" />
            <div className="ititle" style={(width <= 335) ? {fontSize: '1.2rem'} : {fontSize: '1.2rem'}}>Upgrade premium</div>
        </div>
    )
}

export default HandlePremium