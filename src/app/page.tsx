"use client";

import React, { useState } from 'react';
import RegisterForm from './components/registerForm/registerForm';
import ConnectionForm from './components/connectionForm/connectionForm';

const Register: React.FC = () => {

  const [connectPage, setConnectPage] = useState<boolean>(true)

  const changeForm = () => {
    setConnectPage(!connectPage)
  }

    return (
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
    );
};

export default Register;
