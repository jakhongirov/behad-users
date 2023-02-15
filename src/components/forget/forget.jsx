import "./forget.css"
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Forget({ setPage }) {
    const navigate = useNavigate()
    const [err, setErr] = useState(false)
    const [err1, setErr1] = useState(false)
    const [phone, setPhone] = useState(false)
    const [sms, setsms] = useState(false)
    const [location, setLocation] = useState()
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)
    const [bot, setBot] = useState(false)
    const [seconds, setSeconds] = useState(120);
    const timerId = useRef();

    useEffect(() => {
        if (phone) {
            setSeconds(120)

            timerId.current = setInterval(() => {
                setSeconds(prev => prev - 1)
            }, 1000);

            return () => clearInterval(timerId.current)
        }
    }, [phone]);

    useEffect(() => {
        if (seconds <= 0) {
            clearInterval(timerId.current)
            alert("Sms kodi foalsizlantirildi qayta urinib koring")
            setPhone(false)
        }
    }, [seconds])

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => setLocation(data))
            .catch(e => console.log(e))
    }, [])

    const HandleSubmit = (e) => {
        e.preventDefault();
        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Accep', 'application/json');


        const raw = JSON.stringify({
            phone: state
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        if (state.split('').slice(0, 3).join('') === '998') {
            fetch('https://users.behad.uz/api/v1/forgetPassword/phone', requestOptions)
                .then((response) => response.json())
                .then((data) => {
                    if (data.status === 404) {
                        setErr1(true)
                    } else if (data.status === 200) {
                        setPhone(true)
                        setErr(false)
                    } else {
                        console.log(data);
                    }
                })
                .catch((error) => console.log('error', error))
        } else {
            setBot(true)
        }
    }

    const HandleSubmitMessage = (e) => {
        e.preventDefault();
        const { sms } = e.target.elements

        const myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('Accep', 'application/json');

        const raw = JSON.stringify({
            phone: state,
            sms: sms.value.trim()
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
        };

        fetch("https://users.behad.uz/api/v1/forgetPassword/sms", requestOptions)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (data.status === 404) {
                    setErr(true)
                    sms.value = null
                } else if (data.status === 200) {
                    setPhone(false)
                    setsms(true)
                    setErr(false)
                    console.log(data);
                } else {
                    console.log(data);
                }
            })
            .catch((error) => console.log('error', error))
    }

    const HandleSubmitPassword = (e) => {
        e.preventDefault();
        const { password, password_again } = e.target.elements

        if (password.value.trim() === password_again.value.trim()) {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Access-Control-Allow-Origin', '*');
            myHeaders.append('Accep', 'application/json');


            const raw = JSON.stringify({
                phone: state,
                password: password.value.trim()
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch('https://users.behad.uz/api/v1/forgetPassword/password', requestOptions)
                .then((response) => response.json())
                .then((data) => data.status === 401 ? setErr(true) : setErr(false), setModal(true))
                .catch((error) => console.log('error', error))
        }
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className={!bot && !modal ? 'login__box' : "close"}>
                        <h1 className='login__title'>Parolni tiklash!</h1>
                        <p className='login__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className='login__form__box'>
                            <form className='login__form' autoComplete='off' autoCapitalize='off' onSubmit={phone ? HandleSubmitMessage : sms ? HandleSubmitPassword : HandleSubmit}>
                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={location ? location?.country_code.toLowerCase() : "uz"}
                                        value={state?.phone}
                                        onChange={phone => setState(phone)}
                                    />

                                    <span className={err1 ? 'forget__error__span' : 'close'}>{err1 ? "Telefon raqami topilmadi" : ""}</span>
                                </div>
                                <div className={phone ? 'login__input__box' : "close"}>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='sms' type="text" name='sms' maxLength={4} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="sms" >
                                        SMS kodni yozing
                                    </label>
                                    <p className="forget__timer_title">SMS kodi {seconds} sekunddan keyin faolsizlantiriladi!</p>
                                </div>
                                <div className={sms ? 'login__input__box' : "close"}>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' autoCapitalize='off' minLength={6} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Parol
                                    </label>
                                </div>
                                <div className={sms ? 'login__input__box' : "close"}>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password_again' type="password" name='password_again' autoCapitalize='off' minLength={6} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password_again">
                                        Parol qayta yozing
                                    </label>
                                </div>

                                <button className='login__btn'>Tasdiqlash</button>
                            </form>
                        </div>

                        <p className='login__text'>Akkountingiz yo'qmi? <span className='login__span' onClick={() => { navigate(-1); setPage(true) }}>Ro'yxatdan o'tish</span></p>
                    </div>

                    <div className={modal ? 'login__box' : "close"}>
                        <img className='image_check' src={Check} alt="check icon" />
                        <h2 className='login__title login__title--size'>Parol muafaqiyatli tiklandi, <span className='login__span' onClick={() => { navigate(-1); setPage(false) }}>Kirish</span>ga qaytishingiz mumkin!</h2>
                    </div>

                    <div className={bot ? 'login__box' : "close"}>
                        <h2 className='login__title login__title--size'>
                            Parolingizni tiklash uchun iltimos <a className='login__span' href="https://t.me/behad_support_bot">Telegram botga</a> murojat qiling!
                        </h2>
                    </div>
                </div>
            </section>
        </>
    )


}

export default Forget