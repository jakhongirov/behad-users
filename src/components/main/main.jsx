import { useState } from 'react'
import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()
    const [code, setCode] = useState('uz')


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