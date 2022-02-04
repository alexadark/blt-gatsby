import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { Label, Input, Button } from "../ui-components";

const RESET_PASSWORD = gql`
  mutation resetUserPassword(
    $key: String!
    $login: String!
    $password: String!
  ) {
    resetUserPassword(
      input: { key: $key, login: $login, password: $password }
    ) {
      user {
        databaseId
      }
    }
  }
`;

interface Props {
  resetKey: string;
  login: string;
}

export function SetPasswordForm({ resetKey: key, login }: Props) {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [clientErrorMessage, setClientErrorMessage] = useState("");
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);

  const wasPasswordReset = Boolean(data?.resetUserPassword?.user);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    resetPassword({
      variables: {
        key,
        login,
        password,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  function validate() {
    setClientErrorMessage("");

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage("Password must be at least 5 characters.");
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage("Passwords must match.");
      return false;
    }

    return true;
  }

  if (wasPasswordReset) {
    return (
      <div className="flex justify-center">
        <p className={`orange-box`}>Your new password has been set</p>
        {/*{setIsOpen(true)}*/}
      </div>
    );
  }

  return (
    <>
      <form method="post" onSubmit={handleSubmit} className={`w-full`}>
        <fieldset disabled={loading} aria-busy={loading}>
          <div className={`sm:flex space-x-5 w-full mb-8`}>
            <div className={`w-1/2`}>
              <Label htmlFor="new-password" className={"!text-white"}>
                Password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={password}
                autoComplete="new-password"
                onChange={(event) => setPassword(event.target.value)}
                className={`h-14 w-full`}
                required
              />
            </div>
            <div className={`!w-1/2`}>
              <Label htmlFor="password-confirm" className={"!text-white"}>
                Confirm Password
              </Label>
              <Input
                id="password-confirm"
                type="password"
                value={passwordConfirm}
                autoComplete="new-password"
                className={`h-14 w-full`}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                required
              />
            </div>
          </div>
          {clientErrorMessage ? (
            <div className="flex justify-center">
              <p
                className={`error-message bg-orange font-semiBold text-xl py-2 px-5 text-white rounded-md mb-5 inline-block`}
              >
                {clientErrorMessage}
              </p>
            </div>
          ) : null}
          {error ? (
            <div className="flex justify-center">
              <p
                className={`error-message bg-orange font-semiBold text-xl py-2 px-5 text-white rounded-md mb-5 inline-block`}
              >
                {error.message}
              </p>
            </div>
          ) : null}

          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={loading}
              className={`h-14 w-[300px]`}
            >
              {loading ? "Saving..." : "Save password"}
            </Button>
          </div>
        </fieldset>
      </form>
    </>
  );
}
