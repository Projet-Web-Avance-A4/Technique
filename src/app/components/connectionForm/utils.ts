import { useState, useEffect } from 'react';
import React from 'react';

export const useFormValidation = (mail: string, password: string) => {
    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const isFormValid = mail && password;
        setIsDisabled(!isFormValid);
    }, [mail, password]);

    return isDisabled;
};

export const useToggleVisibility = () => {
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);
    return { isVisible, toggleVisibility };
};

export const handleSubmit = async (
    e: React.FormEvent,
    mail: string,
    password: string,
    setAlertMessage: (message: string) => void,
    setAlertType: (type: 'success' | 'error') => void
) => {
    e.preventDefault();
    try {
        const response = await fetch('http://localhost:4000/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ mail, password })
        });

        if (response.status === 200) {
            const { accessToken, refreshToken } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            window.location.href = '/accueil';
        } else {
            setAlertMessage('Échec de la connexion au compte');
            setAlertType('error');
        }
    } catch (error) {
        setAlertMessage('Erreur lors de la connexion');
        setAlertType('error');
    }
};
