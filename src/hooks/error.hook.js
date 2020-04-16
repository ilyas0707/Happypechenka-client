import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useCallback } from "react"

export const useError = () => {
    return useCallback((text) => {
        if (text) {
            toast.error(text)
        }
        // let root = document.getElementById("root"),
        //     message = document.createElement("div");
        // if (text) {
        //     message.innerHTML = `<p style="color: #fff;">${text}</p>`
        //     message.style.cssText = 
        //     `position: absolute; 
        //     top: 50px; 
        //     left: 50%;
        //     transform: translateX(-50%);
        //     font-size: 18px; 
        //     background: #00e600; 
        //     padding: 5px 20px;
        //     transition: .5s all;`
        //     root.appendChild(message)
        //     setTimeout(() => message.style.cssText += `top: 60px;`, 2500)
        //     setTimeout(() => message.style.cssText += `opacity: .5;`, 2700)
        //     setTimeout(() => root.removeChild(message), 3000)
        // }
    }, [])
}


