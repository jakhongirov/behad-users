import './register.css'
import { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2'

import Check from "../../assets/image/check_circle.svg"

function Register({ code, setCode, temptoken, app_key, notification_token, setPage }) {
    const [err, setErr] = useState(false)
    const [err2, setErr2] = useState(false)
    const [err3, setErr3] = useState(false)
    const [state, setState] = useState()
    const [modal, setModal] = useState(false)
    const [disabled, setDisabled] = useState(false)
    const [geolocation, setGeolocation] = useState()
    // const [ip, setIp] = useState('')
    // const [char, setChar] = useState()
    const [refresh, setRefresh] = useState(0)

    // const makeCode = (length) => {
    //     let characters = '123';
    //     let charactersLength = characters.length;
    //     for (let i = 0; i < length; i++) {
    //         return setChar(characters.charAt(Math.floor(Math.random() * charactersLength)));
    //     }
    // }

    const getLocations = () => {
        try {
            fetch("https://api.db-ip.com/v2/free/self", {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => setGeolocation(data))

        } catch (error) {
            console.log(error)
        }
    };

    // useEffect(() => {
    //     //     makeCode(1)
    //     getLocations()
    // }, [refresh])

    const closeTab = () => {
        window.opener = null;
        window.open('', '_self');
        window.close();
    };

    // useEffect(() => {
    //     if (ip.split('.').length > 0) {
    //         console.log(ip.split('.').length > 0);
    //         if (char === '1') {
    //             fetch(`https://ipinfo.io/${ip}?token=be16c9da4fb7a9`)
    //                 .then(res => res.json())
    //                 .then(data => { setGeolocation(data); })
    //                 .catch(e => console.log(e))
    //         } else if (char === '2') {
    //             fetch(`https://ipinfo.io/${ip}?token=0166032ebc35f8`)
    //                 .then(res => res.json())
    //                 .then(data => { setGeolocation(data); })
    //                 .catch(e => console.log(e))
    //         } else if (char === '3') {
    //             fetch(`https://ipinfo.io/${ip}?token=011af3907d2f06`)
    //                 .then(res => res.json())
    //                 .then(data => { setGeolocation(data); })
    //                 .catch(e => console.log(e))
    //         }
    //     }
    // }, [ip, char])


    // GET location code with permission 
    // const [location, setLocation] = useState({
    //     loaded: false,
    //     coordinates: { lat: '', long: '' }
    // })

    // const onSucces = (location) => {
    //     setLocation({
    //         loaded: true,
    //         coordinates: {
    //             lat: location.coords.latitude,
    //             lng: location.coords.longitude,
    //         },
    //     });
    // };

    // const onError = (error) => {
    //     setLocation({
    //         loaded: true,
    //         error,
    //     })
    // }

    // useEffect(() => {
    //     if (!("geolocation" in navigator)) {
    //         onError({
    //             code: 0,
    //             message: 'not succes'
    //         })
    //     }
    //     navigator.geolocation.getCurrentPosition(onSucces, onError);
    // }, []);

    const TrackPhone = () => {
        fetch("https://users.behad.uz/api/v1/UpdateTrackLogin?", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accep': 'application/json'
            },
            body: JSON.stringify({
                type: 'phone',
                url: "register"
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }

    const TrackFail = () => {
        fetch("https://users.behad.uz/api/v1/UpdateTrackLogin", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accep': 'application/json'
            },
            body: JSON.stringify({
                type: 'fail',
                url: "register"
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }

    const TrackPassword = () => {
        fetch("https://users.behad.uz/api/v1/UpdateTrackLogin", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Accep': 'application/json'
            },
            body: JSON.stringify({
                type: 'pass',
                url: "register"
            })
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(e => console.log(e))
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        const { name, surname, age, who, password } = e.target.elements

        if (name && surname && age && who && password) {
            setDisabled(true)

            if (geolocation?.countryCode) {
                fetch('https://users.behad.uz/api/v1/register/' + temptoken + "/" + app_key + "/" + notification_token, {
                    method: 'POST',
                    body: JSON.stringify({
                        name: name.value.trim(),
                        surname: surname.value.trim(),
                        age: age.value.trim() ? age.value.trim() : 0,
                        who: who.value.trim(),
                        phone: `+${state}`,
                        password: password.value.trim().toLowerCase(),
                        country: geolocation?.countryCode,
                        capital: geolocation?.city
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
                            setDisabled(false)
                        } else if (data.status === 302) {
                            setErr2(true)
                            setDisabled(false)
                        } else if (data.status === 200) {
                            setModal(true)
                            closeTab();
                        }
                    })
                    .catch((error) => console.log('error', error))
            } else {
                setErr3(true)
                setDisabled(false)
                TrackFail()
                setRefresh(Number(refresh) + 1)
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
                                    <input className='login__phone__input' id='name' type="text" name='name' required minLength={3} onFocus={getLocations} />
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
                                        onFocus={TrackPhone}
                                        required={true}
                                    />
                                    <span className={err2 ? 'forget__error__span' : 'close'}>{err2 ? "Telefon raqami ro'yhatdan o'tgan" : ""}</span>
                                </div>
                                <div className='login__input__box'>
                                    <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required autoCapitalize='off' minLength={6} onClick={TrackPassword} />
                                    <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                        Parol yarating *
                                    </label>
                                </div>

                                <span className={err3 ? 'forget__error__span forget__error__span--margin' : 'close'}>{err3 ? "Iltimos, sahifani yangilab qayta urinib ko'ring!" : ""}</span>

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