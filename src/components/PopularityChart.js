import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const PopularityChart = (props) => {
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
        data: [props.dateval+' ~ '+props.endDateValue, props.dateval1+' ~ '+props.endDateValue1]
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          barWidth: '20%',
          data: [props.averageData.popularity, props.averageData1.popularity],
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