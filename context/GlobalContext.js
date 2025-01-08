import { useState, useEffect, createContext, useContext, use } from "react";

const GlobalContext = createContext();

import { getCurrentUser } from '../lib/appwrite';

export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedCategory, setSelectedCategory] = useState("All")
    const [allReviewsVisible, setAllReviewsVisible] = useState(false);

    useEffect(() => {
        getCurrentUser()
            .then((user) => {
                if (user) {
                    setUser(user)
                    setIsLoggedIn(true)
                } else {
                    setIsLoggedIn(false)
                    setUser(null)
                }
            }).catch((error) => {
                console.log(error);
            }).finally(() => {
                setIsLoading(false)
            });

    }, [user])

    return (
        <GlobalContext.Provider value={{
            isLoggedIn,
            setIsLoggedIn,
            user,
            setUser,
            setSearchValue,
            searchValue,
            selectedCategory, 
            setSelectedCategory,
            allReviewsVisible, 
            setAllReviewsVisible
        }}>
            {children}
        </GlobalContext.Provider>
    )
};


