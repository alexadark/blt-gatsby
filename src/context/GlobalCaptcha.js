import React, { createContext, useContext, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha-enterprise";

export const GlobalCaptchaContext = createContext();
export function GlobalCaptchaProvider({ children }) {
  const globalCaptcha = useRef();
  return (
    <GlobalCaptchaContext.Provider value={globalCaptcha}>
      <div className="captcha-wrapper">
        {children}
        <ReCAPTCHA
          sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
          size="invisible"
          ref={globalCaptcha}
        />
      </div>
    </GlobalCaptchaContext.Provider>
  );
}

export default function useCaptcha() {
  return useContext(GlobalCaptchaContext);
}
