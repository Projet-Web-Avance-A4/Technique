"use client";

import React, { useState } from 'react';
import RegisterForm from './components/registerForm/registerForm';
import ConnectionForm from './components/connectionForm/connectionForm';
import { NextUIProvider } from '@nextui-org/system';
import Header from './components/header/header';
import Footer from './components/footer/footer';

const Register: React.FC = () => {

    const [connectPage, setConnectPage] = useState<boolean>(true)

    const changeForm = () => {
        setConnectPage(!connectPage)
    }

    return (
        <NextUIProvider className="flex flex-col min-h-screen bg-beige">
            <Header title={"Développeur"} />
            <div className='container mx-auto mt-6 flex-grow'>
                {!connectPage &&
                    <div>
                        <RegisterForm changeForm={changeForm} />
                    </div>
                }
                {connectPage &&
                    <div>
                        <ConnectionForm changeForm={changeForm} />
                    </div>
                }
            </div>
            <Footer />
        </NextUIProvider>
    );
};

export default Register;
