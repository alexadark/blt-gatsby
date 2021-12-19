import { Dialog } from "@headlessui/react";
import React from "react";
import { Button, Modal } from "../ui-components";

export const EmptyModal = ({ isOpen, setIsOpen, action, title, text }) => {
  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} closeModal={closeModal}>
      <div className="inline-block px-5 pt-5 pb-16 my-8 overflow-hidden text-center align-middle transition-all transform bg-white shadow-xl sm:px-11">
        <Dialog.Title
          as="h2"
          className="mt-4 mb-6 leading-tight sm:text-f-60 text-f-40 text-grey4"
        >
          {title}
        </Dialog.Title>
        <div className="mb-10 text-lg">
          <p>Are you sure? This cannot be undone.</p>
        </div>

        <div className="flex justify-between max-w-md mx-auto mt-4 space-x-3">
          <Button secondary className="w-[120px] h-10" onClick={closeModal}>
            Cancel
          </Button>
          <Button className="w-[120px] h-10" onClick={action}>
            Yes
          </Button>
        </div>
      </div>
    </Modal>
  );
};
