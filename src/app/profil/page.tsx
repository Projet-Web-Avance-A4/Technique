'use client';

import { useEffect, useState, ChangeEvent } from "react";
import { useRouter } from 'next/navigation';
import { Input, Spacer } from "@nextui-org/react";
import { Alert } from "@mui/material";
import { User, fieldLabels } from "../interfaces/user";
import { isUserDataValid, handleTokenVerification, handleInputChange, sendModifiedData, sendModifiedPassword } from "./utils";
import { useHeader } from '../hooks/useHeader';
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";

export default function AccountInfo() {
    const { user, setUser, setShowMyAccount, setShowSponsor, setShowStats } = useHeader();
    const [isEditing, setIsEditing] = useState(false);
    const [modifiedUser, setModifiedUser] = useState<User | null>(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState<'success' | 'error'>('success');
    const [isDataDisabled, setIsDataDisabled] = useState(true);
    const [isPasswordDisabled, setIsPasswordDisabled] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const getUser = async () => {
            const token = await handleTokenVerification(setUser);
            if (token) {
                setShowMyAccount(true);
                setShowSponsor(true);
                setShowStats(true);
            } else {
                router.push('/');
            }
        }

        getUser();
    }, []);

    useEffect(() => {
        const isFormValid = isUserDataValid(modifiedUser);
        setIsDataDisabled(!isEditing || !isFormValid);
    }, [modifiedUser, isEditing]);

    useEffect(() => {
        const isFormValid = oldPassword && newPassword && confirmPassword;
        setIsPasswordDisabled(!isFormValid);
    }, [oldPassword, newPassword, confirmPassword]);

    const handleInputChangeWrapper = (e: ChangeEvent<HTMLInputElement>) => {
        handleInputChange(e, modifiedUser, setModifiedUser);
    };

    const sendModifiedDataWrapper = () => {
        sendModifiedData(modifiedUser, user, setUser);
    };

    const sendModifiedPasswordWrapper = () => {
        sendModifiedPassword(user, oldPassword, newPassword, confirmPassword, setAlertMessage, setAlertType);
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

    return (
        <div className="flex flex-grow justify-center items-center">
            <div className="container mx-auto mt-6 p-4 md:p-0">
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
                                                    onChange={handleInputChangeWrapper}
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
                                                sendModifiedDataWrapper();
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
                                        sendModifiedPasswordWrapper()
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
    );
}
