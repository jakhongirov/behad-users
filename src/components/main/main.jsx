import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [geolocation, setGeolocation] = useState()
    const [ip, setIp] = useState('')
    const [code, setCode] = useState('uz')
    const [char, setChar] = useState()
    const [refresh, setRefresh] = useState(0)

    const makeCode = (length) => {
        let characters = '123';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
           return setChar(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
    }

    useEffect(() => {
        makeCode(1)
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setCode(data?.country_code.toLowerCase())
                    setIp(data?.ip)
                }
            })
            .catch(e => {
                console.log(e)
                setRefresh(Number(refresh) + 1)
            })
    }, [refresh])

    useEffect(() => {
        if (ip.split('').length > 0) {
            console.log(char);
            if (char === '1') {
                fetch(`https://ipinfo.io/${ip}?token=2cb6b60ad001d9`)
                    .then(res => res.json())
                    .then(data => { setGeolocation(data); })
                    .catch(e => console.log(e))
            } else if (char === '2') {
                fetch(`https://ipinfo.io/${ip}?token=2c78dced689a96`)
                    .then(res => res.json())
                    .then(data => { setGeolocation(data); })
                    .catch(e => console.log(e))
            } else if (char === '3') {
                fetch(`https://ipinfo.io/${ip}?token=3078b8054d8815`)
                    .then(res => res.json())
                    .then(data => { setGeolocation(data); })
                    .catch(e => console.log(e))
            }
        }


    }, [ip, char])

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