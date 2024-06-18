'use client';

import React from 'react';
import {
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem
} from "@nextui-org/navbar";
import { Button } from "@nextui-org/button";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection } from "@nextui-org/react";
import Link from "next/link";
import Image from 'next/image';
import ceseat from "../../../../public/images/logo-ceseat.png";
import DeleteUserModal from "../deleteUserModal/deleteUserModal";
import { useModal } from './utils';
import { useHeader } from '../../hooks/useHeader';

export default function Header() {
    const { user, showMyAccount, showStats } = useHeader();
    const { isModalOpen, openModal, closeModal } = useModal();
    const appRole = process.env.NEXT_PUBLIC_APP;

    return (
        <Navbar className="bg-red">
            <NavbarBrand>
                <Link href={"/"}>
                    <p className="font-bold text-inherit ml-2 text-large flex items-center gap-2">
                        <Image
                            src={ceseat}
                            width={50}
                            height={50}
                            alt="Logo Ceseat"
                        />
                        <span className="hidden lg:inline">CES&apos;Eat</span>
                    </p>
                </Link>
            </NavbarBrand>
            <NavbarContent justify="center">
                <p>{user?.role || appRole}</p>
            </NavbarContent>
            <NavbarContent justify="end">
                {showStats && user?.role === 'Restaurateur' &&
                    <NavbarItem className="hidden lg:flex">
                        <Link href="#">Statistiques</Link>
                    </NavbarItem>
                }
                <NavbarItem>
                    {showMyAccount &&
                        <Dropdown className="text-black">
                            <DropdownTrigger>
                                <Button>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                    </svg>
                                    <span className="hidden lg:inline">Mon compte</span>
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu variant="faded" aria-label="Account dropdown menu with description">
                                <DropdownSection title="Actions" showDivider>
                                    <DropdownItem
                                        key="consult"
                                        description="Mes informations"
                                        href="/profil"
                                    >
                                        Mon compte
                                    </DropdownItem>
                                </DropdownSection>
                                <DropdownSection title="Danger">
                                    <DropdownItem
                                        key="delete"
                                        className="text-danger"
                                        color="danger"
                                        description="Supprimer définitivement mon compte"
                                        onClick={() => openModal()}
                                    >
                                        Effacer mon compte
                                    </DropdownItem>
                                </DropdownSection>
                            </DropdownMenu>
                        </Dropdown>
                    }
                </NavbarItem>
            </NavbarContent>
            <DeleteUserModal userMail={user?.mail} isOpen={isModalOpen} closeModal={closeModal} />
        </Navbar>
    );
}
