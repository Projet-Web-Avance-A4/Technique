"use client";

import { NextUIProvider } from "@nextui-org/system";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import Header from "../components/header";
import { Button } from "@nextui-org/button";
import { useEffect, useState, ChangeEvent } from "react";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Input, Spacer } from "@nextui-org/react";
import { Alert } from "@mui/material";
import Footer from "../components/footer";

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

const fieldLabels: { [key in keyof User]: string } = {
    name: 'Prénom',
    surname: 'Nom',
    street: 'Rue',
    city: 'Ville',
    postal_code: 'Code Postal',
    phone: 'Téléphone',
    mail: 'Mail',
    role: 'Rôle'
};

export default function AccountInfo() {
    const [user, setUser] = useState<User | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedUser, setModifiedUser] = useState<User | null>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isDataDisabled, setIsDataDisabled] = useState(true);
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);

    const generateNewAccessToken = (refreshToken: string) => {
        try {
            const decoded = jwt.verify(refreshToken, 'refresh_secret_jwt');
            if (typeof decoded === 'object' && decoded !== null) {
                const data: JwtPayload = decoded as jwt.JwtPayload;
                const newAccessToken = jwt.sign({ ...data }, 'access_secret_jwt');
                localStorage.setItem('accessToken', newAccessToken);
                return newAccessToken;
            } else {
                console.error('decoded n\'est pas un objet JwtPayload');
            }
        } catch (error) {
            console.error('Error generating new access token:', error);
            throw error;
        }
    };

    const verifyAndSetUser = (accessToken: string) => {
        try {
            const verifiedData = jwt.verify(accessToken, 'access_secret_jwt');
            if (typeof verifiedData !== 'string') {
                const data: JwtPayload = verifiedData;
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
        } catch (error) {
            console.error('Failed to parse access token or verify JWT:', error);
            throw error;
        }
    };

    const isUserDataValid = (user: User | null) => {
        return user?.name && user?.surname && user?.street && user?.city && user?.postal_code && user?.phone && user?.mail;
    };

    useEffect(() => {
        const handleTokenVerification = () => {
            let accessToken: string | null = localStorage.getItem('accessToken');
            const refreshToken = localStorage.getItem('refreshToken');

            if (!accessToken) {
                console.error('No access token found in localStorage.');
                return;
            }

            try {
                verifyAndSetUser(accessToken);
            } catch (error: any) {
                if (error.name === 'TokenExpiredError' && refreshToken) {
                    try {
                        const newAccessToken = generateNewAccessToken(refreshToken);
                        if (typeof newAccessToken === 'string') {
                            accessToken = newAccessToken;
                            verifyAndSetUser(accessToken);
                        }
                    } catch (refreshError) {
                        console.error('Failed to refresh access token:', refreshError);
                    }
                }
            }
        };
        handleTokenVerification();
    }, []);

    useEffect(() => {
        const isFormValid = isUserDataValid(modifiedUser);
        setIsDataDisabled(!isEditing || !isFormValid);
    }, [modifiedUser, isEditing]);

    useEffect(() => {
        const isFormValid = oldPassword && newPassword && confirmPassword;
        setIsPasswordDisabled(!isFormValid);
    }, [oldPassword, newPassword, confirmPassword]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (modifiedUser !== null) {
            setModifiedUser({
                ...modifiedUser,
                [name]: value
            });
        } else {
            setModifiedUser({
                name: '',
                surname: '',
                street: '',
                city: '',
                postal_code: '',
                phone: '',
                mail: '',
                role: '',
                [name]: value
            });
        }
    };

    const sendModifiedData = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: modifiedUser?.name,
                    surname: modifiedUser?.surname,
                    currentMail: user?.mail,
                    newMail: modifiedUser?.mail,
                    phone: modifiedUser?.phone,
                    street: modifiedUser?.street,
                    city: modifiedUser?.city,
                    postalCode: modifiedUser?.postal_code
                })
            });
            if (!response.ok) {
                throw new Error('Failed to modify data');
            }

            const { accessToken, refreshToken } = await response.json();
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            verifyAndSetUser(accessToken);
        } catch (error) {
            console.error('Failed to modify data:', error);
        }
    };

    const toggleEditMode = () => {
        setIsEditing(!isEditing);
        if (!isEditing && user) {
            setModifiedUser(user);
        }
    };


    const handleOldPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value);
    };

    const sendModifiedPassword = async () => {
        if (newPassword == confirmPassword) {
            try {
                const response = await fetch('http://localhost:3001/api/update-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ mail: user?.mail, oldPassword, newPassword })
                });
                if (!response.ok) {
                    setAlertMessage('Échec de la modification de mot de passe');
                    setAlertType('error');
                } else {
                    setAlertMessage('Modification du mot de passe réussie');
                    setAlertType('success');
                }
            } catch (error) {
                console.error('Failed to modify password:', error);
            }
        } else {
            console.error('Erreur de modification, veuillez réitérer')
        }
    };

    return (
        <NextUIProvider className="min-h-screen bg-beige flex flex-col justify-between">
            <Header user={user} showMyAccount={true} showStats={true} showSponsor={true} />
            <div className="flex flex-grow justify-center items-center">
                <div className="container mx-auto p-4 md:p-0">
                    <div className="md:flex justify-center">
                        <Card className="md:mr-4 mb-4 md:mb-0 w-full md:w-auto flex-grow max-w-3xl">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <div className="flex grid-cols-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 mr-3 mt-1">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <div className="grid row-span-2">
                                        <h4 className="font-bold text-large">Bienvenue, {user?.name ?? 'Chargement...'} !</h4>
                                        <p className="text-default-500">Mes informations...</p>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody>
                                {user && (
                                    <div className="grid grid-flow-row-dense auto-cols-max grid-cols-2 gap-5 p-3">
                                        {Object.keys(user).filter((key) => key !== 'role').map((field) => (
                                            <div key={field} className={field === 'mail' ? "col-span-2" : ""}>
                                                {isEditing ? (
                                                    <Input
                                                        className="text-black w-full"
                                                        isRequired
                                                        variant="bordered"
                                                        label={fieldLabels[field as keyof User]}
                                                        size="md"
                                                        type="text"
                                                        name={field}
                                                        value={isEditing ? modifiedUser?.[field as keyof User] ?? '' : user?.[field as keyof User] ?? ''}
                                                        onChange={handleInputChange}
                                                    />
                                                ) : (
                                                    <div>
                                                        <div className="font-bold">{fieldLabels[field as keyof User]} :</div>
                                                        <div className="border-solid border-1 shadow rounded text-default-500 mx-1 px-2">
                                                            {user[field as keyof User]}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                                <div className="flex justify-center space-x-4 mt-6 mb-6">
                                    <Button
                                        className="bg-beige shadow min-w-[150px]"
                                        isDisabled={isEditing && isDataDisabled}
                                        onClick={() => {
                                            if (isEditing) {
                                                if (modifiedUser) {
                                                    sendModifiedData();
                                                }
                                                toggleEditMode();
                                            } else {
                                                toggleEditMode();
                                            }
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                            />
                                        </svg>
                                        <p className="font-semibold r-0">
                                            {isEditing ? "Enregistrer" : "Modifier"}
                                        </p>
                                    </Button>
                                    {isEditing && (
                                        <Button
                                            className="bg-gray-300 shadow min-w-[150px]"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setModifiedUser(user);
                                            }}
                                        >
                                            <p className="font-semibold r-0">
                                                Annuler
                                            </p>
                                        </Button>
                                    )}
                                </div>
                            </CardBody>
                        </Card>
                        <Card className="md:ml-4 w-full md:w-auto flex flex-col h-full mt-8 md:mt-0">
                            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
                                <div className="flex grid-cols-2">
                                    <div className="grid row-span-2">
                                        <h4 className="font-bold text-large">Modifier le mot de passe</h4>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardBody className="flex-grow p-4">
                                <Input
                                    className="text-black w-full mb-4"
                                    isRequired
                                    variant="bordered"
                                    label="Ancien mot de passe"
                                    size="md"
                                    type="password"
                                    value={oldPassword}
                                    onChange={handleOldPasswordChange}
                                />
                                <Input
                                    className="text-black w-full mb-4"
                                    isRequired
                                    variant="bordered"
                                    label="Nouveau mot de passe"
                                    size="md"
                                    type="password"
                                    value={newPassword}
                                    onChange={handleNewPasswordChange}
                                />
                                <Input
                                    className="text-black w-full mb-4"
                                    isRequired
                                    variant="bordered"
                                    label="Confirmer mot de passe"
                                    size="md"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={handleConfirmPasswordChange}
                                />
                                <div className="flex justify-center space-x-4 mt-6 mb-6">
                                    <Button
                                        className="bg-beige shadow min-w-[150px]"
                                        isDisabled={isPasswordDisabled}
                                        onClick={() => {
                                            sendModifiedPassword()
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path
                                                fillRule="evenodd"
                                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                            />
                                        </svg>
                                        <p className="font-semibold r-0">
                                            Modifier le mot de passe
                                        </p>
                                    </Button>
                                </div>
                                {alertMessage && (
                                    <div>
                                        <Spacer y={1.5} />
                                        <Alert severity={alertType}>
                                            {alertMessage}
                                        </Alert>
                                    </div>
                                )}
                            </CardBody>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </NextUIProvider>
    );
}
