import React, { createContext, useEffect } from 'react'

export const AppContexto = createContext();

export default function AppContext({ children }) {

    useEffect(() => {
        return () => {
        }
    }, []);

    return (
        <AppContexto.Provider value={{}}>
            {children}
        </AppContexto.Provider>
    )
}
