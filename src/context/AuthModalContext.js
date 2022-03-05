import React, { createContext, useContext, useState } from "react"

export const AuthModalContext = createContext()
export function AuthModalContextProvider({ children }) {
  const [open, setOpen] = useState(false)

  return (
    <AuthModalContext.Provider
      value={{
        isModalOpen: open,
        openModal: () => setOpen(true),
        closeModal: () => setOpen(false),
      }}
    >
      {children}
    </AuthModalContext.Provider>
  )
}
export default function useAuthModal() {
  return useContext(AuthModalContext)
}
