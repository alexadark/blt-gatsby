import React, { Fragment, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import useAuthModal from "~/context/AuthModalContext";
import AuthTabs from "./AuthTabs";
import Button from "../reusables/Button";

export default function AuthModal() {
  const { isModalOpen, closeModal } = useAuthModal();
  let closeButtonRef = useRef(null);

  return (
    <>
      <Transition appear show={isModalOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-20 overflow-y-auto"
          onClose={closeModal}
          initialFocus={closeButtonRef}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-darkBlue opacity-80" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
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
              <div className="inline-block w-full max-w-[500px] my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl z-50">
                <AuthTabs />
                <div className="mt-4 flex justify-end p-3">
                  <Button
                    ref={closeButtonRef}
                    type="Outline"
                    className="px-2 py-1 h-[1.75rem]"
                    onClick={closeModal}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
