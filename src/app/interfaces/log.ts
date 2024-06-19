export interface Log {
    id: number;
    name: string;
    mail: string;
    role: string;
    type: string;
    timestamp: string;
}

export interface LogsTableProps {
    logs: Log[];
    indexOfLastLog: number;
    indexOfFirstLog: number;
}