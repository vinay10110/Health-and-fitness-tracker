import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'; 
import styled from 'styled-components';


ChartJS.register(LineElement, CategoryScale, LinearScale, Tooltip, Legend);

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;

// eslint-disable-next-line react/prop-types
const Chart = ({ dates, quantities }) => {

  const chartData = {
    labels: dates,
    datasets: [{
      label: '',
      strokeColor: 'rgba(77, 102, 240, 0.5411764705882353)',
      data: quantities,
      backgroundColor: [
        'rgba(77, 102, 240, 0.5411764705882353)',
      ],
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: false,
    },
    legend: {
      display: false,
      position: 'bottom',
    },
    scales: {
      y: { 
        ticks: {
          beginAtZero: true
        }
      },
    },
  };

  return (
    <ChartContainer>
      <Line justify="center" data={chartData} options={options} />
    </ChartContainer>
  );
};

export default Chart;
