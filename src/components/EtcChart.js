import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const EtcChart = (props) => {
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
          data: [props.averageData.liveness, props.averageData1.liveness],
          type: 'bar',
          name: 'liveness'
        },
        {
          data: [props.averageData.acousticness, props.averageData.acousticness],
          type: 'bar',
          name:'acousticness'
        },
        {
          data: [props.averageData.instrumentalness, props.averageData.instrumentalness],
          type: 'bar',
          name:'instrumentalness'
        },
        {
            data: [props.averageData.speechiness, props.averageData.speechiness],
            type: 'bar',
            name:'speechiness'
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