import React, { useState, useEffect } from "react"
import Styles from "./Topline.module.css"
import axios from "axios"

export const Topline = (userId) => {
    const [params, setParams] = useState("")
    const id = userId.id
    const API_URI = `api/auth/user/${id}`

    useEffect(() => {
        axios.get(API_URI)
            .then(res => {
                const data = res.data
                const nick = data.nickname
                setParams(nick)
            })
    }) 

    return(
        <div className={Styles.topline}>
            <h3 className={Styles.nickname}>{params}</h3>
        </div>
    )
}