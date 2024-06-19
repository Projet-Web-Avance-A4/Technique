import { useEffect } from 'react';

export function generate(digits: number): number {
    const min = Math.pow(10, digits - 1);
    const max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const toggleVisibility = (isVisible: boolean, setIsVisible: (isVisible: boolean) => void) => {
    setIsVisible(!isVisible);
};

export const useFormValidation = (
    fields: string[],
    setIsDisabled: (isDisabled: boolean) => void
) => {
    useEffect(() => {
        const isFormValid = fields.every(field => field);
        setIsDisabled(!isFormValid);
    }, [fields, setIsDisabled]);
};

export const handleSubmit = async (
    e: React.FormEvent,
    formData: {
        name: string,
        surname: string,
        mail: string,
        phone: string,
        street: string,
        city: string,
        postalCode: string,
        password: string,
        role: string,
        status: string,
        code_referral: string,
        id_sponsor: string
    },
    setAlertMessage: (message: string) => void,
    setAlertType: (type: 'success' | 'error') => void,
    changeForm: () => void
) => {
    e.preventDefault();
    const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    });

    if (response.status >= 200 && response.status < 300) {
        setAlertMessage('Création du compte réussie');
        setAlertType('success');
        setTimeout(() => {
            changeForm();
        }, 1000);
    } else {
        setAlertMessage('Échec de la création du compte');
        setAlertType('error');
    }
};
