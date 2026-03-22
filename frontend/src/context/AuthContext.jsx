import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (credentials) => {
        const { data } = await authService.login(credentials);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('accessToken', data.accessToken);
    };

    const register = async (userData) => {
        const { data } = await authService.register(userData);
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
        localStorage.setItem('accessToken', data.accessToken);
    };

    const logout = async () => {
        await authService.logout();
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('accessToken');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
