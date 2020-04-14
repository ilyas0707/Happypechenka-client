import React, { useState, useEffect, useContext } from 'react'
import Styles from "./AuthPage.module.css"
import { useMediaQuery } from 'react-responsive'
import { useHttp } from "./../../hooks/http.hook"
import { useMessage } from "./../../hooks/message.hook"
import { AuthContext } from '../../context/AuthContext'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    })

    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request("/api/auth/register", "POST", { ...form })
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request("/api/auth/login", "POST", { ...form })
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    const small = useMediaQuery(
        { minDeviceWidth: 520 }
    )
    
    const xsmall = useMediaQuery(
        { minDeviceWidth: 370 }
    )

    return(
        <div className={Styles.block}>
            <div className={small ? Styles.page : `${Styles.page} ${Styles.pageMedia}`}>
                <h1 className={xsmall ? Styles.heading : `${Styles.heading} ${Styles.headingMedia}`}>Authorization</h1>
                <form action="#" className={Styles.form}>
                    <div className={xsmall ? Styles.inputBlock : `${Styles.inputBlock} ${Styles.inputBlockMedia}`}>
                        <input type="text" 
                            className={Styles.input} 
                            id="email" 
                            name="email"
                            autoComplete="off"
                            placeholder="Email" 
                            onChange={changeHandler} />
                        <label htmlFor="email" className={Styles.label}>Email</label>
                    </div>
                    <div className={xsmall ? Styles.inputBlock : `${Styles.inputBlock} ${Styles.inputBlockMedia}`}>
                        <input type="password" 
                            className={Styles.input} 
                            id="password" 
                            name="password" 
                            autoComplete="current-password"
                            placeholder="Password"
                            onChange={changeHandler} />
                        <label htmlFor="password" className={Styles.label}>Password</label>
                    </div>
                </form>
                <div className={Styles.buttons}>
                    <input 
                        type="submit"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={loginHandler}
                        value={loading ? "" : "Login"} />
                    <input 
                        type="submit"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={registerHandler}
                        value={loading ? "" : "Sign Up"} />
                </div>
            </div>
        </div>
    )
}

export default AuthPage

