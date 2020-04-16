import React, { useContext, useState } from "react"
import Styles from "./Navbar.module.css"
import { useMediaQuery } from 'react-responsive'
import { NavLink, useHistory } from "react-router-dom"
import { AuthContext } from "./../../context/AuthContext"
import LogOut from "./../../img/logout.png"

export const Navbar = () => {
    const history = useHistory()
    const auth = useContext(AuthContext) 
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout()
        history.push("/")//
    }

    const showModal = event => {
        event.preventDefault()
        setShow(true)
    }

    const logoutCancel = event => {
        event.preventDefault()
        setShow(false)
        history.push("/")
    }

    const menuOpen = event => {
        event.preventDefault()

        if (open === false){
            setOpen(true)
        } else {
            setOpen(false)
        }
    }

    const items = [
        {url: "/page1", id: 1, text: "Page1"},
        {url: "/page2", id: 2, text: "Page2"},
        {url: "/page3", id: 3, text: "Page3"}
    ]

    const elems = items.map(({url, id, text}) => {
        return <li key={ id } className={Styles.item}><NavLink to={ url } className={Styles.link}>{ id }
            <span className={`${Styles.span} ${open ? Styles.open : ""}`}>{ text }</span>
        </NavLink></li>
    })

    const small = useMediaQuery(
        { minDeviceWidth: 520 }
    )

    return(
        <nav className={`${Styles.navbar} ${open ? Styles.open : ""}`}>
            <div className={Styles.flexBlock}>
                <div className={Styles.title}>
                    <a href="/" className={`${Styles.logo} ${open ? Styles.open : ""}`}>Logo</a>
                    <a href="/" className={Styles.ham} onClick={menuOpen}>
                        <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                        <span className={Styles.line}></span>
                        <span className={`${Styles.line} ${open ? Styles.open : ""}`}></span>
                    </a>
                </div>
                <ul className={Styles.menu}>
                    { elems }
                    <li className={Styles.item}>
                        <a href="/" className={`${Styles.link} ${Styles.colored}`} onClick={showModal}>
                            <img className={Styles.icon} src={LogOut} alt="logout"/>
                        </a>
                    </li>
                </ul>
            </div>
            <div className={`${Styles.overlay} ${show ? Styles.active : !show}`} onClick={logoutCancel}></div>
            <div className={`${small ? Styles.message : `${Styles.message} ${Styles.messageMedia}`} ${Styles.message} ${show ? Styles.active : !show}`}>
                <p className={Styles.text}>Are you sure, that you want to logout?</p>
                <a href="/" className={`${Styles.submit} ${Styles.left}`} onClick={logoutHandler}>Yes</a>
                <a href="/" className={`${Styles.submit} ${Styles.right}`} onClick={logoutCancel}>No</a>
            </div>
        </nav>
    )
}