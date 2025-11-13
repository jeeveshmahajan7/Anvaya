import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";

const AnvayaContext = createContext();
const useAnvayaContext = () => useContext(AnvayaContext);

export default useAnvayaContext;

export const AnvayaProvider = ({ children }) => {
  const API = "https://anvaya-backend-six.vercel.app";
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const [salesAgentsList, setSalesAgentsList] = useState([]);
  const [refreshAgents, setRefreshAgents] = useState(false); // state to manage auto refresh of agents

  const [leadsList, setLeadsList] = useState([]);
  const [refreshLeads, setRefreshLeads] = useState(false); // state to manage auto refresh of leads

  const openFormModal = () => setIsFormModalOpen(true);
  const closeFormModal = () => setIsFormModalOpen(false);
  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  // logic to auto refresh agents
  const onAgentAdded = () => {
    setRefreshAgents((prev) => !prev);
  };

  const {
    data: agentsData,
    loading: loadingAgents,
    error: errorAgents,
  } = useFetch(`${API}/agents`, [refreshAgents]); // useFetch fetches new data when refreshAgents dependency is set to true

  useEffect(() => {
    if (agentsData?.agents) {
      setSalesAgentsList(agentsData.agents);
    }
  }, [agentsData]); // updates when new Agent data is fetched

  // logic to auto refresh leads
  const onLeadAdded = () => {
    setRefreshLeads((prev) => !prev);
  };

  const {
    data: leadsData,
    loading: loadingLeads,
    error: errorLeads,
  } = useFetch(`${API}/leads`, [refreshLeads]); // updates when new Leads data is fetched

  useEffect(() => {
    if (leadsData?.leads) {
      setLeadsList(leadsData.leads);
    }
  }, [leadsData]);

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
        onAgentAdded,
        onLeadAdded,
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
