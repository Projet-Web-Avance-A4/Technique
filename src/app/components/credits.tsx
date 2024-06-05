// components/LegalModal.tsx
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface LegalModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ isOpen, closeModal }) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="min-h-screen px-4 text-center">
    
          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                Mentions légales
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                <div id="mentions-legales">
      <h1>Mentions légales</h1>
      <h2>Propriétaire du site</h2>
      <p>Arthur Joye - Maxence Arcelin - Vincent Leleu - Nicolas Fouque - Jean-Loup Dagniaux</p>
      <h2>Coordonnées</h2>
      <ul>
        <li>
          <span className="bold">Adresse</span>
          <br />
          8 Boulevard Louis XIV
          <br />
          Lille
        </li>
        <br />
        <li>
          <span className="bold">Téléphone</span>
          <br />
          07 82 88 38 64
        </li>
        <br />
        <li>
          <span className="bold">Email</span>
          <br />
          ceseat@gmail.com
        </li>
      </ul>
      <h2>Propriété intellectuelle</h2>
      <p>Tous les textes et photos sont la propriété intellectuelle de Ces'eat.</p>
      <h2>Hébergement du site</h2>
      <p>
        Le présent site est hébergé chez <span className="bold">ALWAYSDATA, SARL</span> dont le siège social est situé
        au&nbsp;:
      </p>
      <address>
        91 rue du Faubourg Saint Honoré
        <br />
        75008 Paris
      </address>
    </div>
                </p>
              </div>

              <div className="mt-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                  onClick={closeModal}
                >
                  Fermer
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default LegalModal;
