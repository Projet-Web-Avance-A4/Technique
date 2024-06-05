import { Dialog, Transition } from '@headlessui/react';
import { Button, Input } from '@nextui-org/react';
import { Fragment, useState } from 'react';

interface deleteUserModalProps {
    isOpen: boolean;
    closeModal: () => void;
    userMail?: string;
}

const deleteUserModal: React.FC<deleteUserModalProps> = ({ isOpen, closeModal, userMail }) => {

    const [password, setPassword] = useState('');

    const handleDeleteAccount = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/delete', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ mail: userMail, password })
            });
            if (response.ok) {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken')
                window.location.href = '/';
            } else {
            }
        } catch (error) {
            console.error('Erreur lors de la suppression du compte :', error);
        }
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 flex items-center justify-center z-40">
                        <div className="fixed inset-0 bg-black opacity-30" />
                    </div>
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="relative z-50 bg-white p-6 my-8 overflow-hidden text-left rounded-2xl border border-black shadow-xl">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                Suppression de compte
                            </Dialog.Title>
                            <div className="mt-4">
                                <Input
                                    type="password"
                                    isRequired
                                    variant='bordered'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-3 py-2 rounded-md focus:outline-none sm:text-sm border-none text-black"
                                    label="Mot de passe"
                                />
                            </div>
                            <div className="mt-6 flex justify-center">
                                <div className="mr-2">
                                    <Button onClick={handleDeleteAccount} className="bg-beige shadow min-w-[150px]">
                                        Confirmer
                                    </Button>
                                </div>
                                <div className="ml-2">
                                    <Button onClick={closeModal} className="bg-gray-300 shadow min-w-[150px]">
                                        Annuler
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Transition.Child>
            </Dialog>
        </Transition>
    );
};

export default deleteUserModal;
