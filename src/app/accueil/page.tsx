"use client";

import React, { useEffect, useState } from 'react';
import { NextUIProvider } from '@nextui-org/system';
import Header from '../components/header';
import Footer from '../components/footer';
import jwt, { JwtPayload } from 'jsonwebtoken';
import CustomCard from '../components/customcard';

interface User {
    name: string;
    surname: string;
    street: string;
    city: string;
    postal_code: string;
    phone: string;
    mail: string;
    role: string;
}

const Home: React.FC = () => {

    const [user, setUser] = useState<User | null>(null);

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
            }
        }
    }, []);

    return (
        <NextUIProvider className="flex flex-col min-h-screen bg-beige">
            <Header user={user} showMyAccount={true} showSponsor={false} />
            <div className='container mx-auto mt-6 flex-grow'>
                <h2 className="text-3xl font-bold mb-6 text-center text-black">Bienvenue {user?.name} !</h2>
                <div className='flex justify-center'>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <Footer />
        </NextUIProvider>
    );
};

export default Home;
