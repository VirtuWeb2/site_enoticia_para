import {createContext, useState} from "react"

export const GlobalContext = createContext()

export const GlobalContextProvider = ({children})=>{
    const [sidebarActive, setSidebarActive] = useState(false)
    return(
        <GlobalContext.Provider value={{sidebarActive, setSidebarActive}}>
            {children}
        </GlobalContext.Provider>
    )
}