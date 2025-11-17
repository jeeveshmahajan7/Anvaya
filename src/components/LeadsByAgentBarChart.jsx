import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);
import useAnvayaContext from "../context/AnvayaContext";

const LeadsByAgentBarChart = () => {
  const { leadsList, salesAgentsList } = useAnvayaContext();

  const leadsClosedBySalesAgents = salesAgentsList.map((agent) => ({
    agent: agent.name,
    leadsClosed: leadsList.filter(
      (lead) => lead.salesAgent?._id === agent?._id && lead?.status === "Closed"
    ).length,
  }));

  const barChartData = {
    labels: leadsClosedBySalesAgents.map((a) => a.agent),
    datasets: [
      {
        label: "Leads Closed",
        data: leadsClosedBySalesAgents.map((a) => a.leadsClosed),
        backgroundColor: "rgba(54, 162, 235, 0.6)", // soft blue bars
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
    ],
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Leads Closed by Sales Agent",
        font: { size: 18, weight: "bold" },
      },
    },
    layout: {
      padding: {
        bottom: 0, // removes extra padding
        top: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <>
      <div className="chart-container">
        <Bar data={barChartData} options={barChartOptions} />
      </div>
    </>
  );
};

export default LeadsByAgentBarChart;
