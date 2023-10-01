import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    user: {},
    timeOption: 'weekly',
    setTimeOption: () => {}
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [timeOption, setTimeOption] = useState('weekly');

    useEffect(() => {
        setUser({ 
            name: 'Jeremy Robson'
        });
    }, []);
    
    const value = {
        user, timeOption, setTimeOption
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}