import React, { useState } from "react";
import { Section, Typo } from "../ui-components";
import clsx from "clsx";

import { AuthContent } from "../auth";
import { useAuth } from "../../lib/hooks/useAuth";
import { useMutation, gql } from "@apollo/client";
import "react-tippy/dist/tippy.css";
import { Link, navigate } from "gatsby";
import { useDbBucketList } from "../../lib/hooks/useDbBucketList";
import { AccountForm } from "../account";
import { EmptyModal } from "../bucket-list/EmptyModal";

const UPDATE_USER = gql`
  mutation ($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        email
        id
      }
    }
  }
`;

const DELETE_USER = gql`
  mutation ($input: DeleteUserInput!) {
    deleteUser(input: $input) {
      deletedId
    }
  }
`;

const DELETE_BUCKET_LIST = gql`
  mutation ($input: DeleteBucketListInput!) {
    deleteBucketList(input: $input) {
      deletedId
    }
  }
`;

export const MyAccountPage = () => {
  const [updateUser] = useMutation(UPDATE_USER);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteBucketList] = useMutation(DELETE_BUCKET_LIST);
  let [isOpenModal, setIsOpenModal] = useState(false);

  const { bl } = useDbBucketList();

  const handleDeleteUser = () => {
    deleteBucketList({
      variables: {
        input: {
          id: bl?.id,
        },
      },
    });
    deleteUser({
      variables: {
        input: {
          id: user?.id,
        },
      },
    });
    navigate("/log-out");
  };

  const onSubmit = (data) => {
    const { firstName, location, password, email } = data;
    updateUser({
      variables: {
        input: {
          id: user?.id,
          firstName: firstName.length > 0 ? firstName : null,
          lastName: location.length > 0 ? location : null,
          email: email.length > 0 ? email : null,
          password: password.length > 0 ? password : null,
        },
      },
    });
  };
  const { user } = useAuth();
  console.log("user", user);

  return (
    <AuthContent>
      <EmptyModal
        title="Delete my account"
        text="Are you sure? This cannot be undone."
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
            {" "}
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
    </AuthContent>
  );
};
