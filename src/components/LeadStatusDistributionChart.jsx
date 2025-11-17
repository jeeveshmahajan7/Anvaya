import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement, 
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import useAnvayaContext from "../context/AnvayaContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const LeadStatusDistributionChart = () => {
  const { leadsList } = useAnvayaContext();

  const leadStatusList = [...new Set(leadsList.map((lead) => lead.status))];

  const leadsByStatus = leadStatusList?.map((status) => ({
    status: status,
    totalLeads: leadsList?.filter((lead) => lead.status === status).length,
  }));

  const doughnutChartData = {
    labels: leadsByStatus?.map((item) => item.status),
    datasets: [
      {
        label: "Leads By Status",
        data: leadsByStatus?.map((item) => item.totalLeads),
        backgroundColor: [
          "rgba(54, 162, 235, 0.6)", // Blue
          "rgba(255, 206, 86, 0.6)", // Yellow
          "rgba(75, 192, 192, 0.6)", // Teal
          "rgba(255, 99, 132, 0.6)", // Pink
          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        borderColor: [
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(255, 99, 132, 1)",
          "rgba(153, 102, 255, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Lead Status Distribution",
        font: { size: 18, weight: "bold" },
      },
      legend: {
        position: "bottom",
      },
      datalabels: {
        color: "#fff",
        font: {
          weight: "bold",
          size: 14,
        },
        formatter: (value, context) => {
          return value;
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} leads`,
        },
      },
    },
    cutout: "60%",
  };

  return (
    <>
      <div className="chart-container">
        <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
      </div>
    </>
  );
};

export default LeadStatusDistributionChart;
