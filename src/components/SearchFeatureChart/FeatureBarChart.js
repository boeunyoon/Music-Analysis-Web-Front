import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const FeatureBarChart = (props) => {
  useEffect(()=>{
    setOptions(options)
  },[])
  const [options, setOptions] = useState({
      tooltip: {
        trigger: 'item'
      },
      xAxis: {
        type: 'category',
        data: ['tempo', 'duration_ms', 'popularity']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          barWidth: '25%',
          data: [props.searchData[props.i].tempo, props.searchData[props.i].duration_ms * 0.001, props.searchData[props.i].popularity],
          type: 'bar'
        }
      ]
	});	

	return (
    <ECharts
	  option={options}
      opts={{ renderer: 'svg', width: 'auto', height: '300px' }}
    />
  );
}