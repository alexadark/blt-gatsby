import React, { useEffect, useState } from "react";
import { Link } from "gatsby";
import { useMutation, gql } from "@apollo/client";

import { Input, Button, Label } from "..";
import { GET_USER } from "../../lib/hooks/useAuth";
import ls from "local-storage";
import { useDbBucketList } from "../../lib/hooks/useDbBucketList";
import useCaptcha from "../../context/GlobalCaptcha";
const LOG_IN = gql`
  mutation logIn($login: String!, $password: String!) {
    loginWithCookies(input: { login: $login, password: $password }) {
      status
    }
  }
`;

export function LogInForm({ setTabIndex, closeModal }) {
  const [logIn, { loading, error, data: loginData }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_USER }],
  });

  const { blItems } = useDbBucketList();
  const rRef = useCaptcha();
  const [isBot, setIsBot] = useState(false);
  useEffect(() => {
    if (loginData?.loginWithCookies?.status === "SUCCESS") {
      ls("bucketList", blItems);
    }
  }, [loginData]);

  const errorMessage = error?.message || "";
  const isEmailValid =
    !errorMessage.includes("empty_email") &&
    !errorMessage.includes("empty_username") &&
    !errorMessage.includes("invalid_email") &&
    !errorMessage.includes("invalid_username");
  const isPasswordValid =
    !errorMessage.includes("empty_password") &&
    !errorMessage.includes("incorrect_password");

  async function handleSubmit(event) {
    event.preventDefault();
    const rToken = await rRef?.current?.executeAsync();
    rRef?.current?.reset();

    const response = await window.fetch("/api/validate-recaptch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        rToken,
      }),
    });
    const isHumanResponse = await response.json();
    const isHuman = isHumanResponse?.message ?? false;

    if (!isHuman) {
      setIsBot(true);
      return;
    }
    const formData = Object.fromEntries(new FormData(event.target).entries());
    const { email, password } = formData;
    logIn({
      variables: {
        login: email,
        password,
      },
    }).catch((error) => {
      console.error(error);
    });
  }

  return (
    <form method="post" onSubmit={handleSubmit}>
      <fieldset
        disabled={loading}
        aria-busy={loading}
        className="mb-6 space-y-6"
      >
        <div>
          <Label htmlFor="log-in-email">Email</Label>
          <Input
            id="log-in-email"
            type="email"
            name="email"
            className="h-14"
            autoComplete="username"
            required
          />
        </div>
        <div>
          <Label htmlFor="log-in-password">Password</Label>
          <Input
            id="log-in-password"
            type="password"
            name="password"
            className="h-14"
            autoComplete="current-password"
            required
          />
        </div>
        <Link
          to="/forgot-password"
          className=" forgot-password-link"
          onClick={closeModal}
        >
          Forgot password?
        </Link>
        {!isEmailValid ? (
          <div className="flex justify-center">
            <p className="error-message ">Invalid email. Please try again.</p>
          </div>
        ) : null}
        {!isPasswordValid ? (
          <div className="flex justify-center">
            <p className="error-message">Invalid password. Please try again.</p>
          </div>
        ) : null}
        <div className="flex justify-center">
          <Button
            type="submit"
            disabled={loading}
            className="h-[40px] w-[300px]"
          >
            {loading ? "Logging in..." : "Submit"}
          </Button>
        </div>
        {isBot && (
          <div className="flex justify-center">
            <div className="px-5 py-2 text-lg font-semibold text-center text-red-500 bg-green-100 rounded-lg">
              You are not fooling us bot!
            </div>
          </div>
        )}
      </fieldset>
      <p className="account-sign-up-message">
        Don&#39;t have an account yet?{" "}
        <button
          aria-label="go to sign up"
          className={`text-blueLink`}
          onClick={(e) => {
            e.preventDefault();
            setTabIndex(0);
          }}
        >
          Sign up
        </button>
      </p>
    </form>
  );
}
