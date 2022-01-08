import React, { useState, useRef } from "react";
import { useForm, Controller } from "react-hook-form";
import tw, { styled } from "twin.macro";
import { useMutation, gql } from "@apollo/client";
import { Section, Input, Button, Label, Select } from "../ui-components";
import { v4 as uuidv4 } from "uuid";
import useCaptcha from "../../context/GlobalCaptcha";
import { Email, Item, Span, A, renderEmail } from "react-html-email";
import toast from "react-hot-toast";
export const ContactPage = ({ intro }) => {
  const [isMailSent, setIsMailSent] = useState(false);
  const [isBot, setIsBot] = useState(false);

  const rRef = useCaptcha();

  const SEND_EMAIL = gql`
    mutation ($input: SendEmailInput!) {
      sendEmail(input: $input) {
        origin
        sent
        message
      }
    }
  `;
  const [sendEmail] = useMutation(SEND_EMAIL);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm();

  const onSubmit = async (data) => {
    setIsMailSent(false);
    setIsBot(false);
    const { firstName, email, subject, message } = data;
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
      reset();
      return;
    }

    const emailHTML = renderEmail(
      <Email title="email from bucket-list website">
        <Item>{`Subject: ${subject}`}</Item>
        <Item>{`First name: ${firstName}`}</Item>
        <Item>{`Email: ${email}`}</Item>
        <Item>{`Message: ${message}`}</Item>
      </Email>
    );
    sendEmail({
      variables: {
        input: {
          to: "matt@bucketlisttravels.com",
          from: email,
          subject: subject,
          body: emailHTML,
          clientMutationId: uuidv4(),
        },
      },
    });
    setIsMailSent(true);
    reset();
    toast.custom(
      <div className="bg-gold flex items-center px-2 py-1 rounded shadow-lg text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
        </svg>
        <span className="ml-2 text-lg text-gray-900">
          Thanks, message received! We’ll get back to you as soon as we can
        </span>
      </div>,
      {
        duration: 1000,
      }
    );
  };

  const ErrorMessage = styled.div(() => [
    tw`max-w-md px-5 py-2 my-2 text-center text-red-500 bg-red-100 rounded-md`,
  ]);

  return (
    <Section className="pb-20 px-base2 pt-base2">
      <div
        dangerouslySetInnerHTML={{ __html: intro }}
        className="prose max-w-none mb-base2"
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div className="grid-cols-2 gap-16 md:grid">
          <div className="mb-5 md:mb-0">
            <Label htmlFor="firstName">First name</Label>
            <Input
              type="text"
              id="firstName"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <ErrorMessage>This field is required</ErrorMessage>
            )}
          </div>
        </div>
        <div>
          <Label htmlFor="subject">Subject</Label>
          <Controller
            name="subject"
            defaultValue="Customer feedback"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                id="subject"
                options={[
                  "Customer feedback",
                  "Content & website update",
                  "Finance",
                  "Legal",
                  "Partnerships",
                  "Technical help",
                  "Other",
                ]}
                defaultValue="Customer feedback"
              />
            )}
          />
          {errors.subject && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
        </div>
        <div>
          <Label htmlFor="message">Message</Label>
          <Input
            as="textarea"
            id="message"
            className="h-[190px] focus:placeholder-transparent"
            {...register("message", { required: true })}
          />
          {errors.message && (
            <ErrorMessage>This field is required</ErrorMessage>
          )}
          <div className="flex justify-end">
            <Button
              as="input"
              type="submit"
              value="submit"
              className="h-[50px] mt-1 "
            />
          </div>
        </div>
      </form>
      {isBot && (
        <div className="flex justify-center">
          <div className="px-5 py-2 text-lg font-semibold text-center text-red-500 bg-green-100 rounded-lg">
            You are not fooling us bot!
          </div>
        </div>
      )}
      {isMailSent && (
        <div className="flex justify-center">
          <div className="px-5 py-2 text-center text-green-500 bg-green-100 rounded-lg">
            Thanks, message received! We’ll get back to you as soon as we can.
          </div>
        </div>
      )}
    </Section>
  );
};
