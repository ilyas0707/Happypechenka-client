import React, { useState, useEffect, useContext, createRef } from 'react'
import Styles from "./AuthPage.module.css"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useMediaQuery } from 'react-responsive'
import { useHttp } from "./../../hooks/http.hook"
import { useError } from "../../hooks/error.hook"
import { AuthContext } from '../../context/AuthContext'
import { useSuccess } from '../../hooks/success.hook'

const AuthPage = () => {
    const auth = useContext(AuthContext)
    const errorMessage = useError()
    const successMessage = useSuccess()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        email: "", password: ""
    })

    useEffect(() => {
        errorMessage(error)
        clearError()
    }, [error, errorMessage, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("/api/auth/register", "POST", { ...form })
            if (data.message === "User has created")
            successMessage(data.message)
        } catch (e) {}
    }

    const loginHandler = async (e) => {
        e.preventDefault()
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

    const domNodeRef = createRef();

    return(
        <div className={Styles.block}>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                ref={domNodeRef} />
            <div className={small ? Styles.page : `${Styles.page} ${Styles.pageMedia}`}>
                <h1 className={xsmall ? Styles.heading : `${Styles.heading} ${Styles.headingMedia}`}>Authorization</h1>
                <form action="#" className={Styles.form}>
                    <div className={small ? Styles.inputBlock : `${Styles.inputBlock} ${Styles.inputBlockMedia}`}>
                        <input type="text" 
                            className={Styles.input} 
                            id="email" 
                            name="email"
                            autoComplete="off"
                            placeholder="Email" 
                            onChange={changeHandler} />
                        <label htmlFor="email" className={Styles.label}>Email</label>
                        <b className={Styles.warn}>Ex: *****@email.domain</b>
                    </div>
                    <div className={small ? Styles.inputBlock : `${Styles.inputBlock} ${Styles.inputBlockMedia}`}>
                        <input type="password" 
                            className={Styles.input} 
                            id="password" 
                            name="password" 
                            autoComplete="current-password"
                            placeholder="Password"
                            onChange={changeHandler} />
                        <label htmlFor="password" className={Styles.label}>Password</label>
                        <b className={Styles.warn}>Must be minimum 6 characters</b>
                    </div>
                </form>
                <div className={Styles.buttons}>
                    <a
                        href="/"
                        type="submit"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={loginHandler}>{loading ? "" : "Login"}</a>
                    <a 
                        href="/"
                        type="submit"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={registerHandler}>{loading ? "" : "Sign Up"}</a>
                </div>
            </div>
        </div>
    )
}

export default AuthPage

