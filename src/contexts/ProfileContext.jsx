import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
    const [fotoPerfil, setFotoPerfil] = useState(null); // inicia vazio
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    // Envolvendo a lógica de busca com useCallBack para evitar recriações desnecessárias
    const fetchUserData = useCallback(async (token) => {
        if (!token) {
            setLoading(false);  
            setUsuario(null);
            return;
        }
        try {
            const response = await fetch('https://plataforma-rivalix-gaming-24af3d5ab112.herokuapp.com/usuarios/perfil', {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            if (response.ok) {
                const data = await response.json();
                setUsuario(data);
            } else {
                // Token inválido, limpa os dados
                setUsuario(null);
                localStorage.removeItem('authToken');
            }
        } catch (error) {
            console.error("Contexto: Erro ao buscar dados do perfil.", error);
            setUsuario(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Busca inicial ao carregar o app
    useEffect(() => {
        const token = localStorage.getItem('authToken');
        setLoading(true);
        fetchUserData(token);
    }, [fetchUserData]);

    // Função para ser chamada pela página de login
    const handleLogin = (token) => {
        localStorage.setItem('authToken', token);
        setLoading(true);
        fetchUserData(token); // Busca os dados do novo usuário
    };

    // Função para ser chamada pela página de configurações/logout
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        setUsuario(null); // Limpa os dados do usuário do estado
    };

    const value = { usuario, loading, login: handleLogin, logout: handleLogout , fotoPerfil, setFotoPerfil};

    return (
        <ProfileContext.Provider value={value}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfile() {
    return useContext(ProfileContext);
}
