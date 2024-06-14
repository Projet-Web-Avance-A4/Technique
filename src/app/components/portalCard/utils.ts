export const handleRedirect = (href: string, port: string) => {
    window.location.href = `${href}:${port}`;
};
