import './register.css'
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Register() {
    const navigate = useNavigate()
    const { temptoken, key, notification_token } = useParams()
    const [err, setErr] = useState(false)
    const [err2, setErr2] = useState(false)
    const [location, setLocation] = useState()
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => setLocation(data))
            .catch(e => console.log(e))
    }, [])

    const closeTab = () => {
        window.opener = null;
        window.open("", "_self");
        window.close();
    };
    const HandleSubmit = (e) => {
        e.preventDefault();
        const { name, surname, age, who, password, password_again } = e.target.elements

        if (password.value.trim() === password_again.value.trim()) {
            const myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');

            const raw = JSON.stringify({
                name: name.value.trim(),
                surname: surname.value.trim(),
                age: age.value.trim(),
                who: who.value.trim(),
                phone: `+${state}`,
                password: password.value.trim().toLowerCase(),
                country: location?.country,
                capital: location?.country_capital,
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch('http://users.behad.uz/api/v1/register/' + temptoken + "/" + key + "/" + notification_token, requestOptions)
                .then((response) => response.json())
                .then((data) => {
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
            setErr(true)
        }
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className={!modal ? 'login__box' : "close"}>
                        <h1 className='login__title'>Ro'yxatdan o'tish</h1>
                        <p className='login__text'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <div className='login__form__box'>
                            <form autoComplete='off' onSubmit={HandleSubmit}>
                                <div className='login__input__box'>
                                    <input className='login__phone__input' id='name' type="text" name='name' required />
                                    <label className="login__phone_label" htmlFor="name">
                                        Ism *
                                    </label>
                                </div>
                                <div className='login__input__box'>
                                    <input className='login__phone__input' id='surname' type="text" name='surname' required />
                                    <label className="login__phone_label" htmlFor="surname">
                                        Familiya *
                                    </label>
                                </div>

                                <div className='register__input__box'>
                                    <div className='login__input__box login__input__box--width'>
                                        <input className='login__phone__input' id='age' type="number" name='age' placeholder='' min={1} max={99} />
                                        <label className="login__phone_label" htmlFor="age">
                                            Yosh
                                        </label>
                                    </div>
                                    <div className='login__input__box login__input__box--select'>
                                        <select className='login__phone__input login__phone__input--select' name="who">
                                            <option value="" disabled>Jins</option>
                                            <option value="erkak">Erkak</option>
                                            <option value="ayol">Ayol</option>
                                        </select>
                                    </div>
                                </div>

                                <div className='login__input__box'>
                                    <PhoneInput
                                        country={location?.country_code.toLowerCase()}
                                        value={state?.phone}
                                        onChange={phone => setState(phone)}
                                    />
                                    <span className={err2 ? 'forget__error__span' : 'close'}>{err2 ? "Telefon raqami ro'yhatdan o'tgan" : ""}</span>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required autoCapitalize='off' minLength={6} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Parol *
                                    </label>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password_again' type="password" name='password_again' autoCapitalize='off' required minLength={6} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password_again">
                                        Parol qayta yozing *
                                    </label>
                                </div>

                                <button className='login__btn'>Ro'yxatdan o'tish</button>
                            </form>
                        </div>

                        <p className='login__text'>Akkountingiz bormi ? <span className='login__span' onClick={() => navigate("/" + temptoken + "/" + key + "/" + notification_token)}>Kirish</span></p>
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