import { useState } from "react"
import AppContext from './index'

const AppProvider = ({ children }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    return (
        <AppContext.Provider value={{ isOpenSidebar, setIsOpenSidebar }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider