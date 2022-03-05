import clsx from "clsx";
import React, { useState } from "react";
import useAuth from "~/context/AuthContext";
import Button from "../reusables/Button";
import InputItem from "./InputItem";

export default function SignupForm() {
  const { signUpWithEmailPassword } = useAuth();
  const [step, setStep] = useState(1);
  const [stepOneData, setFormData] = useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let email = formData.get("signup-email");
    let password = formData.get("signup-password");
    setFormData({ email, password });
    setStep(2);
  }
  async function handleSubmitFinal(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let firstName = formData.get("fname");
    let location = formData.get("location");
    const { user, session, error } = await signUpWithEmailPassword(
      {
        email: stepOneData.email,
        password: stepOneData.password,
      },
      {
        data: {
          first_name: firstName,
          location,
        },
      }
    );
    console.log({ user, session, error });
  }
  return (
    <div className="signup-form px-5 sm:px-10">
      <h4 className="leading-tight text-f-40 sm:text-f-60 text-center my-2">
        {step === 1 ? "Create account" : "Last step..."}
      </h4>
      <form onSubmit={handleSubmit}>
        <fieldset
          disabled={false}
          aria-busy={false}
          className={clsx({
            hidden: step !== 1,
            "mb-6 space-y-6": step === 1,
          })}
        >
          <InputItem
            id="sign-up-email"
            name="signup-email"
            labelText="Email"
            type="email"
            onChange={() => {}}
            required={true}
            autoComplete="email"
          />
          <InputItem
            id="sign-up-password"
            name="signup-password"
            labelText="Password"
            type="password"
            required={true}
            autoComplete="current-password"
          />
          <div className="flex justify-center mb-6">
            <Button
              btnType="submit"
              type="Primary"
              className="px-24 text-center"
            >
              Submit
            </Button>
          </div>
        </fieldset>
      </form>
      <form onSubmit={handleSubmitFinal}>
        <fieldset
          disabled={false}
          aria-busy={false}
          className={clsx({
            hidden: step === 1,
            "mb-6 space-y-6": step !== 1,
          })}
        >
          <InputItem
            id="sign-up-firstname"
            name="fname"
            labelText="First name"
            type="text"
            required={true}
          />
          <InputItem
            id="sign-up-location"
            name="location"
            labelText="Location (e.g. city, town)"
            type="text"
            required={true}
          />
          <div className="flex justify-between mb-6">
            <Button
              onClick={() => setStep(1)}
              type="Primary"
              className="text-center"
            >
              Go back
            </Button>
            <Button type="Primary" btnType="submit" className="text-center">
              Create account
            </Button>
          </div>
        </fieldset>
      </form>
      <p className="account-sign-up-message">
        Already have an account?{" "}
        <button aria-label="go to sign in" className="text-blueLink">
          Sign in
        </button>
      </p>
    </div>
  );
}
