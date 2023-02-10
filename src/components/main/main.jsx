import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [location, setLocation] = useState()
    const [geolocation, setGeolocation] = useState()
    const [code, setCode] = useState('uz')

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLocation(data)
                    setCode(data?.country_code.toLowerCase())
                }
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (location) {
            fetch(`https://ipinfo.io/${location?.ip}?token=0166032ebc35f8`)
                .then(res => res.json())
                .then(data => { setGeolocation(data); console.log(data); })
                .catch(e => console.log(e))
        }
    }, [location])

    return (
        <>
            {

                !page ? (<Login code={code} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
                    : (<Register code={code} geolocation={geolocation} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
            }
        </>
    )
}

export default Main