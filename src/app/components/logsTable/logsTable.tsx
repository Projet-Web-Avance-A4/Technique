import React from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from '@nextui-org/react';
import { LogsTableProps } from '@/app/interfaces/log';

const LogsTable: React.FC<LogsTableProps> = ({ logs, indexOfLastLog, indexOfFirstLog }) => {
    const sortedLogs = logs.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

    const currentLogs = sortedLogs.slice(indexOfFirstLog, indexOfLastLog);

    return (
        <div className="flex flex-col h-full">
            <div className="overflow-auto flex-grow">
                <Table aria-label="Logs Table" className="min-w-full bg-white">
                    <TableHeader className="bg-gray-200">
                        <TableColumn className="text-black border text-center">Name</TableColumn>
                        <TableColumn className="text-black border text-center">Mail</TableColumn>
                        <TableColumn className="text-black border text-center">Role</TableColumn>
                        <TableColumn className='text-black border text-center'>Type</TableColumn>
                        <TableColumn className="text-black border text-center">Date</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {currentLogs.map((log, index) => (
                            <TableRow key={log.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                                <TableCell className="text-black border text-center">{log.name}</TableCell>
                                <TableCell className="text-black border text-center">{log.mail}</TableCell>
                                <TableCell className="text-black border text-center">{log.role}</TableCell>
                                <TableCell className="text-black border text-center">{log.type}</TableCell>
                                <TableCell className="text-black border text-center">{new Date(log.timestamp).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default LogsTable;
