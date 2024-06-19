import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { FaCircleXmark } from "react-icons/fa6";


interface iNotification {
    title: string
    description: string
    isOpen: boolean;
    closeModal: () => void;
  }

  const notif: React.FC<iNotification> = ({ title, description, isOpen, closeModal }) => {
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
                <div className="flex flex-col items-center">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                    <div id="mentions-legales" className="text-center">
                        <p className="text-sm text-gray-500">{description}</p>
                    </div>
                </div>
  
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                    onClick={closeModal}
                  >
                    <FaCircleXmark className="w-5 h-5"/>
                  </button>
                </div>
                </div>

              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };
  
  export default notif;