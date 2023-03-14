import './login.css'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Login({ code, temptoken, app_key, notification_token, setPage }) {
    const [err, setErr] = useState(false)
    const [err1, setErr1] = useState(false)
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const closeTab = () => {
        window.opener = null;
        window.open('', '_self');
        window.close();
    };

    const TrackPhone = () => {
        fetch("https://users.behad.uz/api/v1/UpdateTrackLogin", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accep': 'application/json'
            },
            body: JSON.stringify({
                type: 'phone'
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { password } = e.target.elements
        setDisabled(true)

        fetch('https://users.behad.uz/api/v1/login/' + temptoken + "/" + app_key + "/" + notification_token, {
            method: "POST",
            headers: {
                "Accep": "application/json",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"

            },
            body: JSON.stringify({
                phone: `+${state}`,
                password: password.value
            })
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 401) {
                    setErr(true)
                    setDisabled(false)
                } else if (data.status === 200) {
                    setModal(true)
                    closeTab();
                } else if (data.status === 404) {
                    setDisabled(false)
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
                        <p className='login__text'>Behad tizimida profilingizga kiring:</p>
                        <div className='login__form__box'>
                            <form className='login__form' autoComplete='off' autoCapitalize='off' onSubmit={HandleSubmit}>
                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={code}
                                        value={state?.phone}
                                        required={true}
                                        onFocus={TrackPhone}
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
                                    to={`/forget/${temptoken}/${app_key}/${notification_token}`}>
                                    Parolni unutdingizmi?
                                </Link>

                                <button className='login__btn' disabled={disabled}>KIrish</button>
                            </form>
                        </div>

                        <p className='login__text'>Akkountingiz yo'qmi? <span className='login__span' onClick={() => setPage(true)}>Ro'yxatdan o'tish</span></p>
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