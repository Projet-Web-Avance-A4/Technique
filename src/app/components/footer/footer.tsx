"use client";
import { FaPhone, FaEnvelope } from 'react-icons/fa6';
import { useState } from 'react';
import LegalModal from '../credits/credits';

export default function Footer() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <div className="text-black">
            <div className="grid bg-lightGreen py-1">
                <div className="grid justify-items-center mx-2 text-center">
                    <p className="font-bold">Contact</p>
                    <p>Vous souhaitez en savoir plus ou nous rencontrer ?</p>
                    <p> N&apos;h&#233;sitez pas &#224; nous contacter&nbsp;!</p>
                </div>
                <div className="grid justify-items-center">
                    <div className="my-2 flex gap-3">
                        <a href="tel:#" title="Appeler ce numéro" className="flex flex-row items-center space-x-2">
                            <FaPhone className="text-red material-icons" />
                            <span>07 82 88 38 64</span>
                        </a>
                        <a href="mailto:ceseat@gmail.com" title="Envoyer un email" className="flex flex-row items-center space-x-2">
                            <FaEnvelope className="text-red material-icons" />
                            <span>ceseat@gmail.com</span>
                        </a>
                    </div>
                </div>
            </div>

            <div className="flex bg-darkGreen py-1">
                <div className="flex-1 ml-2">&copy;CES&apos;EAT - 2024</div>
                <div>
                    <a
                        title="Consulter les mentions légales"
                        onClick={openModal}
                        className="cursor-pointer text-blue-500 mr-2"
                    >
                        <span>Mentions l&eacute;gales</span>
                    </a>

                    <LegalModal isOpen={isModalOpen} closeModal={closeModal} />
                </div>
            </div>
        </div>
    );
}
