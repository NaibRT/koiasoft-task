import axios from 'axios';
import React,{ createContext, useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ProvideData, StateData } from '../models/ChartState';
import { Query } from '../models/Query';


export const chartContext = createContext<ProvideData>({
    data:{
        title:'',
        variables:[],
        chartData:{
            isLoading: false
        }
    },
    getDataByQuery : (query) => {}
});

type Props = {
    children: JSX.Element | JSX.Element[]
}



export function ChartContextProvider({ children } : Props) {
    const [searchParam] = useSearchParams();

    const [data, setData] = useState<StateData>({
        title:'',
        variables:[],
        chartData:{
            isLoading: false
        }
    });

    useEffect(() => {

        getInitialData().then(() => {
            let query = getDataFromURLQuery();
            if(query[0]){
                getDataByQuery(query);
            }
        });

    },[]);

    function getInitialData() {
        return axios.get(`${process.env.REACT_APP_API_URL}`)
             .then(res => {
                setData((prevState) => ({
                    ...prevState,
                    title: res.data.title,
                    variables: [...res.data.variables]
                }))
             });
    };

    function getDataByQuery(query: Query[]){

        axios.post(`${process.env.REACT_APP_API_URL}`,{
            query,
            "response": {
                "format": "json-stat2"
              }
        })
             .then(res => {
                console.log('res.data',res.data);
                console.log('data',data)
                setData((prevState) => ({
                    ...prevState,
                    variables:[...prevState.variables],
                    chartData: {
                        ...res.data,
                        isLoading:false
                    }
                }))
             });
    };

    function getDataFromURLQuery(): Query[] {
        const queries : Query[] = [] ;
        let keys = [...Array.from(new Set(searchParam.keys()))];
    
        keys.forEach((key) => {
          let value = searchParam.getAll(key);
          queries.push({
             code: key,
             selection:{
                filter: "item",
                values: value
            }
          });
        });
    
        return queries;
      }



  return (
    <chartContext.Provider value={{data, getDataByQuery}}>
     {children}
    </chartContext.Provider>
  )
}





