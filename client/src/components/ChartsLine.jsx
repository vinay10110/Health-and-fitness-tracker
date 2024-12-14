import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

// Styled component for the chart container
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
      strokeColor: 'rgba(77, 102, 240, 0.5411764705882353)',
      data: quantities,
      backgroundColor: [
        'rgba(77, 102, 240, 0.5411764705882353)',
      ]
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
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]  
    }
  };

  return (
    <ChartContainer>
      <Line justify="center" data={chartData} options={options}/>
    </ChartContainer>
  );
};

export default Chart;
