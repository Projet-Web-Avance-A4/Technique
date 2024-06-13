"use client";

import React, { useState } from 'react';
import { Alert } from '@mui/material';
import { Input, Spacer, Button, Card, CardHeader, CardBody, Tooltip } from '@nextui-org/react';
import { EyeFilledIcon } from "../../../../public/icons/EyeFilledIcon";
import { EyeSlashFilledIcon } from "../../../../public/icons/EyeSlashFilledIcon";
import { FaUserPlus, FaReply } from "react-icons/fa6";
import { NextUIProvider } from '@nextui-org/system';
import { generate, toggleVisibility, useFormValidation, handleSubmit } from './utils';

const RegisterForm: React.FC<{ changeForm: () => void }> = (props) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [mail, setMail] = useState('');
    const [phone, setPhone] = useState('');
    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [password, setPassword] = useState('');
    const role = "Développeur";
    const status = "Active";
    const code_referral = "REF" + generate(10);
    const [id_sponsor, setIdSponsor] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isDisabled, setIsDisabled] = useState(true);
    const [isVisible, setIsVisible] = React.useState(false);

    useFormValidation([name, surname, mail, phone, street, city, postalCode, password], setIsDisabled);

    const onSubmit = (e: React.FormEvent) => {
        handleSubmit(e, {
            name, surname, mail, phone, street, city, postalCode, password,
            role, status, code_referral, id_sponsor
        }, setAlertMessage, setAlertType, props.changeForm);
    };

    return (
        <NextUIProvider>
            <div className="container flex justify-center mx-auto">
                <Card className="m-8 flex-grow max-w-3xl">
                    <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                        <div className="inline-block w-10 h-10">
                            <Tooltip showArrow={true} content="Retour à connexion" color='foreground'>
                                <Button onClick={props.changeForm} className="bg-transparent border-none p-0 min-w-fit">
                                    <FaReply className="text-2xl" />
                                </Button>
                            </Tooltip>
                        </div>
                        <div className="flex items-center justify-center flex-grow">
                            <FaUserPlus className="size-7 mr-3 mt-1" />
                            <h3 className="font-bold text-large">Créer un compte</h3>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={onSubmit} className="grid grid-flow-row-dense auto-cols-max grid-cols-6 gap-5 p-3">
                            <div className='col-span-3'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Prénom"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className='col-span-3'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Nom"
                                    value={surname}
                                    onChange={(e) => setSurname(e.target.value)}
                                />
                            </div>
                            <div className='col-span-4'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Mail"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Tél"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className='col-span-6'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Rue"
                                    value={street}
                                    onChange={(e) => setStreet(e.target.value)}
                                />
                            </div>
                            <div className='col-span-4'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Ville"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                />
                            </div>

                            <div className='col-span-2'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    size="md"
                                    label="Code Postal"
                                    value={postalCode}
                                    onChange={(e) => setPostalCode(e.target.value)}
                                />
                            </div>
                            <div className='col-span-6'>
                                <Input
                                    className='text-black'
                                    isRequired
                                    variant='bordered'
                                    label="Mot de passe"
                                    size="md"
                                    type={isVisible ? "text" : "password"}
                                    endContent={
                                        <button className="focus:outline-none" type="button" onClick={() => toggleVisibility(isVisible, setIsVisible)}>
                                            {isVisible ? (
                                                <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            ) : (
                                                <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                                            )}
                                        </button>
                                    }
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className='col-start-2 col-span-4'>
                                <Input
                                    className='text-black'
                                    label="Code Parrainage (Optionnel)"
                                    variant='bordered'
                                    size="md"
                                    value={id_sponsor}
                                    onChange={(e) => setIdSponsor(e.target.value)}
                                />
                            </div>
                            <Spacer y={1.5} />
                            <div className='col-start-3 col-end-5 justify-self-center'>
                                <Button type="submit" disabled={isDisabled}>Créer le compte</Button>
                            </div>
                        </form>
                    </CardBody>
                    {alertMessage && (
                        <div>
                            <Spacer y={1.5} />
                            <Alert severity={alertType}>
                                {alertMessage}
                            </Alert>
                        </div>
                    )}
                </Card>
            </div>
        </NextUIProvider >
    );
};

export default RegisterForm;
