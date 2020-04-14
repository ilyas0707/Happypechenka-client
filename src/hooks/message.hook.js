import { useCallback } from "react"

export const useMessage = () => {
    return useCallback(text => {
        let root = document.getElementById("root"),
            message = document.createElement("div");
        if (text) {
            message.innerHTML = `<p style="color: #fff;">${text}</p>`
            message.style.cssText = 
            `position: absolute; 
            top: 50px; 
            left: 50%;
            transform: translateX(-50%);
            font-size: 18px; 
            background: #034381; 
            padding: 5px 20px; 
            border-radius: 5px; 
            transition: .5s all;`
            root.appendChild(message)
            setTimeout(() => message.style.cssText += `top: 60px;`, 3000)
            setTimeout(() => message.style.cssText += `opacity: .5;`, 3200)
            setTimeout(() => root.removeChild(message), 3500)
        }
    }, [])
}


