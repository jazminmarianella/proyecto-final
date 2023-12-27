// AuthContext.js
import { createContext, useState, useContext } from 'react';
import api from './api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [user, setUser] = useState(null);

    const login = async (formData) => {
        try {
            const loginResponse = await api.post('/auth/login', formData);
            const { access_token, refresh_token } = loginResponse.data;

            // Guardar tokens en el localStorage
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            if (access_token) {
                const headers = {
                    Authorization: `Bearer ${access_token}`
                };

                // Hacer la solicitud GET al endpoint de perfil
                const profileResponse = await api.get('/auth/profile', { headers });
                const userProfile = profileResponse.data;

                // Manejar la respuesta exitosa
                console.log('user', userProfile);
                setUser(userProfile);
                console.log(userProfile);
                if (userProfile.role === 'admin') {
                    setIsAdmin(true);
                }

                setIsAuthenticated(true);
            }
        } catch (error) {
            console.error('Error en la solicitud de registro:', error);
        }
    };

    const logout = () => {
        // Lógica para cerrar sesión...
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('is_admin');
        localStorage.removeItem('logged_user');
        setUser(null);
        setIsAdmin(false);
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
