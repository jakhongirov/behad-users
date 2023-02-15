import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [geolocation, setGeolocation] = useState()
    const [ip, setIp] = useState()
    const [code, setCode] = useState('uz')
    const [char, setChar] = useState('0')
    const [refresh, setRefresh] = useState(0)

    const makeCode = (length) => {
        let characters = '01';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            setChar(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
    }

    useEffect(() => {
        fetch('https://geolocation-db.com/json/a9e48c70-8b22-11ed-8d13-bd165d1291e3')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCode(data?.country_code.toLowerCase())
                    setIp(data?.IPv4)
                }
            })
            .catch(e => console.log(e))
    }, [refresh])

    useEffect(() => {
        if (ip) {
            makeCode(1)
            if (char === '0') {
                fetch(`https://ipinfo.io/${ip}?token=0166032ebc35f8`)
                    .then(res => res.json())
                    .then(data => { setGeolocation(data); })
                    .catch(e => console.log(e))
            } else if (char === '1') {
                fetch(`https://ipinfo.io/${ip}?token=2c78dced689a96`)
                    .then(res => res.json())
                    .then(data => { setGeolocation(data); })
                    .catch(e => console.log(e))
            }
        }
    }, [ip])

    return (
        <>
            {

                !page ? (<Login code={code} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
                    : (<Register code={code} refresh={refresh} setRefresh={setRefresh} geolocation={geolocation} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
            }
        </>
    )
}

export default Main