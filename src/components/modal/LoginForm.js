import React from "react";
import { Link } from "gatsby";
import Button from "../reusables/Button";
import InputItem from "./InputItem";
import useAuth from "~/context/AuthContext";

export default function LoginForm() {
  const { logInWithEmailPassword } = useAuth();
  async function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("email");
    let password = formData.get("password");
    const { user, session, error } = await logInWithEmailPassword({
      email,
      password,
    });
    console.log({ user, session, error });
  }
  return (
    <>
      <div className="signin-form px-5 sm:px-10">
        <h4 className="leading-tight text-f-40 sm:text-f-60 text-center my-2">
          Sign in
        </h4>
        <form onSubmit={handleSubmit}>
          <fieldset
            disabled={false}
            aria-busy={false}
            className="mb-6 space-y-6"
          >
            <InputItem
              id="log-in-email"
              name="email"
              labelText="Email"
              type="email"
              onChange={() => {}}
              required={true}
              autoComplete="email"
            />
            <InputItem
              id="log-in-password"
              name="password"
              labelText="Password"
              type="password"
              onChange={() => {}}
              required={true}
              autoComplete="current-password"
            />
            <Link
              to="/forgot-password"
              className="forgot-password-link text-blueLink"
            >
              Forgot password?
            </Link>
          </fieldset>
          <div className="flex justify-center mb-6">
            <Button
              type="Primary"
              btnType="submit"
              className="px-24 text-center"
            >
              Submit
            </Button>
          </div>
          <p className="account-sign-up-message">
            Don&#39;t have an account yet?{" "}
            <button aria-label="go to sign up" className="text-blueLink">
              Sign up
            </button>
          </p>
        </form>
      </div>
    </>
  );
}
