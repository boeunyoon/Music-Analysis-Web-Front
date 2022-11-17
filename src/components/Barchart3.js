import React, { useEffect, useState } from 'react';
import ECharts, { EChartsReactProps } from 'echarts-for-react';

export const Barchart3 = (props) => {
  useEffect(()=>{
    setOptions(options)
  },[])
  const [options, setOptions] = useState({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
	  series: [
	    {
          name: 'Access From',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '40',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: props.averageData.loudness * -1, name: props.dateval },
            { value: props.averageData1.loudness * -1, name: props.dateval1},
          ]
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