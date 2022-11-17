import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const Barchart2 = (props) => {
  useEffect(()=>{
    setOptions(options)
  },[])
  const [options, setOptions] = useState({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    xAxis: {
        type: 'category',
        data: [props.dateval, props.dateval1]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [props.averageData.energy, props.averageData1.energy],
          type: 'bar',
          name: 'energy'
        },
        {
          data: [props.averageData.danceability, props.averageData.danceability],
          type: 'bar',
          name:'danceability'
        },
        {
          data: [props.averageData.acousticness, props.averageData.acousticness],
          type: 'bar',
          name:'acousticness'
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