import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
);



export function Chart(props) {
  const options = {
    plugins:{
      legend:{
        labels:{
          usePointStyle: true,
          padding: 10,
        }
      },
    },
    onClick: function(evt, element) {
      if(element.length > 0) {
          console.log(element,element[0]._datasetInde)
          // you can also get dataset of your selected element
          console.log(props.data.datasets[element[0]._datasetIndex])
      }
    }
  }
  console.log(props.data)
  return <Radar data={props.data} options={options}/>;
}
