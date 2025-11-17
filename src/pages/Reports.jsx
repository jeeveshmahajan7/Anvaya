import LeadsByAgentBarChart from "../components/LeadsByAgentBarChart";
import LeadStatusDistributionChart from "../components/LeadStatusDistributionChart";
import LeadsClosedAndInPipelineChart from "../components/LeadsClosedAndInPipelineChart";

const Reports = () => {
  return (
    <>
      <h1>Anvaya CRM Reports </h1>
      <h2>Report Overview</h2>

      <div>
        <h3>Total Leads closed and in Pipeline:</h3>
        <LeadsClosedAndInPipelineChart />
      </div>

      <div>
        <h3>Leads Closed by Sales Agent:</h3>
        <LeadsByAgentBarChart />
      </div>

      <div>
        <h3>Lead Status Distribution:</h3>
        <LeadStatusDistributionChart />
      </div>
    </>
  );
};

export default Reports;
