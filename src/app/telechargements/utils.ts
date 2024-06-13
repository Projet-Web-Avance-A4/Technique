import jwt, { JwtPayload } from 'jsonwebtoken';

export const fetchDownloadableFiles = async () => {
    try {
        const response = await fetch('/api/components');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (Array.isArray(data.downloadableFolders)) {
            return data.downloadableFolders;
        } else {
            throw new Error('Response data is not an array');
        }
    } catch (error) {
        console.error('Error fetching files:', error);
        throw error;
    }
};

export const decodeAccessToken = (accessToken: string | null) => {
    if (accessToken) {
        const decodedToken = jwt.decode(accessToken);
        if (decodedToken && typeof decodedToken !== 'string') {
            const data: JwtPayload = decodedToken;
            const userData = {
                name: data.name ?? '',
                surname: data.surname ?? '',
                street: data.street ?? '',
                city: data.city ?? '',
                postal_code: data.postal_code ?? '',
                phone: data.phone ?? '',
                mail: data.mail ?? '',
                role: data.role ?? ''
            };
            return userData;
        }
    }
    return null;
};
