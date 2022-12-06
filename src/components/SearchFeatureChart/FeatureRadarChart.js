import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const FeatureRadarChart = (props) => {
  useEffect(()=>{
    setOptions(options)
    console.log(props.searchData[props.i].valence)
  },[])
  const [options, setOptions] = useState({
    // title: {
    //     text: 'Basic Radar Chart'
    //   },
    //   legend: {
    //     data: ['Allocated Budget', 'Actual Spending']
    //   },
     tooltip: {
        trigger: 'item'
      },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: 'acousticness'},
          { name: 'danceability'},
          { name: 'energy'},
          { name: 'liveness'},
          { name: 'valence'},
          { name: 'speechiness'}
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [
                props.searchData[props.i].acousticness * 100, 
                props.searchData[props.i].danceability * 100, 
                props.searchData[props.i].energy * 100,  
                props.searchData[props.i].liveness * 100, 
                props.searchData[props.i].valence * 100,  
                props.searchData[props.i].speechiness * 100, 
            ],
              name: 'Allocated Budget'
            },
          ]
        }
      ]	});	

	return (
    <ECharts
	  option={options}
      opts={{ renderer: 'svg', width: 'auto', height: '300px' }}
    />
  );
}