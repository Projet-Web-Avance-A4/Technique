import { Alert } from '@mui/material';
import { Button } from '@nextui-org/button';
import { Card, CardBody, CardHeader, Input, Spacer } from '@nextui-org/react';
import React, { useState } from 'react';
import { EyeSlashFilledIcon } from '../../../../public/icons/EyeSlashFilledIcon';
import { EyeFilledIcon } from '../../../../public/icons/EyeFilledIcon';
import { FaUser } from "react-icons/fa6";
import { useFormValidation, useToggleVisibility, handleSubmit } from './utils';

const ConnectionForm: React.FC<{ changeForm: () => void }> = (props) => {
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { isVisible, toggleVisibility } = useToggleVisibility();
    const isDisabled = useFormValidation(mail, password) || isSubmitting;

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await handleSubmit(e, mail, password, setAlertMessage, setAlertType);
        } catch (error) {
            console.error(error);
            setAlertType('error');
            setAlertMessage('Erreur lors de la connexion.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container flex justify-center mx-auto">
            <Card className="m-8 flex-grow max-w-3xl">
                <CardHeader className="pb-0 pt-2 px-4 flex items-center">
                    <div className="flex items-center justify-center flex-grow">
                        <FaUser className="size-6 mr-3 mt-1" />
                        <h3 className="font-bold text-large">Connexion</h3>
                    </div>
                </CardHeader>
                <CardBody>
                    <form onSubmit={onSubmit} className="flex flex-col items-center gap-5 p-3">
                        <div className='w-full md:w-8/12 mx-auto'>
                            <Input
                                className='text-black w-full'
                                isRequired
                                variant='bordered'
                                size="md"
                                label="Mail"
                                value={mail}
                                onChange={(e) => setMail(e.target.value)}
                            />
                        </div>
                        <div className='w-full md:w-8/12 mx-auto'>
                            <Input
                                className='text-black w-full'
                                isRequired
                                variant='bordered'
                                label="Mot de passe"
                                size="md"
                                type={isVisible ? "text" : "password"}
                                endContent={
                                    <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
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
                        <Spacer y={1.5} />
                        <div className="grid grid-cols-1 md:flex md:flex-col space-y-4">
                            <div className="col-span-full md:col-span-1 justify-self-center">
                                <Button type="submit" isDisabled={isDisabled} className="w-full bg-beige shadow min-w-[150px]">
                                    {isSubmitting ? 'Connexion en cours...' : 'Se connecter'}
                                </Button>
                            </div>
                            <div className="col-span-full md:col-span-1 justify-self-center">
                                <Button type="button" variant='ghost' onClick={props.changeForm} className="w-full">
                                    Créer un compte
                                </Button>
                            </div>
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
    );
};

export default ConnectionForm;