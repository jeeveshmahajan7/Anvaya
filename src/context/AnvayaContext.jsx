import { createContext, useContext, useEffect, useState } from "react";

const AnvayaContext = createContext();
const useAnvayaContext = () => useContext(AnvayaContext);

export default useAnvayaContext;

export const AnvayaProvider = ({ children }) => {
  const API = "https://anvaya-backend-six.vercel.app";
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const [salesAgentsList, setSalesAgentsList] = useState([]);
  const [loadingAgents, setLoadingAgents] = useState(false);
  const [errorAgents, setErrorAgents] = useState(null);

  const [leadsList, setLeadsList] = useState([]);
  const [loadingLeads, setLoadingLeads] = useState(false);
  const [errorLeads, setErrorLeads] = useState(null);

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);
  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoadingAgents(true);
        setErrorAgents(null);
        const res = await fetch(`${API}/agents`);

        if (!res.ok) {
          throw new Error("Failed to fetch agents");
        }

        const data = await res.json();

        if (data?.agents) {
          setSalesAgentsList(data.agents);
        }
      } catch (error) {
        throw new Error("Error fetching agents:", error);
      } finally {
        setLoadingAgents(false);
      }
    };

    const fetchLeads = async () => {
      try {
        setLoadingLeads(true);
        setErrorLeads(null);
        const res = await fetch(`${API}/leads`);

        if (!res.ok) {
          throw new Error("Failed to fetch leads.");
        }

        const data = await res.json();

        if (data?.leads) {
          setLeadsList(data.leads);
        }
      } catch (error) {
        throw new Error("Error fetching leads:", error);
      } finally {
        setLoadingLeads(false);
      }
    };

    fetchLeads();
    fetchAgents();
  }, []);

  return (
    <AnvayaContext.Provider
      value={{
        API,
        isFormModalOpen,
        isLeadModalOpen,
        salesAgentsList,
        loadingAgents,
        errorAgents,
        leadsList,
        loadingLeads,
        errorLeads,
        setSalesAgentsList,
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
