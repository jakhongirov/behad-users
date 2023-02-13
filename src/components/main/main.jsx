import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [location, setLocation] = useState()
    const [ip, setIp] = useState()
    const [code, setCode] = useState('uz')

    useEffect(() => {
        fetch('https://geolocation-db.com/json/a9e48c70-8b22-11ed-8d13-bd165d1291e3')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setLocation(data)
                    setCode(data?.country_code.toLowerCase())
                    setIp(data?.IPv4)
                }
            })
            .catch(e => console.log(e))
    }, [])

    useEffect(() => {
        if (location) {
        }
    }, [location])

    return (
        <>
            {

                !page ? (<Login code={code} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
                    : (<Register code={code} ip={ip} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
            }
        </>
    )
}

export default Main