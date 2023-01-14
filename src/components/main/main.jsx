import { useParams } from 'react-router-dom'

import Login from '../login/login'
import Register from '../register/register'

function Main({ page, setPage }) {
    const { temptoken, key, notification_token } = useParams()

    return (
        <>
            {
                page ? (<Login temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
                    : (<Register temptoken={temptoken} app_key={key} notification_token={notification_token} setPage={setPage} />)
            }
        </>
    )
}

export default Main