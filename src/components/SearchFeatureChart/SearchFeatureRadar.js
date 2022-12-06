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



export function SearchFeatureRadar(props) {
    const dataset = {
        labels: ['danceability', 'energy', 'liveness', 'valence', 'acousticness', 'speechiness'],
        label: props.searchData[props.i].title,
        datasets: [
          {
            data: [props.searchData[props.i].danceability, props.searchData[props.i].energy,props.searchData[props.i].liveness, props.searchData[props.i].valence, props.searchData[props.i].acousticness, props.searchData[props.i].speechiness],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      };
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
  console.log(props.dataset)
  return <Radar data={dataset} options={options}/>;
}
