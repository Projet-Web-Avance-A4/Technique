import { generateNewAccessToken } from '@/app/profil/utils';
import { useState } from 'react';

export const UsePassword = () => {
    const [password, setPassword] = useState('');
    return { password, setPassword };
};

export const handleDeleteAccount = async (
    userMail: string | undefined,
    password: string,
) => {
    const activeAccessToken = localStorage.getItem('accessToken');
    const activeRefreshToken = localStorage.getItem('refreshToken');
    let index: number = 0;
    let tokenStatus: string = '';
    while (index < 10 || tokenStatus == 'OK') {
        try {
            const response = await fetch('http://localhost:4000/auth/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${activeAccessToken}`
                },
                body: JSON.stringify({ mail: userMail, password })
            });

            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                tokenStatus = response.statusText;
                window.location.href = '/';
            } else {
                console.error('Échec de la suppression du compte');
            }
        } catch (error: any) {
            tokenStatus = error.message;
            index++;
            if (error.message == 'Token expiré') {
                if (activeRefreshToken) {
                    generateNewAccessToken(activeRefreshToken);
                }
            } else {
                console.error('Erreur lors de la suppression du compte :', error);
            }
        }
    }
};
