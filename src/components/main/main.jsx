import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [code, setCode] = useState('uz')

        useEffect(() => {
            fetch("https://users.behad.uz/api/v1/UpdateTrackLogin", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Accep': 'application/json'
                },
                body: JSON.stringify({
                    type: 'entered'
                })
            })
                .then(res => res.json())
                .then(data => console.log(data))
                .catch(e => console.log(e))
        }, [])

    return (
        <>
            {

                !page ? (<Login code={code} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
                    : (<Register code={code} setCode={setCode} temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
            }
        </>
    )
}

export default Main