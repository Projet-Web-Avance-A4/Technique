"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomCard from '../components/customcard/customcard';
import { User } from '../interfaces/user';
import { useHeader } from '../hooks/useHeader';

const Home: React.FC = () => {

    const { user, setUser, setShowMyAccount, setShowSponsor, setShowStats } = useHeader();
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwt.decode(accessToken);
            if (decodedToken && typeof decodedToken !== 'string') {
                const data: JwtPayload = decodedToken;
                const userData: User = {
                    name: data.name ?? '',
                    surname: data.surname ?? '',
                    street: data.street ?? '',
                    city: data.city ?? '',
                    postal_code: data.postal_code ?? '',
                    phone: data.phone ?? '',
                    mail: data.mail ?? '',
                    role: data.role ?? ''
                };
                setUser(userData);
                setShowMyAccount(true);
                setShowSponsor(true);
                setShowStats(true);
            }
        } else {
            router.push('/');
        }
    }, []);

    return (
        <div className='container mx-auto m-8'>
            <h2 className="text-3xl font-bold mb-6 text-center text-black">Bienvenue {user?.name} !</h2>
            <div className='flex justify-center'>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <CustomCard
                        title="Logs"
                        description="Accédez aux logs"
                        href="/logs"
                        btnText="Accéder"
                    />
                    <CustomCard
                        title="Performances"
                        description="Voir les performances"
                        href="/performances"
                        btnText="Accéder"
                    />
                    <CustomCard
                        title="Composants"
                        description="Gérer les composants"
                        href="/gestion-des-composants"
                        btnText="Accéder"
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;
