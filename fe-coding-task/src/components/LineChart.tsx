import React, { useContext, useEffect, useState } from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';
import { chartContext } from '../context/ChartContext';

  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const sdata = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [12,23,54,345,34,56,987],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: [142,243,74,45,84,96,87],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  type DataSet = {
    label: string,
    data: string[],
    borderColor: string,
    backgroundColor: string
  };

  type ChartData = {
    labels: string[],
    datasets: DataSet[]
  }
export default function LineChart() {
    const { data } = useContext(chartContext);
    const [chartData, setChartData] = useState<ChartData>({
        labels:[],
        datasets:[]
    });

    useEffect(() => {
        if(data?.chartData?.dimension){
            let label : Object  = data?.chartData?.dimension?.Tid.category.label as Object;
            console.log('label',data)
            setChartData({
                ...chartData,
                labels: Object.keys(label) || [],
                datasets: [
                    {
                        label: 'test',
                        data: data?.chartData?.value as string[],
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99, 132, 0.5)',
                    }
                ]
            })
        }
    },[data.chartData]);

  return (
    <Line options={options} data={chartData} />
  )
}
