import React, { useState } from "react";
import { Section, Typo } from "../ui-components";
import clsx from "clsx";
import "react-tippy/dist/tippy.css";
import { Link, navigate } from "gatsby";
import { AccountForm } from "../account";
import { EmptyModal } from "../bucket-list/EmptyModal";
import useAuth from "~/context/AuthContext";

export const MyAccountPage = () => {
  const { user } = useAuth();
  let [isOpenModal, setIsOpenModal] = useState(false);
  const handleDeleteUser = () => {
    navigate("/log-out");
  };
  const onSubmit = (data) => {
    const { firstName, location, password, email } = data;
    console.log(data);
  };
  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <>
      <EmptyModal
        title="Delete my account"
        text="Are you sure? All of your selections in your bucket list will be deleted, and cannot be recovered"
        isOpen={isOpenModal}
        setIsOpen={setIsOpenModal}
        action={handleDeleteUser}
      />
      <Section className={clsx("sm:px-10 px-5 pt-10 pb-24 ")}>
        <Typo as="h3" h3 className="mb-8 font-semibold">
          My details
        </Typo>
        <AccountForm onSubmit={onSubmit} />
        <div className="w-full h-[1px] bg-gray-300 my-base2" />
        {/* My lists */}
        <Typo as="h3" h3 className="mb-8 font-semibold">
          My lists
        </Typo>
        <div className="flex items-center space-x-base">
          <Link to="/my-bucket-list" className="btn btn-secondary">
            View & Edit{" "}
          </Link>
          <div>My bucket list</div>
        </div>
        <div className="w-full h-[1px] bg-gray-300 my-base2" />
        {/* Delete */}
        <button
          onClick={() => setIsOpenModal(true)}
          className="w-[184px] border-red-500 btn btn-secondary hover:bg-red-500 hover:text-white"
        >
          delete account
        </button>
      </Section>
    </>
  );
};
