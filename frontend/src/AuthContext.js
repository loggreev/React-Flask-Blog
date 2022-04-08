import React, { useState, useEffect } from 'react';
import { API_URL } from './App'

const AuthContext = React.createContext();
export default AuthContext;

export function AuthContextProvider(props) {
    //contains user.id, user.username
    const [user, setUser] = useState();

    //get user data from session cookie on init
    useEffect(() => {
        async function fetchData() {
            const user = await getUser();
            setUser(user);
        }
        fetchData();
    }, [])

    async function getUser() {
        let user;
        await fetch(`${API_URL}/get_user/`, {
            method: 'GET',
            mode: 'same-origin'
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    user = data.user;
                }
            });

        return user;
    }

    const isAuthenticated = () => !!user;

    async function login() {
        setUser(await getUser());
    }

    async function logout() {
        setUser(undefined);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            getUser,
            login,
            logout,
            user
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}