import React, { Fragment } from "react"
import { Tab } from "@headlessui/react"
import clsx from "clsx"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"
export default function AuthTabs() {
  return (
    <>
      <div className="signin-form">
        <Tab.Group>
          <Tab.List className="flex">
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx({
                    "bg-white text-grey5": !selected,
                    "bg-gold": selected,
                    "w-1/2 text-center h-[66px] text-[20px] font-medium px-5 uppercase border-b border-grey2 ": true,
                  })}
                >
                  Create account
                </button>
              )}
            </Tab>
            <Tab as={Fragment}>
              {({ selected }) => (
                <button
                  className={clsx({
                    "bg-white text-grey5": !selected,
                    "bg-gold": selected,
                    "w-1/2 text-center h-[66px] text-[20px] font-medium px-5 uppercase border-b border-grey2 ": true,
                  })}
                >
                  Sign in
                </button>
              )}
            </Tab>
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              <SignupForm />
            </Tab.Panel>
            <Tab.Panel>
              <LoginForm />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </>
  )
}
