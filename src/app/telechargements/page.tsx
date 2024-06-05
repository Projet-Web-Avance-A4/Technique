'use client';

import React, { useState, useEffect } from 'react';
import Header from "../components/header";
import { NextUIProvider } from "@nextui-org/system";
import CustomCard from '../components/customcard';
import Footer from '../components/footer';
import jwt, { JwtPayload } from 'jsonwebtoken';

interface User {
  name: string;
  surname: string;
  street: string;
  city: string;
  postal_code: string;
  phone: string;
  mail: string;
  role: string;
}

const DownloadComponentsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [files, setFiles] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/components')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data.downloadableFiles)) {
          setFiles(data.downloadableFiles);
        } else {
          throw new Error('Response data is not an array');
        }
      })
      .catch(error => console.error('Error fetching files:', error));
  }, []);

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
      }

    }
  }, []);

  return (
    <NextUIProvider className="min-h-screen bg-beige">
      <Header user={user} showMyAccount={true} showSponsor={false} />
      <div className="container mx-auto mt-6 flex-grow">
        <h1 className="font-bold text-3xl text-black text-center mb-4">Téléchargement des Composants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {files.map(file => (
            <div className='place-self-center' key={file.filename}>
              <CustomCard title={file.filename} href={`/api/components?filename=${encodeURIComponent(file.filename)}`} btnText={'Télécharger'} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </NextUIProvider>
  );
};

export default DownloadComponentsPage;
