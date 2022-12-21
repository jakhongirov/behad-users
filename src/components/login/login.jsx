import './login.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'

function Login() {
    const { temptoken, key, notification_token } = useParams()
    const [err, setErr] = useState(false)
    const navigate = useNavigate()
    const [location, setLocation] = useState()
    const [state, setState] = useState()

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => setLocation(data))
            .catch(e => console.log(e))
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { password } = e.target.elements

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const raw = JSON.stringify({
            phone: state.trim(),
            password: password.value.trim().toLowerCase(),
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch('http://192.168.7.168:8000/api/login/' + key + "/" + temptoken + "/" + notification_token, requestOptions)
            .then((response) => response.json())
            .then((data) => data.status === 401 ? setErr(true) : setErr(false), console.log(200))
            .catch((error) => console.log('error', error))
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className='login__box'>
                        <form autoComplete='off' onSubmit={HandleSubmit}>
                            <h1 className='login__title'>Log in to continue</h1>
                            <div className='login__input__box'>
                                <PhoneInput
                                    country={location?.country_code.toLowerCase()}
                                    value={state?.phone}
                                    onChange={phone => setState(phone)}
                                />
                            </div>
                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' minLength={6} required />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                    Password
                                </label>
                            </div>

                            <button className='login__btn'>Log In</button>
                        </form>
                        <button className='login__btn' onClick={() => navigate('/register' + "/" + temptoken + "/" + key + "/" + notification_token)}>Sign Up</button>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Login