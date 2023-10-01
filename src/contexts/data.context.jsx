import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./user.context";

export const DataContext = createContext({
    data: null
});

export const DataProvider = ({ children }) => {
    const { user } = useContext(UserContext);
    const [data, setData] = useState(null);

    useEffect(() => {
        if (user.name) {
            let jsonData = require('../assets/json/data.json')
            const foundItem = jsonData.users.find((u) => u.name === user.name);
            // console.log(foundItem);
            setData(foundItem.data);
        }
    }, [user]);

    const value = {
        data
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}