"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LogsTable from '../components/logsTable/logsTable';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Button } from '@nextui-org/react';
import { User } from '../interfaces/user';
import { Log } from '../interfaces/log';
import { useHeader } from '../hooks/useHeader';

const Logs: React.FC = () => {

    const { user, setUser, setShowMyAccount, setShowSponsor, setShowStats } = useHeader();
    const [logs, setLogs] = useState<Log[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const logsPerPage = 7;
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            const decodedToken = jwt.decode(accessToken);
            if (decodedToken && typeof decodedToken !== 'string') {
                const data: JwtPayload = decodedToken;
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
                setShowMyAccount(true);
                setShowSponsor(true);
                setShowStats(true);
            }
        } else {
            router.push('/');
        }
    }, []);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await fetch('http://localhost:4000/log/getLog', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                const data = await response.json();
                setLogs(data);
            } catch (error) {
                console.error('Error fetching logs:', error);
            }
        };
        fetchLogs();
    }, []);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    const indexOfLastLog = currentPage * logsPerPage;
    const indexOfFirstLog = indexOfLastLog - logsPerPage;
    const maxPage = Math.ceil(logs.length / logsPerPage);

    return (
        <>
            <div className='container mx-auto mt-6 flex-grow'>
                <h2 className="text-3xl font-bold mb-6 text-center text-black">Consultation des logs</h2>
                <div className="logs-container">
                    <LogsTable logs={logs} indexOfLastLog={indexOfLastLog} indexOfFirstLog={indexOfFirstLog} />
                </div>
            </div>
            <div className="mt-3 mb-3 flex justify-center items-center space-x-4">
                <Button
                    className="px-4 py-2 bg-red text-white rounded"
                    isDisabled={currentPage === 1}
                    onClick={() => paginate(currentPage - 1)}
                >
                    Précèdent
                </Button>
                <span className="text-black">{currentPage}/{maxPage}</span>
                <Button
                    className="px-4 py-2 bg-red text-white rounded"
                    isDisabled={indexOfLastLog >= logs.length}
                    onClick={() => paginate(currentPage + 1)}
                >
                    Suivant
                </Button>
            </div>

        </>
    );
};

export default Logs;
