import './login.css'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Login() {
    const { temptoken, key, notification_token } = useParams()
    const [err, setErr] = useState(false)
    const [err1, setErr1] = useState(false)
    const navigate = useNavigate()
    const [location, setLocation] = useState()
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)

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

        fetch('http://users.behat.uz/api/login/' + temptoken + "/" + key + "/" + notification_token, requestOptions)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 401) {
                    setErr(true)
                } else if (data.status === 200) {
                    setModal(true)
                } else if (data.status === 404) {
                    setErr1(true)
                }
            })
            .catch((error) => console.log('error', error))
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className={!modal ? 'login__box' : "close"}>
                        <h1 className='login__title'>Kirish</h1>
                        <p className='login__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className='login__form__box'>
                            <form className='login__form' autoComplete='off' autoCapitalize='off' onSubmit={HandleSubmit}>
                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={location?.country_code.toLowerCase()}
                                        value={state?.phone}
                                        onChange={(phone) => { setState(phone); setErr1(false) }}
                                    />
                                    <span className={err1 ? 'forget__error__span' : 'close'}>{err1 ? "Telefon raqami ro'yhatdan o'tmagan" : ""}</span>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' minLength={6} required />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password" >
                                        Parol
                                    </label>
                                    <span className={err ? 'forget__error__span' : 'close'}>{err ? "Parol no'togri" : ""}</span>
                                </div>

                                <Link
                                    className="login__link"
                                    to={`/forget/${temptoken}/${key}/${notification_token}`}>
                                    Parolni unutdingizmi?
                                </Link>

                                <button className='login__btn'>KIrish</button>
                            </form>
                        </div>

                        <p className='login__text'>Akkountingiz yo'qmi? <span className='login__span' onClick={() => navigate(`/register/${temptoken}/${key}/${notification_token}`)}>Ro'yxatdan o'tish</span></p>
                    </div>

                    <div className={modal ? 'login__box' : "close"}>
                        <img className='image_check' src={Check} alt="check icon" />
                        <h2 className='login__title login__title--size'>Kirish muaffaqiyatli bajarildi, ilovaga qaytishingiz mumkin!</h2>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Login