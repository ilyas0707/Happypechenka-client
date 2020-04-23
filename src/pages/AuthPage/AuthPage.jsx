import React, { useState, useEffect, useContext } from 'react'
import Styles from "./AuthPage.module.css"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { useMediaQuery } from 'react-responsive'
import { useHttp } from "./../../hooks/http.hook"
import { useError } from "../../hooks/error.hook"
import { AuthContext } from '../../context/AuthContext'
import { useSuccess } from '../../hooks/success.hook'

const AuthPage = () => {
    toast.configure({
        autoClose: 3000,
        draggable: true
    })

    const auth = useContext(AuthContext)
    const errorMessage = useError()
    const successMessage = useSuccess()
    const { loading, request, error, clearError } = useHttp()
    const [form, setForm] = useState({
        nickname: "",
        email: "",
        password: ""
    })
    const [show, setShow] = useState(false)

    useEffect(() => {
        errorMessage(error)
        clearError()
    }, [error, errorMessage, clearError])

    const showBlock = e => {
        e.preventDefault()
        if (show === false) {
            setShow(true)
        } else if (show === true) {
            setShow(false)
        }
    }

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async (e) => {
        e.preventDefault()
        try {
            const data = await request("/api/auth/register", "POST", { ...form })
            successMessage(data.message)
            setShow(false)
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

    const elems = [
        show ? { id: "nickname", name: "Nickname", text: "Must be unique" } : { id: "nickname", style: Styles.hidden },
        { id: "email", name: "Email", text: "Ex: *****@happy.com" },
        { id: "password", name: "Password", text: "Must be minimum 6 characters" }
    ]

    const item = elems.map(({id, name, text, style}) => {
        return(
            <div key={ id } className={small ? `${Styles.inputBlock} ${ style }` : `${Styles.inputBlock} ${Styles.inputBlockMedia} ${ style }`}>
                <input type={id === "password" ? "password" : "text"} 
                    className={Styles.input} 
                    name={ id }
                    autoComplete="off"
                    placeholder={ name } 
                    onChange={changeHandler} />
                <label htmlFor={ id } className={Styles.label}>{ name }</label>
                { show ? <b className={Styles.warn}>{ text }</b> : <span></span> }
            </div>
        )
    })

    return(
        <div className={Styles.block}>
            <div className={small ? `${!show ? Styles.page : `${Styles.page} ${Styles.hidden}`}` : `${!show ? Styles.page : `${Styles.page} ${Styles.hidden}`} ${Styles.pageMedia}`}>
                <h1 className={xsmall ? Styles.heading : `${Styles.heading} ${Styles.headingMedia}`}>Login</h1>
                <form action="#" className={Styles.form}>
                    { item }
                </form>
                <p className={xsmall ? Styles.signUp : `${Styles.signUp} ${Styles.signUpMedia}`}>{"Not yet signed up, so"}{" "}
                    <a 
                        href="/" 
                        className={Styles.sign}
                        onClick={showBlock}>Sign Up</a>
                </p>
                <div className={Styles.buttons}>
                    <a
                        href="/"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={loginHandler}>{loading ? "" : "Login"}</a>
                </div>
            </div>
            <div className={small ? `${show ? Styles.page : `${Styles.page} ${Styles.hidden}`}` : `${show ? Styles.page : `${Styles.page} ${Styles.hidden}`} ${Styles.pageMedia}`}>
                <h1 className={xsmall ? Styles.heading : `${Styles.heading} ${Styles.headingMedia}`}>Registration</h1>
                <form action="#" className={Styles.form}>
                    { item }
                </form>
                <div className={Styles.buttons}>
                    <a 
                        href="/"
                        className={loading ? Styles.loading : xsmall ? Styles.btn : `${Styles.btn} ${Styles.btnMedia}`}
                        onClick={registerHandler}>{loading ? "" : "Sign Up"}</a>
                </div>
                <p className={xsmall ? `${Styles.signUp} ${Styles.mb}` : `${Styles.signUp} ${Styles.mb} ${Styles.signUpMedia}`}>{"OR return to"}{" "}
                    <a 
                        href="/" 
                        className={Styles.sign}
                        onClick={showBlock}>Login</a>
                </p>
            </div>
        </div>
    )
}

export default AuthPage

