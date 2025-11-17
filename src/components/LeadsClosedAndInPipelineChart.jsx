import { Pie } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
import useAnvayaContext from "../context/AnvayaContext";

ChartJS.register(ArcElement, Tooltip, Legend, Title, ChartDataLabels);

const LeadsClosedAndInPipelineChart = () => {
  const { leadsList } = useAnvayaContext();

  const totalLeadsClosed = leadsList.filter(
    (lead) => lead.status === "Closed"
  ).length;
  const leadsInPipeline = leadsList.filter(
    (lead) => lead.status !== "Closed"
  ).length;

  const pieChartData = {
    labels: ["Leads Closed", "Leads in Pipeline"],
    datasets: [
      {
        label: "Leads Closed and in Pipeline",
        data: [totalLeadsClosed, leadsInPipeline],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)", // Teal
          "rgba(153, 102, 255, 0.6)", // Purple
        ],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
        hoverOffset: 8,
      },
    ],
  };

  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Leads Closed and in Pipeline",
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
          const total = context.chart.data.datasets[0].data.reduce(
            (a, b) => a + b,
            0
          );
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} (${percentage}%)`;
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => `${context.label}: ${context.raw} leads`,
        },
      },
    },
  };

  return (
    <>
      <div className="chart-container">
        <Pie data={pieChartData} options={pieChartOptions} />
      </div>
    </>
  );
};

export default LeadsClosedAndInPipelineChart;
