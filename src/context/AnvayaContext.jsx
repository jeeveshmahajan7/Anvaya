import { createContext, useContext, useState } from "react";

const AnvayaContext = createContext();
const useAnvayaContext = () => useContext(AnvayaContext);

export default useAnvayaContext;

export const AnvayaProvider = ({ children }) => {
  const API = "anvaya-backend-rust.vercel.app";
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  return (
    <AnvayaContext.Provider
      value={{
        API,
        isFormModalOpen,
        isLeadModalOpen,
        setIsFormModalOpen,
        setIsLeadModalOpen,
        openFormModal,
        openLeadModal,
        closeFormModal,
        closeLeadModal,
      }}
    >
      {children}
    </AnvayaContext.Provider>
  );
};
