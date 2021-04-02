import React, { Fragment, useState, useEffect, memo } from 'react';
import {useSelector, useDispatch} from 'react-redux';
import LineGraph from './components/line-graph'
import UITable from './components/ui-table'
import './App.css';
import * as actions from './action/app-actions';
import {INTELLISENSE_API} from './config/config';

const App = () => {

  const dispatch = useDispatch();
  const intellisenseData = useSelector((state)=> {
    return state.apiData
  });
  const [tk1KeyValue, setTK1] = useState([]);
  const [chartData, setChartData] = useState([]);

  const createChartData = (key) => {
    let lineData = [];
    const { TK1 } = intellisenseData.current.data;

    for (let i = 0; i < TK1[key].times.length; i++) {
      lineData.push({
        label: TK1[key].times[i],
        value: TK1[key].values[i],
      });
    }
    setChartData(prevState => ([...prevState, 
      {key,
      lineData}
    ]));
  }
useEffect(() => {
  dispatch(actions.getAPIData(INTELLISENSE_API));
  // eslint-disable-next-line
}, [])

useEffect(() => {
  if(intellisenseData) {
    const { TK1 } = intellisenseData.current.data;
      for(let [key, { values }] of Object.entries(TK1)) {
          key.startsWith('TK1')   
          && setTK1(prevState => ({...prevState, 
              [key]: values[values.length-1]
              }));
          key.startsWith('TK1') && createChartData(key);
      }
  }
    // eslint-disable-next-line
}, [intellisenseData])

  return (
    <Fragment>
        <UITable tk1Key={tk1KeyValue} />
        <LineGraph chartData={chartData} />
    </Fragment>
  );
}

export default memo(App);
