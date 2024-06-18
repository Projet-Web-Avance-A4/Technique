'use client';

import { createContext, useContext, ReactNode, useState } from "react";
import { User } from "../interfaces/user";
import { HeaderContextProps } from "../interfaces/header";

const HeaderContext = createContext<HeaderContextProps | undefined>(undefined);

export const HeaderProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [showMyAccount, setShowMyAccount] = useState<boolean>(false);
    const [showStats, setShowStats] = useState<boolean>(false);
    const [showSponsor, setShowSponsor] = useState<boolean>(false);

    const contextValue: HeaderContextProps = {
        user,
        showMyAccount,
        showStats,
        showSponsor,
        setUser,
        setShowMyAccount,
        setShowStats,
        setShowSponsor
    };

    return (
        <HeaderContext.Provider value={contextValue}>
            {children}
        </HeaderContext.Provider>
    );
};

export const useHeader = () => {
    const context = useContext(HeaderContext);
    if (!context) {
        throw new Error('useHeader must be used within a HeaderProvider');
    }
    return context;
};