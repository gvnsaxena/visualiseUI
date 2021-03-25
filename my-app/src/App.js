import React, { useState, useEffect } from 'react';
import './App.css';


//https://devexpress.github.io/devextreme-reactive/react/chart/demos/line/line/
const App = () => {

  const callAPI = () => {
    fetch('https://reference.intellisense.io/thickenernn/v1/referencia')
      .then((response) => {
          response.json().then(function(data) {
            //setInvoiceList(data)
          });
        }
      )
      .catch((err) => {
        console.log('Error in API', err);
      });
  }
useEffect(()=>{
  callAPI()
}, [])

  return (
    <div className="App">
      <header className="App-header">
        
      </header>
    </div>
  );
}

export default App;
