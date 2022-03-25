import React, { useState } from 'react';

const AuthContext = React.createContext();
export default AuthContext;

export function AuthContextProvider(props) {
    // TODO: get user from session on init
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    function login() {
        setIsAuthenticated(true);
    }

    function logout() {
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated: isAuthenticated,
            login: login,
            logout: logout
        }}>
            {props.children}
        </AuthContext.Provider>
    );
}