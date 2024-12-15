import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';   
import styled from 'styled-components';


ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: auto;
`;
// eslint-disable-next-line react/prop-types
const Chart = ({ waterChart, exerciseChart, nutritionChart }) => {

  const chartData = {
    labels: ['Water', 'Exercise', 'Nutrition'],
    datasets: [{
      label: '',  
      borderColor: "rgba(100, 190, 154, 1)",  
      data: [waterChart, exerciseChart, nutritionChart],
      backgroundColor: [
        '#63c5e4',  
        'rgba(130, 94, 185, 0.7098039215686275)',  
        'rgba(16, 149, 59, 0.7215686274509804)',  
      ],
    }],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    title: {
      display: false, 
    },
    legend: {
      display: true,
      position: 'bottom',
    },
  };

  return (
    <ChartContainer>
      <Pie 
        justify="center"
        data={chartData}
        options={options}
      />
    </ChartContainer>
  );
};

export default Chart;
