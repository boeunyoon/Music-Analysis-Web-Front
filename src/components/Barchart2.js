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
        data: [props.dateval+' '+props.endDateValue, props.dateval1+' '+props.endDateValue1]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          barWidth: '20%',
          data: [props.averageData.energy*10, props.averageData1.energy*10],
          type: 'bar',
          name: 'energy'
        },
        {
          barWidth: '20%',
          data: [props.averageData.danceability*10, props.averageData.danceability*10],
          type: 'bar',
          name:'danceability'
        },
        {
          barWidth: '20%',
          data: [props.averageData.loudness, props.averageData.loudness],
          type: 'bar',
          name:'loudness'
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