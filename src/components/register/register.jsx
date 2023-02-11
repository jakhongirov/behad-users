import './register.css'
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Register({ code, ip, temptoken, app_key, notification_token, setPage }) {
    const [err, setErr] = useState(false)
    const [err2, setErr2] = useState(false)
    const [err3, setErr3] = useState(false)
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)
    const [geolocation, setGeolocation] = useState()
    const [disabled, setDisabled] = useState(false)

    const getLocation = () => {
        if (ip) {
            console.log(ip);
            fetch(`https://ipinfo.io/${ip}?token=0166032ebc35f8`)
                .then(res => res.json())
                .then(data => { setGeolocation(data); console.log(data); })
                .catch(e => console.log(e))
        }
    }

    const closeTab = () => {
        window.opener = null;
        window.open('', '_self');
        window.close();
    };

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { name, surname, age, who, password } = e.target.elements

        if (name && surname && age && who && password) {
            setDisabled(true)

            if (geolocation) {
                fetch('https://users.behad.uz/api/v1/register/' + temptoken + "/" + app_key + "/" + notification_token, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name.value.trim(),
                        surname: surname.value.trim(),
                        age: age.value.trim() ? age.value.trim() : 0,
                        who: who.value.trim(),
                        phone: `+${state}`,
                        password: password.value.trim().toLowerCase(),
                        country: geolocation?.country ? geolocation?.country : "Aniq emas",
                        capital: geolocation?.region ? geolocation?.region : "Aniq emas",
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Accep': 'application/json'
                    }
                })
                    .then((response) => response.json())
                    .then((data) => {
                        console.log(data);
                        if (data.status === 401) {
                            setErr(true)
                        } else if (data.status === 302) {
                            setErr2(true)
                        } else if (data.status === 200) {
                            setModal(true)
                            closeTab();
                        }
                    })
                    .catch((error) => console.log('error', error))
            } else {
                setErr3(true)
                setDisabled(false)
            }
        }
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className={!modal ? 'login__box' : "close"}>
                        <h1 className='login__title'>Ro'yxatdan o'tish</h1>
                        <p className='login__text'>Behad tizimida profil yarating:</p>
                        <div className='login__form__box'>
                            <form autoComplete='off' onSubmit={HandleSubmit}>
                                <div className='login__input__box'>
                                    <input className='login__phone__input' id='name' type="text" name='name' required minLength={3} />
                                    <label className="login__phone_label" htmlFor="name">
                                        Ism *
                                    </label>
                                </div>
                                <div className='login__input__box'>
                                    <input className='login__phone__input' id='surname' type="text" name='surname' required minLength={3} />
                                    <label className="login__phone_label" htmlFor="surname">
                                        Familiya *
                                    </label>
                                </div>

                                <div className='register__input__box'>
                                    <div className='login__input__box login__input__box--width'>
                                        <input className='login__phone__input' id='age' type="number" name='age' placeholder='' required min={7} max={90} />
                                        <label className="login__phone_label" htmlFor="age">
                                            Yosh
                                        </label>
                                    </div>
                                    <div className='login__input__box login__input__box--select'>
                                        <select className='login__phone__input login__phone__input--select' name="who" required>
                                            <option value="all" disabled>Jinsi</option>
                                            <option value="erkak">Erkak</option>
                                            <option value="ayol">Ayol</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={code}
                                        value={state?.phone}
                                        onChange={phone => setState(phone)}
                                        required={true}
                                    />
                                    <span className={err2 ? 'forget__error__span' : 'close'}>{err2 ? "Telefon raqami ro'yhatdan o'tgan" : ""}</span>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required autoCapitalize='off' minLength={6} onFocus={getLocation} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Parol yarating *
                                    </label>
                                </div>

                                <span className={err3 ? 'forget__error__span forget__error__span--margin' : 'close'}>{err3 ? "Iltimos, yana bir bor urining! " : ""}</span>

                                <button className='login__btn' disabled={disabled}>Ro'yxatdan o'tish</button>
                            </form>
                        </div>

                        <p className='login__text'>Akkountingiz bormi ? <span className='login__span' onClick={() => setPage(false)}>Kirish</span></p>
                    </div>

                    <div className={modal ? 'login__box' : "close"}>
                        <img className='image_check' src={Check} alt="check icon" />
                        <h2 className='login__title'>Kirish muaffaqiyatli bajarildi, ilovaga qaytishingiz mumkin!</h2>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register