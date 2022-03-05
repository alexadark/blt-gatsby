import { Input, Button } from "../ui-components";
import React, { useState } from "react";
import useAuthModal from "~/context/AuthModalContext";
import { supabase } from "~/lib/supabaseClient";

export function SendPasswordResetEmailForm() {
  const [wasEmailSent, setWasEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { openModal } = useAuthModal();
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email } = Object.fromEntries(formData);
    setLoading(true);
    try {
      await supabase.auth.api.resetPasswordForEmail(email, {
        redirectTo: "/set-password",
      });
      setLoading(false);
      setWasEmailSent(true);
    } catch (error) {
      setError(error);
      setLoading(false);
      setWasEmailSent(false);
    }
  }

  if (wasEmailSent) {
    return (
      <div className="flex justify-center">
        <p className={`orange-box text-f-20`}>
          Please check your email, a password reset link has been sent to you
          <button
            aria-label="go to signin"
            className={`text-blueLink mt-3 text-center font-bold mx-auto w-full`}
            onClick={(e) => {
              e.preventDefault();
              openModal();
            }}
          >
            Sign in
          </button>
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className={`max-w-[600px] mx-auto`}
    >
      <p className={`text-center sm:text-2xl font-bold text-white mb-5`}>
        Enter the email associated with your account and we'll send you a link
        to reset your password
      </p>
      <fieldset disabled={loading} aria-busy={loading}>
        {/* <Label htmlFor="password-reset-email" className={`!text-white`}>
            Email
          </Label> */}
        <Input
          id="password-reset-email"
          type="email"
          name="email"
          aria-label="email"
          autoComplete="email"
          className="h-14"
          required={true}
        />
        {error ? (
          <div className="flex justify-center">
            <p className="error-message">{error.message}</p>
          </div>
        ) : null}
        <div className={` flex justify-center mt-10`}>
          <Button type="submit" disabled={loading} className={`h-14 w-[300px]`}>
            {loading ? "Sending..." : "Send password reset email"}
          </Button>
        </div>
      </fieldset>
    </form>
  );
}
