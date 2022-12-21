import './register.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'

function Register() {
    const { temptoken, key, notification_token } = useParams()
    const [err, setErr] = useState(false)
    const [location, setLocation] = useState()
    const [state, setState] = useState()

    console.log(temptoken, key, notification_token);

    useEffect(() => {
        fetch('https://ipapi.co/json')
            .then(res => res.json())
            .then(data => setLocation(data))
            .catch(e => console.log(e))
    }, [])

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
                phone: state.trim(),
                password: password.value.trim().toLowerCase(),
                country: location.country_name,
                capital: location.country_capital,
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow',
            };

            fetch('http://192.168.7.168:8000/api/register/' + key + "/" + temptoken + "/" + notification_token, requestOptions)
                .then((response) => response.json())
                .then((data) => data.status === 401 ? setErr(true) : setErr(false), console.log(200))
                .catch((error) => console.log('error', error))
        } else {
            setErr(true)
        }
    }

    return (
        <>
            <section className='login'>
                <div className='container'>
                    <div className='login__box'>
                        <h1 className='login__title'>Log in to continue</h1>
                        <form autoComplete='off' onSubmit={HandleSubmit}>
                            <div className='login__input__box'>
                                <input className='login__phone__input' id='name' type="text" name='name' required />
                                <label className="login__phone_label" htmlFor="name">
                                    Name
                                </label>
                            </div>
                            <div className='login__input__box'>
                                <input className='login__phone__input' id='surname' type="text" name='surname' required />
                                <label className="login__phone_label" htmlFor="surname">
                                    Surname
                                </label>
                            </div>

                            <div className='register__input__box'>
                                <div className='login__input__box login__input__box--width'>
                                    <input className='login__phone__input' id='age' type="number" name='age' required min={1} max={99} />
                                    <label className="login__phone_label" htmlFor="age">
                                        Age
                                    </label>
                                </div>
                                <div className='login__input__box login__input__box--select'>
                                    <select className='login__phone__input login__phone__input--select' name="who" required>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div className='login__input__box'>
                                <PhoneInput
                                    country={location?.country_code.toLowerCase()}
                                    value={state?.phone}
                                    onChange={phone => setState(phone)}
                                />
                            </div>
                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password' type="password" name='password' required maxLength={6} />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password">
                                    Password
                                </label>
                            </div>
                            <div className='login__input__box'>
                                <input className={err ? 'login__phone__input login__phone__input--danger' : 'login__phone__input'} id='password_again' type="password" name='password_again' required maxLength={6} />
                                <label className={err ? "login__phone_label login__phone_label--danger" : "login__phone_label"} htmlFor="password_again">
                                    Again password
                                </label>
                            </div>

                            <button className='login__btn'>Sign Up</button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Register