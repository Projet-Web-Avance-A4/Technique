'use client';

import React, { useState, useEffect, Fragment } from 'react';
import Header from "../components/header/header";
import { NextUIProvider } from "@nextui-org/system";
import CustomCard from '../components/customcard/customcard';
import Footer from '../components/footer/footer';
import { User } from "../interfaces/user";
import { decodeAccessToken, fetchDownloadableFiles } from './utils';
import { Dialog, Transition } from '@headlessui/react';
import { Button } from '@nextui-org/react';
import { Alert } from "@mui/material";

const DownloadComponentsPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [folders, setFolders] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [folderFiles, setFolderFiles] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedFilePath, setDownloadedFilePath] = useState<string | null>(null);
  const [showDownloadAlert, setShowDownloadAlert] = useState(false);


  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const foldersData = await fetchDownloadableFiles();
        setFolders(foldersData);
      } catch (error) {
        console.error('Error fetching files:', error);
      }
    };

    fetchFiles();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const userData = decodeAccessToken(accessToken);
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleCardClick = async (foldername: string) => {
    setSelectedFolder(foldername);
    try {
      const response = await fetch(`/api/components?foldername=${encodeURIComponent(foldername)}&listFiles=true`);
      const data = await response.json();
      setFolderFiles(data.files);
      setModalVisible(true);
    } catch (error) {
      console.error('Error fetching folder files:', error);
    }
  };

  const handleDownload = async (event: any) => {
    event.preventDefault();
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(`/api/components?foldername=${encodeURIComponent(selectedFolder as string)}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to start download from API');
      }

      const data = await response.json();
      if (data.filePath) {
        setDownloadedFilePath(data.filePath);
        setShowDownloadAlert(true);
      }
    } catch (error) {
      console.error('Error starting download:', error);
    } finally {
      setIsDownloading(false);
      setModalVisible(false);
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = folders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(folders.length / itemsPerPage);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <NextUIProvider className="flex flex-col min-h-screen bg-beige">
      <Header user={user} showMyAccount={true} showSponsor={false} />
      <div className="container mx-auto mt-6 flex-grow">
        <h1 className="font-bold text-3xl text-black text-center mb-4">Téléchargement des Composants</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {currentItems.map(folder => (
            <div className='place-self-center' key={folder.foldername}>
              <CustomCard
                title={folder.foldername}
                href="#"
                onClick={() => handleCardClick(folder.foldername)}
                btnText={'Voir les fichiers'}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 mb-3 flex justify-center items-center space-x-4">
          <Button className="px-4 py-2 bg-red text-white rounded" onClick={prevPage} isDisabled={currentPage === 1}>
            Précédent
          </Button>
          <span className="mx-4 text-black">{currentPage} / {totalPages}</span>
          <Button className="px-4 py-2 bg-red text-white rounded" onClick={nextPage} isDisabled={currentPage === totalPages}>
            Suivant
          </Button>
        </div>
      </div>
      {showDownloadAlert &&
        <Alert
          severity="success"
          onClose={() => setShowDownloadAlert(false)}
        >
          Le téléchargement a été mis dans {downloadedFilePath}
        </Alert>
      }
      <Footer />
      <Transition appear show={modalVisible} as={Fragment}>
        <Dialog
          as='div'
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setModalVisible(false)}
        >
          <div className="flex items-center justify-center min-h-screen">
            <Transition.Child
              as='div'
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
            />
            <Transition.Child
              as='div'
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
              className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
            >
              <Dialog.Title as="h3" className="flex justify-center text-lg font-medium leading-6 text-gray-900">
                Fichiers dans {selectedFolder}
              </Dialog.Title>
              <ul className="m-6 list-disc text-black">
                {folderFiles.map((file, index) => (
                  <li key={index}>{file}</li>
                ))}
              </ul>
              <div className="mt-4 flex justify-center space-x-2">
                <Button onClick={handleDownload} className="bg-beige shadow min-w-[150px]" isDisabled={isDownloading}>
                  {isDownloading ? 'Téléchargement...' : 'Télécharger'}
                </Button>
                <Button onClick={() => setModalVisible(false)} className="bg-gray-300 shadow min-w-[150px]">
                  Fermer
                </Button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </NextUIProvider>
  );
};

export default DownloadComponentsPage;
