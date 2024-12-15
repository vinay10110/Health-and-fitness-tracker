/* eslint-disable react/prop-types */
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; 
import styled from 'styled-components';


ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

ChartJS.defaults.set({
  plugins: {
    legend: {
      display: false
    }
  }
});

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

const Charts = ({ dates, quantities }) => {
  const chartData = {
    labels: dates,
    datasets: [{
      label: '',
      strokeColor: "rgba(100, 190, 154, 1)",
      data: quantities,
      backgroundColor: [
        '#7984c0',
        '#3f50ae',
        '#7984c0',
        '#3f50ae',
        '#7984c0',
        '#3f50ae',
        '#7984c0'
      ],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: false,
    },
    scales: {
      y: { 
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <ChartContainer>
      <Bar
        justify="center"
        data={chartData}
        options={options}
      />
    </ChartContainer>
  );
};

export default Charts;
